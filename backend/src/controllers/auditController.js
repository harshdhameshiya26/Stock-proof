/**
 * controllers/auditController.js
 *
 * Complete audit session lifecycle controller.
 * Handles: create, pause, resume, cancel, line item updates,
 *          per-item approve/reject, session submit, bulk approve/reject,
 *          Shopify inventory sync, and history pagination.
 */

import mongoose       from 'mongoose';
import AuditSession   from '../models/AuditSession.js';
import AuditLineItem  from '../models/AuditLineItem.js';
import AuditLog       from '../models/AuditLog.js';
import Settings       from '../models/Settings.js';
import User           from '../models/User.js';
import { sendOtpEmail } from './userController.js';
import { randomInt } from 'node:crypto';
import {
  pushInventoryAdjustments,
} from '../services/shopify.js';
import {
  AppError,
  parsePagination,
  paginatedResponse,
} from '../utils/helpers.js';
import { rollUpSessionTotals, getLiveStockSnapshot } from '../services/auditService.js';
import logger from '../utils/logger.js';

// ── Internal Helpers ──────────────────────────────────────────────────────────

/**
 * Append an immutable log entry for a session event.
 */
const writeLog = async (sessionId, action, actor, opts = {}) => {
  try {
    const actorSnapshot = actor
      ? { name: actor.name, email: actor.email, role: actor.role }
      : {};
    await AuditLog.create({
      sessionId,
      action,
      actorId: actor?._id ?? null,
      actorSnapshot,
      ...opts,
    });
  } catch (err) {
    // Log write failure must never crash the main flow
    logger.error('[AuditLog] Failed to write log entry', { sessionId, action, error: err.message });
  }
};

/**
 * Load a session by ID with basic validation.
 * Throws 404 if not found.
 */
const findSession = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new AppError('Invalid session ID format', 400);
  const session = await AuditSession.findById(id);
  if (!session) throw new AppError('Audit session not found', 404);
  return session;
};

const createApprovalOtp = () => randomInt(100000, 1000000).toString();

const verifyApprovalOtp = (session, manager, otp) => {
  if (!session) throw new AppError('Audit session not found', 404);
  if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
    throw new AppError('A valid 6-digit manager approval OTP is required', 401);
  }
  if (!session.approvalOtp || session.approvalOtpManagerId?.toString() !== manager._id.toString()) {
    throw new AppError('Manager approval OTP not requested or does not belong to this manager', 401);
  }
  if (!session.approvalOtpExpiresAt || session.approvalOtpExpiresAt.getTime() < Date.now()) {
    throw new AppError('Manager approval OTP has expired. Request a new OTP.', 401);
  }
  if (session.approvalOtp !== otp.trim()) {
    throw new AppError('Invalid manager approval OTP', 401);
  }
};

export const requestApprovalOtp = async (req, res, next) => {
  try {
    const session = await AuditSession.findById(req.params.id).select('+approvalOtp +approvalOtpExpiresAt +approvalOtpManagerId');
    if (!session) throw new AppError('Audit session not found', 404);
    if (session.status !== 'PENDING_APPROVAL') {
      throw new AppError('Approval OTP can only be requested for a pending audit', 409);
    }

    const manager = await User.findById(req.user?._id)
      .select('name email role').lean();
    if (!manager || !['MANAGER', 'ADMIN'].includes(manager.role)) {
      throw new AppError('Only a manager or administrator can request approval OTP', 403);
    }

    const otp = createApprovalOtp();
    session.approvalOtp = otp;
    session.approvalOtpManagerId = manager._id;
    session.approvalOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await session.save();

    const emailResult = await sendOtpEmail(manager.email, otp);
    const response = {
      message: `Approval OTP sent to manager email ${manager.email}`,
      otpSent: !emailResult.skipped,
      deliveryStatus: emailResult.skipped ? 'failed' : 'sent',
      expiresAt: session.approvalOtpExpiresAt,
    };
    if (emailResult.messageId) response.messageId = emailResult.messageId;
    if (process.env.NODE_ENV !== 'production' && emailResult.skipped) {
      response.devOtp = otp;
      response.smtpNote = emailResult.reason;
    }
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 * Guard a session status transition. Throws 409 with clear message if invalid.
 */
const assertTransition = (session, targetStatus) => {
  const VALID = AuditSession.VALID_TRANSITIONS[session.status] ?? [];
  if (!VALID.includes(targetStatus)) {
    throw new AppError(
      `Cannot transition from ${session.status} to ${targetStatus}. ` +
      `Allowed transitions: [${VALID.join(', ')}]`,
      409
    );
  }
};

/**
 * Resolve actor: prefer req.user (set by requireRole middleware),
 * fall back to loading the staffId from body or headers.
 */
const resolveActor = async (req) => {
  if (req.user) return req.user;
  const staffId =
    req.headers['x-staff-id'] || req.body?.staffId || req.body?.managerId;
  if (!staffId) return null;
  try {
    return await User.findById(staffId).select('name email role').lean();
  } catch {
    return null;
  }
};

// ── 1. Create Audit Session ───────────────────────────────────────────────────

/**
 * POST /api/audits/start
 *
 * Fetches a live inventory snapshot from Shopify, creates the session,
 * and seeds all line items with expectedCount = current Shopify quantity.
 */
export const setupAudit = async (req, res, next) => {
  try {
    const {
      shopId, locationId, staffId,
      scopeType   = 'location',
      collectionId, vendor, productId,
      name, notes, accessToken
    } = req.body;

    const actor = await resolveActor(req);

    // Fetch live inventory snapshot from Shopify
    logger.info(`[Audit] Fetching stock snapshot for shop=${shopId} scope=${scopeType}`);
    const snapshotItems = await getLiveStockSnapshot({
      shopId, locationId, scopeType, collectionId, vendor, productId, accessToken
    });

    if (!snapshotItems.length) {
      throw new AppError(
        'No inventory items found for the given scope. Cannot create an empty audit session.',
        422
      );
    }

    // Create session
    const auditSession = await AuditSession.create({
      shopId, locationId, staffId,
      scopeType, collectionId, vendor, productId,
      name, notes,
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    });

    // Seed line items
    const lineItemsData = snapshotItems.map((item) => ({
      auditSessionId:         auditSession._id,
      shopifyProductId:       item.shopifyProductId,
      shopifyVariantId:       item.shopifyVariantId,
      shopifyInventoryItemId: item.shopifyInventoryItemId,
      title:       item.title,
      sku:         item.sku,
      barcode:     item.barcode,
      imageUrl:    item.imageUrl,
      unitCost:    item.unitCost,
      expectedCount: item.quantity,
      actualCount:   null,     // not yet counted
      status:        'uncounted',
    }));

    await AuditLineItem.insertMany(lineItemsData, { ordered: false });

    await writeLog(auditSession._id, 'SESSION_CREATED', actor, {
      newValue: { scopeType, locationId, itemCount: lineItemsData.length },
    });

    logger.info(`[Audit] Session created: ${auditSession._id} (${lineItemsData.length} items)`);

    return res.status(201).json({
      message:    'Audit session created successfully',
      sessionId:  auditSession._id,
      auditNumber: auditSession.auditNumber,
      itemCount:  lineItemsData.length,
      session:    auditSession,
    });
  } catch (err) {
    next(err);
  }
};

// ── 2. Get Session Details ────────────────────────────────────────────────────

/**
 * GET /api/audits/:id
 *
 * Returns full session with populated staff/manager refs and all line items.
 * Supports ?status filter on line items: matched, discrepancy, missing, uncounted
 */
export const getAuditSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { itemStatus } = req.query;

    const session = await AuditSession
      .findById(id)
      .populate('staffId',      'name email role')
      .populate('submittedById', 'name email role')
      .populate('approvedById', 'name email role')
      .lean();

    if (!session) throw new AppError('Audit session not found', 404);

    const itemFilter = { auditSessionId: id };
    if (itemStatus) itemFilter.status = itemStatus;

    const lineItems = await AuditLineItem.find(itemFilter)
      .populate('countedById',  'name email')
      .populate('approvedById', 'name email')
      .lean();

    // Compute summary counts
    const summary = {
      total:       lineItems.length,
      counted:     lineItems.filter((i) => i.actualCount !== null).length,
      uncounted:   lineItems.filter((i) => i.actualCount === null).length,
      matched:     lineItems.filter((i) => i.status === 'matched').length,
      discrepancy: lineItems.filter((i) => i.status === 'discrepancy').length,
      missing:     lineItems.filter((i) => i.status === 'missing').length,
      pendingApproval: lineItems.filter((i) => i.approvalStatus === 'pending').length,
    };

    return res.status(200).json({ session, lineItems, summary });
  } catch (err) {
    next(err);
  }
};

// ── 3. List Sessions (with pagination & filters) ──────────────────────────────

/**
 * GET /api/audits
 *
 * Query params: shopId, status, staffId, dateFrom, dateTo, page, limit
 */
export const getAuditHistory = async (req, res, next) => {
  try {
    const { shopId, status, staffId, dateFrom, dateTo } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const filter = {};
    if (shopId)  filter.shopId  = shopId;
    if (status)  filter.status  = status;
    if (staffId) filter.staffId = staffId;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo)   filter.createdAt.$lte = new Date(dateTo);
    }

    const [sessions, total] = await Promise.all([
      AuditSession.find(filter)
        .populate('staffId',      'name email role')
        .populate('submittedById', 'name email role')
        .populate('approvedById', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AuditSession.countDocuments(filter),
    ]);

    // Older sessions may not have submittedById yet. Recover the actual
    // submitter from the immutable submission event instead of using the approver.
    const sessionIds = sessions.map((session) => session._id);
    if (sessionIds.length) {
      const submissionLogs = await AuditLog.find({
        sessionId: { $in: sessionIds },
        action: 'SESSION_SUBMITTED',
      })
        .sort({ createdAt: 1 })
        .populate('actorId', 'name email role')
        .lean();

      const submitterBySession = submissionLogs.reduce((map, log) => {
        if (!map[log.sessionId.toString()]) {
          map[log.sessionId.toString()] = log.actorId || log.actorSnapshot;
        }
        return map;
      }, {});

      sessions.forEach((session) => {
        if (!session.submittedById) {
          session.submittedById = submitterBySession[session._id.toString()] || null;
        }
      });
    }

    return res.status(200).json(paginatedResponse(sessions, total, page, limit));
  } catch (err) {
    next(err);
  }
};

// ── 4. Update Line Item (actual count, reason, note) ─────────────────────────

/**
 * PATCH /api/audits/:id/items/:itemId
 */
export const updateLineItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const { actualCount, reasonCode, note } = req.body;
    const actor = await resolveActor(req);

    if (!mongoose.isValidObjectId(itemId)) throw new AppError('Invalid line item ID', 400);

    const lineItem = await AuditLineItem.findOne({ _id: itemId, auditSessionId: id });
    if (!lineItem) throw new AppError('Line item not found in this audit session', 404);

    // Capture previous state for audit log
    const previousValue = {
      actualCount: lineItem.actualCount,
      reasonCode:  lineItem.reasonCode,
      note:        lineItem.note,
      variance:    lineItem.variance,
    };

    if (actualCount !== undefined) {
      lineItem.actualCount  = actualCount;
      lineItem.countedById  = actor?._id ?? lineItem.countedById;
    }
    if (reasonCode !== undefined) lineItem.reasonCode = reasonCode;
    if (note       !== undefined) lineItem.note       = note;

    await lineItem.save(); // triggers pre-save hook for variance/status

    await writeLog(id, 'LINE_ITEM_UPDATED', actor, {
      lineItemId: lineItem._id,
      previousValue,
      newValue: {
        actualCount: lineItem.actualCount,
        reasonCode:  lineItem.reasonCode,
        note:        lineItem.note,
        variance:    lineItem.variance,
        status:      lineItem.status,
      },
    });

    return res.status(200).json({
      message:  'Line item updated successfully',
      lineItem,
    });
  } catch (err) {
    next(err);
  }
};

// ── 5. Pause Session ─────────────────────────────────────────────────────────

/**
 * PATCH /api/audits/:id/pause
 */
export const pauseAudit = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const actor   = await resolveActor(req);
    const session = await findSession(id);

    assertTransition(session, 'PAUSED');

    session.status   = 'PAUSED';
    session.pausedAt = new Date();
    await session.save();

    await writeLog(id, 'SESSION_PAUSED', actor);

    return res.status(200).json({ message: 'Audit session paused', status: session.status });
  } catch (err) {
    next(err);
  }
};

// ── 6. Resume Session ─────────────────────────────────────────────────────────

/**
 * PATCH /api/audits/:id/resume
 */
export const resumeAudit = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const actor   = await resolveActor(req);
    const session = await findSession(id);

    assertTransition(session, 'IN_PROGRESS');

    session.status   = 'IN_PROGRESS';
    session.pausedAt = null;
    await session.save();

    await writeLog(id, 'SESSION_RESUMED', actor);

    return res.status(200).json({ message: 'Audit session resumed', status: session.status });
  } catch (err) {
    next(err);
  }
};

// ── 7. Cancel Session ─────────────────────────────────────────────────────────

/**
 * DELETE /api/audits/:id/cancel
 */
export const cancelAudit = async (req, res, next) => {
  try {
    const { id }       = req.params;
    const { cancelNote } = req.body;
    const actor        = await resolveActor(req);
    const session      = await findSession(id);

    assertTransition(session, 'CANCELLED');

    session.status      = 'CANCELLED';
    session.cancelledAt = new Date();
    await session.save();

    await writeLog(id, 'SESSION_CANCELLED', actor, { note: cancelNote || '' });

    return res.status(200).json({ message: 'Audit session cancelled', status: session.status });
  } catch (err) {
    next(err);
  }
};

// ── 8. Submit Audit (Threshold Check → Auto or Pending Approval) ───────────────

/**
 * POST /api/audits/:id/submit
 *
 * - Calculates total variance & dollar variance
 * - If within threshold: auto-approves and syncs to Shopify → COMPLETED
 * - If over threshold: flags line items as pending → PENDING_APPROVAL
 */
export const submitAudit = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const actor   = await resolveActor(req);
    const session = await findSession(id);

    assertTransition(session, 'PENDING_APPROVAL');

    const lineItems = await AuditLineItem.find({ auditSessionId: id });

    // Compute totals
    const totals = rollUpSessionTotals(lineItems);
    session.totalItemsCounted  = totals.totalItemsCounted;
    session.totalNetVariance   = totals.totalNetVariance;
    session.totalDollarVariance = totals.totalDollarVariance;
    session.submittedAt        = new Date();
    session.submittedById      = actor?._id ?? session.staffId;

    // Load settings (use defaults if none configured)
    const settings = await Settings.findOne({ shopId: session.shopId });
    const settingsDoc = settings || new Settings({ shopId: session.shopId });

    const needsApproval = settingsDoc.requiresApproval(
      totals.totalDollarVariance,
      totals.totalNetVariance
    );

    await writeLog(id, 'SESSION_SUBMITTED', actor, {
      newValue: { ...totals, needsApproval },
    });

    if (needsApproval) {
      // Flag all discrepancy line items as pending manager review
      await AuditLineItem.updateMany(
        { auditSessionId: id, status: { $in: ['discrepancy', 'missing'] } },
        { $set: { approvalStatus: 'pending' } }
      );
      // Items that matched don't need approval
      await AuditLineItem.updateMany(
        { auditSessionId: id, status: 'matched' },
        { $set: { approvalStatus: 'na' } }
      );

      session.status = 'PENDING_APPROVAL';
      await session.save();

      logger.info(`[Audit] Session ${id} submitted → PENDING_APPROVAL`);
      return res.status(200).json({
        status:  'PENDING_APPROVAL',
        message: 'Audit submitted. Manager approval required — variance exceeds configured threshold.',
        totals,
        thresholds: {
          dollarLimit: settingsDoc.dollarLimit,
          itemLimit:   settingsDoc.itemLimit,
        },
      });
    }

    // Within threshold — auto-approve and sync
    session.status        = 'COMPLETED';
    session.approvedById  = null; // auto-approved (no manager)
    session.completedAt   = new Date();
    await session.save();

    const syncResult = await pushInventoryAdjustments(
      session.shopId, session.locationId, lineItems, settingsDoc
    );

    await writeLog(id, 'SHOPIFY_SYNC', actor, {
      newValue:           syncResult,
      shopifySyncResult:  syncResult,
    });
    await writeLog(id, 'SESSION_COMPLETED', actor, { newValue: { autoApproved: true } });

    logger.info(`[Audit] Session ${id} auto-approved → COMPLETED. Synced ${syncResult.adjustedCount} items.`);
    return res.status(200).json({
      status:  'COMPLETED',
      message: 'Audit auto-approved and inventory synced to Shopify.',
      totals,
      syncResult,
    });
  } catch (err) {
    next(err);
  }
};

// ── 9. Per-Item Manager Approve ───────────────────────────────────────────────

/**
 * POST /api/audits/:id/items/:itemId/approve
 */
export const approveLineItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const { managerNote, approvalOtp } = req.body;
    const actor = await resolveActor(req);
    const manager = actor;
    const session = await AuditSession.findById(id).select('+approvalOtp +approvalOtpExpiresAt +approvalOtpManagerId');
    if (!manager || !['MANAGER', 'ADMIN'].includes(manager.role)) {
      throw new AppError('Only a manager or administrator can approve an item', 403);
    }
    verifyApprovalOtp(session, manager, approvalOtp);

    const lineItem = await AuditLineItem.findOne({ _id: itemId, auditSessionId: id });
    if (!lineItem) throw new AppError('Line item not found in this audit session', 404);

    if (lineItem.approvalStatus !== 'pending') {
      throw new AppError(
        `Line item is not pending approval. Current approval status: ${lineItem.approvalStatus}`,
        409
      );
    }

    lineItem.approvalStatus = 'approved';
    lineItem.approvedById   = manager._id;
    lineItem.approvedAt     = new Date();
    if (managerNote) lineItem.managerNote = managerNote;
    await lineItem.save();

    await writeLog(id, 'LINE_ITEM_APPROVED', actor, {
      lineItemId:   lineItem._id,
      newValue:     { approvalStatus: 'approved', managerId: manager._id },
      note:         managerNote || '',
    });

    return res.status(200).json({ message: 'Line item approved', lineItem });
  } catch (err) {
    next(err);
  }
};

// ── 10. Per-Item Manager Reject ───────────────────────────────────────────────

/**
 * POST /api/audits/:id/items/:itemId/reject
 * Returns the session to IN_PROGRESS so staff can re-count this item.
 */
export const rejectLineItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const { managerId, managerNote } = req.body;
    const actor = await resolveActor(req);

    const lineItem = await AuditLineItem.findOne({ _id: itemId, auditSessionId: id });
    if (!lineItem) throw new AppError('Line item not found in this audit session', 404);

    if (lineItem.approvalStatus !== 'pending') {
      throw new AppError(
        `Line item is not pending approval. Current approval status: ${lineItem.approvalStatus}`,
        409
      );
    }

    lineItem.approvalStatus = 'rejected';
    lineItem.approvedById   = managerId;
    lineItem.approvedAt     = new Date();
    lineItem.managerNote    = managerNote;
    // Reset the count so staff must recount
    lineItem.actualCount    = null;
    lineItem.status         = 'uncounted';
    lineItem.variance       = 0;
    await lineItem.save();

    await writeLog(id, 'LINE_ITEM_REJECTED', actor, {
      lineItemId: lineItem._id,
      newValue:   { approvalStatus: 'rejected', managerId },
      note:       managerNote,
    });

    // If session was PENDING_APPROVAL, revert to IN_PROGRESS
    const session = await findSession(id);
    if (session.status === 'PENDING_APPROVAL') {
      session.status          = 'IN_PROGRESS';
      session.rejectionCount += 1;
      session.rejectionNote   = managerNote;
      await session.save();
      await writeLog(id, 'SESSION_REJECTED', actor, { note: managerNote });
    }

    return res.status(200).json({
      message: 'Line item rejected. Session reverted to IN_PROGRESS for re-count.',
      lineItem,
      sessionStatus: session.status,
    });
  } catch (err) {
    next(err);
  }
};

// ── 11. Bulk Session Approve ──────────────────────────────────────────────────

/**
 * POST /api/audits/:id/approve
 *
 * Manager approves the entire session.
 * All pending line items are approved, inventory is pushed to Shopify.
 */
export const approveAudit = async (req, res, next) => {
  try {
    const { id }      = req.params;
    const { approvalOtp } = req.body;
    const actor       = await resolveActor(req);
    const session     = await findSession(id);

    const approvalSession = await AuditSession.findById(id)
      .select('+approvalOtp +approvalOtpExpiresAt +approvalOtpManagerId');
    verifyApprovalOtp(approvalSession, actor, approvalOtp);

    assertTransition(session, 'COMPLETED');
    if (session.status !== 'PENDING_APPROVAL') {
      throw new AppError('Session must be in PENDING_APPROVAL status to approve', 409);
    }

    // Bulk-approve all still-pending line items
    await AuditLineItem.updateMany(
      { auditSessionId: id, approvalStatus: 'pending' },
      {
        $set: {
          approvalStatus: 'approved',
          approvedById:   actor._id,
          approvedAt:     new Date(),
        },
      }
    );

    const lineItems = await AuditLineItem.find({ auditSessionId: id });
    const settings  = await Settings.findOne({ shopId: session.shopId });

    // Push to Shopify
    const syncResult = await pushInventoryAdjustments(
      session.shopId, session.locationId, lineItems, settings
    );

    session.status      = 'COMPLETED';
    session.approvedById = actor._id;
    session.completedAt = new Date();
    session.approvalOtp = null;
    session.approvalOtpExpiresAt = null;
    session.approvalOtpManagerId = null;
    await session.save();

    await writeLog(id, 'SESSION_APPROVED', actor, { newValue: { managerId: actor._id } });
    await writeLog(id, 'SHOPIFY_SYNC', actor, { newValue: syncResult, shopifySyncResult: syncResult });
    await writeLog(id, 'SESSION_COMPLETED', actor);

    logger.info(`[Audit] Session ${id} approved by manager ${actor._id} → COMPLETED`);

    return res.status(200).json({
      status:  'COMPLETED',
      message: 'Audit approved and inventory synced to Shopify.',
      syncResult,
    });
  } catch (err) {
    next(err);
  }
};

// ── 12. Bulk Session Reject ───────────────────────────────────────────────────

/**
 * POST /api/audits/:id/reject
 *
 * Manager rejects the entire session, returning it to IN_PROGRESS.
 * All pending line items are reset so staff must recount them.
 */
export const rejectAudit = async (req, res, next) => {
  try {
    const { id }      = req.params;
    const { managerId, rejectionNote } = req.body;
    const actor       = await resolveActor(req);
    const session     = await findSession(id);

    assertTransition(session, 'IN_PROGRESS');
    if (session.status !== 'PENDING_APPROVAL') {
      throw new AppError('Session must be in PENDING_APPROVAL status to reject', 409);
    }

    // Reset all pending items back to uncounted
    await AuditLineItem.updateMany(
      { auditSessionId: id, approvalStatus: 'pending' },
      {
        $set: {
          approvalStatus: 'na',
          actualCount:    null,
          status:         'uncounted',
          variance:       0,
          dollarVariance: 0,
          managerNote:    rejectionNote,
        },
      }
    );

    session.status          = 'IN_PROGRESS';
    session.rejectionCount += 1;
    session.rejectionNote   = rejectionNote;
    await session.save();

    await writeLog(id, 'SESSION_REJECTED', actor, {
      newValue: { rejectionCount: session.rejectionCount },
      note:     rejectionNote,
    });

    logger.info(`[Audit] Session ${id} rejected by manager ${managerId}`);

    return res.status(200).json({
      status:  'IN_PROGRESS',
      message: 'Audit rejected. Session returned to staff for re-count.',
      rejectionCount: session.rejectionCount,
    });
  } catch (err) {
    next(err);
  }
};

// ── 13. Audit Event Logs ──────────────────────────────────────────────────────

/**
 * GET /api/audits/:id/logs
 *
 * Returns the immutable event log for a session in chronological order.
 */
export const getAuditLogs = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new AppError('Invalid session ID', 400);

    const logs = await AuditLog.find({ sessionId: id })
      .populate('actorId',    'name email role')
      .populate('lineItemId', 'title sku shopifyVariantId')
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({ sessionId: id, count: logs.length, logs });
  } catch (err) {
    next(err);
  }
};