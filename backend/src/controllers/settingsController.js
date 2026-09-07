// Configures variance thresholds ($ & count limits), reason codes, and sync settings

import Settings  from '../models/Settings.js';
import { AppError } from '../utils/helpers.js';

// ── GET /api/settings/:storeId ────────────────────────────────────────────────

/**
 * Fetch the settings document for a store.
 * Auto-creates a default settings record if none exists.
 */
export const getSettings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    let settings = await Settings.findOne({ shopId: storeId });

    if (!settings) {
      // Auto-provision defaults for this store
      settings = await Settings.create({ shopId: storeId });
    }

    return res.status(200).json({ settings });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/settings/:storeId ────────────────────────────────────────────────

/**
 * Update threshold rules and configuration for a store.
 * Only provided fields are updated (partial update via $set).
 * Restricted to MANAGER / ADMIN roles (enforced at route level).
 */
export const updateSettings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const {
      dollarLimit,
      itemLimit,
      requireBothThresholds,
      alwaysRequireApproval,
      customReasonCodes,
      syncVarianceOnly,
      shopifyAdjustmentReason,
      approvalNotifyEmails,
    } = req.body;

    // Build update object from only the fields that were sent
    const update = {};
    if (dollarLimit              !== undefined) update.dollarLimit              = dollarLimit;
    if (itemLimit                !== undefined) update.itemLimit                = itemLimit;
    if (requireBothThresholds    !== undefined) update.requireBothThresholds    = requireBothThresholds;
    if (alwaysRequireApproval    !== undefined) update.alwaysRequireApproval    = alwaysRequireApproval;
    if (customReasonCodes        !== undefined) update.customReasonCodes        = customReasonCodes;
    if (syncVarianceOnly         !== undefined) update.syncVarianceOnly         = syncVarianceOnly;
    if (shopifyAdjustmentReason  !== undefined) update.shopifyAdjustmentReason  = shopifyAdjustmentReason;
    if (approvalNotifyEmails     !== undefined) update.approvalNotifyEmails     = approvalNotifyEmails;

    if (Object.keys(update).length === 0) {
      throw new AppError('No valid settings fields provided in request body', 400);
    }

    const settings = await Settings.findOneAndUpdate(
      { shopId: storeId },
      { $set: update },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      message:  'Settings updated successfully',
      settings,
    });
  } catch (err) {
    next(err);
  }
};