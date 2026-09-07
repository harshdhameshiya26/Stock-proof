// Request body validation — audit setup, line item updates, approval actions, settings

import { AppError } from '../utils/helpers.js';

const VALID_REASON_CODES = ['damaged', 'missing', 'misplaced', 'wrong_count', 'unknown'];
const VALID_SCOPE_TYPES  = ['all', 'location', 'collection', 'vendor', 'product'];
const VALID_STATUSES     = ['DRAFT', 'IN_PROGRESS', 'PAUSED', 'PENDING_APPROVAL', 'COMPLETED', 'CANCELLED'];

// ── Generic validation helper ────────────────────────────────────────────────

const validationError = (res, details) =>
  res.status(400).json({ status: 'error', message: 'Validation failed', details });

// ── 1. Audit Session Setup ────────────────────────────────────────────────────

/**
 * POST /api/audits/start
 * Required: shopId, locationId, staffId
 * Optional: scopeType, collectionId, vendor, productId, name, notes
 */
export const validateAuditSetup = (req, res, next) => {
  const { shopId, locationId, staffId, scopeType, collectionId, vendor, productId } = req.body;
  const errors = [];

  if (!shopId    || typeof shopId    !== 'string') errors.push("'shopId' must be a non-empty string.");
  if (!locationId|| typeof locationId!== 'string') errors.push("'locationId' must be a non-empty string.");
  if (!staffId   || typeof staffId   !== 'string') errors.push("'staffId' must be a non-empty string.");

  if (scopeType !== undefined && !VALID_SCOPE_TYPES.includes(scopeType)) {
    errors.push(`'scopeType' must be one of: ${VALID_SCOPE_TYPES.join(', ')}.`);
  }

  if (scopeType === 'collection' && !collectionId) {
    errors.push("'collectionId' is required when scopeType is 'collection'.");
  }
  if (scopeType === 'vendor' && !vendor) {
    errors.push("'vendor' is required when scopeType is 'vendor'.");
  }
  if (scopeType === 'product' && !productId) {
    errors.push("'productId' is required when scopeType is 'product'.");
  }

  if (errors.length) return validationError(res, errors);
  next();
};

// ── 2. Line Item Count & Reason Update ───────────────────────────────────────

/**
 * PATCH /api/audits/:id/items/:itemId
 * At least one of actualCount, reasonCode, or note must be provided.
 */
export const validateLineItemUpdate = (req, res, next) => {
  const { actualCount, reasonCode, note } = req.body;
  const errors = [];

  if (actualCount === undefined && reasonCode === undefined && note === undefined) {
    errors.push('At least one field must be provided: actualCount, reasonCode, or note.');
  }

  if (actualCount !== undefined) {
    if (typeof actualCount !== 'number' || !Number.isFinite(actualCount) || actualCount < 0) {
      errors.push("'actualCount' must be a non-negative finite number.");
    }
  }

  if (reasonCode !== undefined && reasonCode !== null) {
    if (!VALID_REASON_CODES.includes(reasonCode)) {
      errors.push(`'reasonCode' must be one of: ${VALID_REASON_CODES.join(', ')} or null.`);
    }
  }

  if (note !== undefined && typeof note !== 'string') {
    errors.push("'note' must be a string.");
  }
  if (note && note.length > 1000) {
    errors.push("'note' must not exceed 1000 characters.");
  }

  if (errors.length) return validationError(res, errors);
  next();
};

// ── 3. Full Session Approve / Reject ─────────────────────────────────────────

/**
 * POST /api/audits/:id/approve
 * Required: managerId (or comes from req.user set by requireManager)
 */
export const validateSessionApproval = (req, res, next) => {
  const managerId = req.body?.managerId || req.user?._id?.toString();
  if (!managerId) {
    return validationError(res, ["'managerId' is required in the request body."]);
  }
  // Normalize so controller can read from body regardless of source
  req.body.managerId = managerId;
  next();
};

/**
 * POST /api/audits/:id/reject
 * Required: managerId (or req.user), rejectionNote
 */
export const validateSessionRejection = (req, res, next) => {
  const errors     = [];
  const managerId  = req.body?.managerId || req.user?._id?.toString();
  const { rejectionNote } = req.body;

  if (!managerId)    errors.push("'managerId' is required.");
  if (!rejectionNote || typeof rejectionNote !== 'string' || rejectionNote.trim().length < 3) {
    errors.push("'rejectionNote' is required and must be at least 3 characters.");
  }

  if (errors.length) return validationError(res, errors);
  req.body.managerId = managerId;
  next();
};

// ── 4. Per-Item Approve / Reject ─────────────────────────────────────────────

/**
 * POST /api/audits/:id/items/:itemId/approve
 */
export const validateItemApproval = (req, res, next) => {
  const managerId = req.body?.managerId || req.user?._id?.toString();
  if (!managerId) {
    return validationError(res, ["'managerId' is required."]);
  }
  req.body.managerId = managerId;
  next();
};

/**
 * POST /api/audits/:id/items/:itemId/reject
 * Required: managerId, managerNote
 */
export const validateItemRejection = (req, res, next) => {
  const errors    = [];
  const managerId = req.body?.managerId || req.user?._id?.toString();
  const { managerNote } = req.body;

  if (!managerId)  errors.push("'managerId' is required.");
  if (!managerNote || typeof managerNote !== 'string' || managerNote.trim().length < 3) {
    errors.push("'managerNote' is required and must be at least 3 characters.");
  }

  if (errors.length) return validationError(res, errors);
  req.body.managerId = managerId;
  next();
};

// ── 5. Settings Update ────────────────────────────────────────────────────────

/**
 * PUT /api/settings/:storeId
 */
export const validateSettingsUpdate = (req, res, next) => {
  const {
    dollarLimit, itemLimit, requireBothThresholds, alwaysRequireApproval,
    customReasonCodes, syncVarianceOnly, shopifyAdjustmentReason,
  } = req.body;
  const errors = [];

  if (dollarLimit !== undefined) {
    if (typeof dollarLimit !== 'number' || dollarLimit < 0) {
      errors.push("'dollarLimit' must be a non-negative number.");
    }
  }
  if (itemLimit !== undefined) {
    if (typeof itemLimit !== 'number' || !Number.isInteger(itemLimit) || itemLimit < 0) {
      errors.push("'itemLimit' must be a non-negative integer.");
    }
  }
  if (requireBothThresholds !== undefined && typeof requireBothThresholds !== 'boolean') {
    errors.push("'requireBothThresholds' must be a boolean.");
  }
  if (alwaysRequireApproval !== undefined && typeof alwaysRequireApproval !== 'boolean') {
    errors.push("'alwaysRequireApproval' must be a boolean.");
  }
  if (syncVarianceOnly !== undefined && typeof syncVarianceOnly !== 'boolean') {
    errors.push("'syncVarianceOnly' must be a boolean.");
  }
  if (customReasonCodes !== undefined) {
    if (!Array.isArray(customReasonCodes)) {
      errors.push("'customReasonCodes' must be an array of strings.");
    } else if (customReasonCodes.length === 0) {
      errors.push("'customReasonCodes' must contain at least one reason code.");
    } else if (!customReasonCodes.every((c) => typeof c === 'string' && c.trim().length > 0)) {
      errors.push("Every item in 'customReasonCodes' must be a non-empty string.");
    }
  }

  const VALID_REASONS = [
    'cycle_count_available', 'correction', 'received', 'moved',
    'promotion', 'at_location', 'damaged', 'theft', 'shrinkage', 'other',
  ];
  if (shopifyAdjustmentReason !== undefined && !VALID_REASONS.includes(shopifyAdjustmentReason)) {
    errors.push(`'shopifyAdjustmentReason' must be one of: ${VALID_REASONS.join(', ')}.`);
  }

  if (errors.length) return validationError(res, errors);
  next();
};

// ── 6. Cancel Session ────────────────────────────────────────────────────────

/**
 * DELETE /api/audits/:id/cancel
 * No required body — just validates optional cancelNote
 */
export const validateSessionCancel = (req, res, next) => {
  const { cancelNote } = req.body;
  if (cancelNote !== undefined && typeof cancelNote !== 'string') {
    return validationError(res, ["'cancelNote' must be a string."]);
  }
  next();
};

// ── 7. User Creation ─────────────────────────────────────────────────────────

export const validateUserCreate = (req, res, next) => {
  const { name, email, role, shopId } = req.body;
  const errors = [];

  if (!name  || typeof name  !== 'string' || name.trim().length < 1)  errors.push("'name' is required.");
  if (!email || typeof email !== 'string' || !email.includes('@'))     errors.push("'email' must be a valid email address.");
  if (!shopId|| typeof shopId !== 'string')                            errors.push("'shopId' is required.");

  const VALID_ROLES = ['STAFF', 'MANAGER', 'ADMIN'];
  if (role !== undefined && !VALID_ROLES.includes(role)) {
    errors.push(`'role' must be one of: ${VALID_ROLES.join(', ')}.`);
  }

  if (errors.length) return validationError(res, errors);
  next();
};

export const validateUserRegistration = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push("'name' is required and must be at least 2 characters long.");
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("'email' must be a valid email address.");
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push("'password' is required and must be at least 8 characters long.");
  }

  const VALID_ROLES = ['STAFF', 'MANAGER', 'ADMIN'];
  if (role !== undefined && !VALID_ROLES.includes(role)) {
    errors.push(`'role' must be one of: ${VALID_ROLES.join(', ')}.`);
  }

  if (errors.length) return validationError(res, errors);
  next();
};