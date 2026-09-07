// Settings — per-shop audit threshold rules and reason code configuration

import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    /** Shopify shop domain — one settings document per store */
    shopId: {
      type: String,
      required: [true, 'shopId is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // ── Approval Threshold Rules ───────────────────────────────────────────────
    /**
     * If the absolute dollar variance of a session exceeds this value,
     * the session requires manager approval before syncing to Shopify.
     * Set to 0 to always require approval. Set to Infinity to disable.
     */
    dollarLimit: {
      type: Number,
      default: 0,
      min: [0, 'dollarLimit must be non-negative'],
    },
    /**
     * If the absolute net quantity variance of a session exceeds this value,
     * the session requires manager approval.
     */
    itemLimit: {
      type: Number,
      default: 0,
      min: [0, 'itemLimit must be non-negative'],
    },
    /**
     * When true: BOTH thresholds must be exceeded to require approval.
     * When false (default): EITHER threshold being exceeded triggers approval.
     */
    requireBothThresholds: {
      type: Boolean,
      default: false,
    },
    /**
     * When true: always require manager approval regardless of variance amount.
     * Overrides dollarLimit and itemLimit checks.
     */
    alwaysRequireApproval: {
      type: Boolean,
      default: true,
    },

    // ── Reason Code Configuration ─────────────────────────────────────────────
    /**
     * Allowed reason codes for line items with variance.
     * Operators can add custom codes on top of the system defaults.
     * System defaults: damaged, missing, misplaced, wrong_count, unknown
     */
    customReasonCodes: {
      type: [String],
      default: ['damaged', 'missing', 'misplaced', 'wrong_count', 'unknown'],
      validate: {
        validator: (arr) => arr.every((v) => typeof v === 'string' && v.trim().length > 0),
        message: 'All reason codes must be non-empty strings',
      },
    },

    // ── Sync Configuration ────────────────────────────────────────────────────
    /**
     * When true: only sync line items where variance !== 0 to Shopify.
     * When false: set quantity for all items (even matched ones).
     */
    syncVarianceOnly: {
      type: Boolean,
      default: true,
    },
    /**
     * The Shopify inventory adjustment reason to pass to the API.
     * Options: cycle_count_available, correction, received, moved, promotion,
     *          at_location, damaged, theft, shrinkage, other
     */
    shopifyAdjustmentReason: {
      type: String,
      default: 'cycle_count_available',
      enum: [
        'cycle_count_available', 'correction', 'received', 'moved',
        'promotion', 'at_location', 'damaged', 'theft', 'shrinkage', 'other',
      ],
    },

    // ── Notification Settings ─────────────────────────────────────────────────
    /** Email address(es) to notify when a session requires manager approval */
    approvalNotifyEmails: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'tbl_Settings',
  }
);

/**
 * Instance method: evaluate whether a session's totals require manager approval.
 * Respects requireBothThresholds and alwaysRequireApproval flags.
 */
settingsSchema.methods.requiresApproval = function (totalDollarVariance, totalNetVariance) {
  if (this.alwaysRequireApproval) return true;

  const dollarOver = Math.abs(totalDollarVariance) > this.dollarLimit;
  const itemOver   = Math.abs(totalNetVariance)    > this.itemLimit;

  return this.requireBothThresholds
    ? dollarOver && itemOver   // both must exceed
    : dollarOver || itemOver;  // either can trigger (default)
};

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);