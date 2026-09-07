// AuditLineItem — one variant at one location within an audit session

import mongoose from 'mongoose';
import { calcVariance, deriveLineItemStatus } from '../utils/helpers.js';

/**
 * Line-item status (auto-derived):
 *   matched      — actual === expected (variance = 0)
 *   discrepancy  — actual !== expected, but actual > 0
 *   missing      — actual === 0 (not found during count)
 *
 * approvalStatus:
 *   pending   — awaiting manager review (only set when session needs approval)
 *   approved  — manager approved this individual item
 *   rejected  — manager rejected this item (sends session back to staff)
 *   na        — approval not required for this item (auto-approved)
 */

const REASON_CODES = ['damaged', 'missing', 'misplaced', 'wrong_count', 'unknown'];

const auditLineItemSchema = new mongoose.Schema(
  {
    auditSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditSession',
      required: [true, 'auditSessionId is required'],
      index: true,
    },

    // ── Shopify identifiers ──────────────────────────────────────────────────
    shopifyProductId: {
      type: String,
      required: [true, 'shopifyProductId is required'],
    },
    shopifyVariantId: {
      type: String,
      required: [true, 'shopifyVariantId is required'],
    },
    shopifyInventoryItemId: {
      type: String,
      default: null,
    },

    // ── Display info (snapshot from Shopify at session creation time) ─────────
    title: {
      type: String,
      required: [true, 'title is required'],
      maxlength: 500,
    },
    sku: {
      type: String,
      default: null,
    },
    barcode: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },

    // ── Cost (snapshot; used for dollar variance calculation) ─────────────────
    unitCost: {
      type: Number,
      default: 0.0,
      min: 0,
    },

    // ── Counts ────────────────────────────────────────────────────────────────
    expectedCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    actualCount: {
      type: Number,
      default: null, // null = not yet counted (distinct from 0 = counted as zero)
      min: 0,
    },

    // ── Derived fields (written by pre-save hook) ─────────────────────────────
    variance: {
      type: Number,
      default: 0,
    },
    dollarVariance: {
      type: Number,
      default: 0.0,
    },
    /** matched | discrepancy | missing */
    status: {
      type: String,
      enum: ['matched', 'discrepancy', 'missing', 'uncounted'],
      default: 'uncounted',
    },

    // ── Reason & Notes ────────────────────────────────────────────────────────
    reasonCode: {
      type: String,
      enum: [...REASON_CODES, null],
      default: null,
    },
    note: {
      type: String,
      default: '',
      maxlength: 1000,
    },

    // ── Per-item Approval ────────────────────────────────────────────────────
    approvalStatus: {
      type: String,
      enum: ['na', 'pending', 'approved', 'rejected'],
      default: 'na',
    },
    approvedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    managerNote: {
      type: String,
      default: null,
      maxlength: 1000,
    },

    // ── Count Tracking ────────────────────────────────────────────────────────
    /** Timestamp when actualCount was last updated */
    countedAt: {
      type: Date,
      default: null,
    },
    /** Staff member who performed the physical count */
    countedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'tbl_AuditLineItem',
  }
);

// ── Indexes ──────────────────────────────────────────────────────────────────
auditLineItemSchema.index({ auditSessionId: 1, shopifyVariantId: 1 }, { unique: true });
auditLineItemSchema.index({ auditSessionId: 1, status: 1 });
auditLineItemSchema.index({ auditSessionId: 1, approvalStatus: 1 });

// ── Pre-save: auto-derive variance, dollarVariance, and status ────────────────
auditLineItemSchema.pre('save', function (next) {
  if (this.actualCount === null || this.actualCount === undefined) {
    this.status       = 'uncounted';
    this.variance     = 0;
    this.dollarVariance = 0;
    return next();
  }

  this.variance       = calcVariance(this.actualCount, this.expectedCount);
  this.dollarVariance = parseFloat(
    (Math.abs(this.variance) * (this.unitCost ?? 0)).toFixed(2)
  );
  this.status         = deriveLineItemStatus(this.variance, this.actualCount);
  next();
});

// ── Pre-save: stamp countedAt when actualCount is first set ──────────────────
auditLineItemSchema.pre('save', function (next) {
  if (this.isModified('actualCount') && this.actualCount !== null) {
    this.countedAt = new Date();
  }
  next();
});

export default mongoose.models.AuditLineItem || mongoose.model('AuditLineItem', auditLineItemSchema);