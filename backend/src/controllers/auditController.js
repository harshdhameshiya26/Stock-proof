// Manages session setup, line item updates & approval workflows

import AuditSession from "../models/AuditSession.js";
import AuditLineItem from "../models/AuditLineItem.js";
import Settings from "../models/Settings.js";
import { getLiveStockSnapshot, pushInventoryAdjustments } from "../services/shopify.js";

// 1. Setup New Audit Session
export const setupAudit = async (req, res, next) => {
  try {
    const { shopId, locationId, collectionId, staffId } = req.body;

    // Fetch live inventory snapshot from Shopify
    const snapshotItems = await getLiveStockSnapshot({ shopId, locationId, collectionId });

    const auditSession = await AuditSession.create({
      shopId,
      locationId,
      staffId,
      status: "IN_PROGRESS",
    });

    // Seed line items with expected baseline counts
    const lineItemsData = snapshotItems.map((item) => ({
      auditSessionId: auditSession._id,
      productId: item.productId,
      variantId: item.variantId,
      title: item.title,
      unitCost: item.unitCost || 0,
      expectedCount: item.quantity,
      actualCount: 0,
      variance: -item.quantity,
    }));

    await AuditLineItem.insertMany(lineItemsData);

    res.status(201).json({
      message: "Audit session created successfully",
      sessionId: auditSession._id,
      auditSession,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get Audit Session Details
export const getAuditSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await AuditSession.findById(id)
      .populate("staffId", "name email role")
      .populate("approvedById", "name email role");

    if (!session) return res.status(404).json({ error: "Audit session not found" });

    const lineItems = await AuditLineItem.find({ auditSessionId: id });

    res.status(200).json({ session, lineItems });
  } catch (error) {
    next(error);
  }
};

// 3. Update Physical Count / Add Reason Tag on Line Item
export const updateLineItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { actualCount, reasonTag, note } = req.body;

    const lineItem = await AuditLineItem.findById(itemId);
    if (!lineItem) return res.status(404).json({ error: "Line item not found" });

    if (actualCount !== undefined) lineItem.actualCount = actualCount;
    if (reasonTag !== undefined) lineItem.reasonTag = reasonTag;
    if (note !== undefined) lineItem.note = note;

    lineItem.variance = lineItem.actualCount - lineItem.expectedCount;
    await lineItem.save();

    res.status(200).json({ message: "Line item updated", lineItem });
  } catch (error) {
    next(error);
  }
};

// 4. Submit Audit & Process Threshold Verification
export const submitAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await AuditSession.findById(id);
    if (!session) return res.status(404).json({ error: "Audit session not found" });

    if (session.status !== "IN_PROGRESS") {
      return res.status(400).json({ error: `Cannot submit audit in status: ${session.status}` });
    }

    const lineItems = await AuditLineItem.find({ auditSessionId: id });
    const settings = (await Settings.findOne({ shopId: session.shopId })) || {
      dollarLimit: 100,
      itemLimit: 10,
    };

    let totalDollarVariance = 0;
    let totalItemVariance = 0;

    lineItems.forEach((item) => {
      const diff = Math.abs(item.variance);
      totalItemVariance += diff;
      totalDollarVariance += diff * item.unitCost;
    });

    // Update session summary fields
    session.totalItemsCounted = lineItems.reduce((sum, i) => sum + i.actualCount, 0);
    session.totalNetVariance = totalItemVariance;
    session.totalDollarVariance = totalDollarVariance;

    const isOverThreshold =
      totalDollarVariance > settings.dollarLimit || totalItemVariance > settings.itemLimit;

    if (isOverThreshold) {
      session.status = "PENDING_APPROVAL";
      await session.save();
      return res.status(200).json({
        status: "PENDING_APPROVAL",
        message: "Audit submitted. Manager approval required due to threshold limits.",
        totalDollarVariance,
        totalItemVariance,
      });
    }

    // Auto-approve and sync if within safe threshold limits
    session.status = "APPROVED";
    await session.save();

    await pushInventoryAdjustments(session.shopId, session.locationId, lineItems);

    session.status = "COMPLETED";
    await session.save();

    res.status(200).json({
      status: "COMPLETED",
      message: "Audit auto-approved and synced to Shopify.",
      totalDollarVariance,
      totalItemVariance,
    });
  } catch (error) {
    next(error);
  }
};

// 5. Manager Sign-Off / Manual Approval
export const approveAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;

    const session = await AuditSession.findById(id);
    if (!session) return res.status(404).json({ error: "Audit session not found" });

    if (session.status !== "PENDING_APPROVAL") {
      return res.status(400).json({ error: `Audit is not pending approval. Current status: ${session.status}` });
    }

    const lineItems = await AuditLineItem.find({ auditSessionId: id });

    session.status = "APPROVED";
    session.approvedById = managerId;
    await session.save();

    await pushInventoryAdjustments(session.shopId, session.locationId, lineItems);

    session.status = "COMPLETED";
    await session.save();

    res.status(200).json({ status: "COMPLETED", message: "Audit approved and inventory synced." });
  } catch (error) {
    next(error);
  }
};

// 6. Fetch Permanent Audit Logs
export const getAuditHistory = async (req, res, next) => {
  try {
    const { shopId } = req.query;
    const filter = { status: "COMPLETED" };
    if (shopId) filter.shopId = shopId;

    const history = await AuditSession.find(filter)
      .populate("staffId", "name email role")
      .populate("approvedById", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};