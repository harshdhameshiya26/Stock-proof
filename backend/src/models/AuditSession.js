// AuditSession — the top-level audit record for a stock count run

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

/**
 * Status machine:
 *   DRAFT → IN_PROGRESS → PENDING_APPROVAL → COMPLETED
 *                       ↘ CANCELLED
 *                                          ↘ IN_PROGRESS (rejected)
 *
 * scopeType determines which Shopify products are pulled into the session:
 *   all        — entire catalog at a location
 *   location   — specific location only (default)
 *   collection — a specific Shopify collection
 *   vendor     — all products from a specific vendor
 *   product    — a single product (all variants)
 */

const AUDIT_STATUSES = ['DRAFT', 'IN_PROGRESS', 'PAUSED', 'PENDING_APPROVAL', 'COMPLETED', 'CANCELLED'];
const SCOPE_TYPES    = ['all', 'location', 'collection', 'vendor', 'product'];

const auditSessionSchema = new mongoose.Schema(
  {
    /** Shopify shop domain, e.g. "my-store.myshopify.com" */
    shopId: {
      type: String,
      required: [true, 'shopId is required'],
      trim: true,
    },

    // ── Scope ────────────────────────────────────────────────────────────────
    scopeType: {
      type: String,
      enum: SCOPE_TYPES,
      default: 'location',
    },
    /** Shopify GID for the location (required for all scopes) */
    locationId: {
      type: String,
      required: [true, 'locationId is required'],
    },
    /** Shopify GID for the collection (when scopeType = collection) */
    collectionId: {
      type: String,
      default: null,
    },
    /** Vendor name string (when scopeType = vendor) */
    vendor: {
      type: String,
      default: null,
    },
    /** Shopify GID for the product (when scopeType = product) */
    productId: {
      type: String,
      default: null,
    },

    // ── Participants ──────────────────────────────────────────────────────────
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'staffId is required'],
    },
    /** Staff member who submitted the completed count for review. */
    submittedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvalOtp: { type: String, default: null, select: false },
    approvalOtpExpiresAt: { type: Date, default: null, select: false },
    approvalOtpManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, select: false },

    // ── Status ────────────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: AUDIT_STATUSES,
      default: 'IN_PROGRESS',
    },
    baselineStale: {
      type: Boolean,
      default: false,
    },

    // ── Timestamps ────────────────────────────────────────────────────────────
    startedAt: {
      type: Date,
      default: Date.now,
    },
    pausedAt: {
      type: Date,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },

    // ── Summary Totals (updated on submit) ───────────────────────────────────
    totalItemsCounted: {
      type: Number,
      default: 0,
      min: 0,
    },
    /** Sum of all variances (signed; can be negative) */
    totalNetVariance: {
      type: Number,
      default: 0,
    },
    /** Sum of |variance| × unitCost across all line items */
    totalDollarVariance: {
      type: Number,
      default: 0.0,
    },

    // ── Rejection Tracking ───────────────────────────────────────────────────
    /** Manager note when a session is rejected back to IN_PROGRESS */
    rejectionNote: {
      type: String,
      default: null,
      maxlength: 2000,
    },
    /** Number of times this session has been sent back for re-count */
    rejectionCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ── Optional display name ─────────────────────────────────────────────────
    name: {
      type: String,
      trim: true,
      maxlength: 200,
      default: null,
    },
    notes: {
      type: String,
      maxlength: 2000,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'tbl_AuditSession',
  }
);

// ── Indexes ──────────────────────────────────────────────────────────────────
auditSessionSchema.index({ shopId: 1, status: 1 });
auditSessionSchema.index({ shopId: 1, createdAt: -1 });
auditSessionSchema.index({ staffId: 1 });

// ── Auto-incrementing human-readable audit number ─────────────────────────────
auditSessionSchema.plugin(AutoIncrement, { inc_field: 'auditNumber' });

// ── Static: valid status transitions ─────────────────────────────────────────
auditSessionSchema.statics.VALID_TRANSITIONS = {
  DRAFT:            ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS:      ['PAUSED', 'PENDING_APPROVAL', 'COMPLETED', 'CANCELLED'],
  PAUSED:           ['IN_PROGRESS', 'CANCELLED'],
  PENDING_APPROVAL: ['COMPLETED', 'IN_PROGRESS', 'CANCELLED'],
  COMPLETED:        [],
  CANCELLED:        [],
};

/**
 * Instance method: assert a transition is legal, then apply it.
 * Throws AppError if the transition is invalid.
 */
auditSessionSchema.methods.transition = function (newStatus) {
  const { AppError } = require('../utils/helpers.js'); // lazy to avoid circular dep
  const allowed = auditSessionSchema.statics.VALID_TRANSITIONS[this.status];
  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid status transition: ${this.status} → ${newStatus}. Allowed: [${allowed.join(', ')}]`
    );
  }
  this.status = newStatus;
};

export default mongoose.models.AuditSession || mongoose.model('AuditSession', auditSessionSchema);