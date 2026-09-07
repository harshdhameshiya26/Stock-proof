// AuditLog — immutable event log for every state change in a session

import mongoose from 'mongoose';

/**
 * Every significant action on an audit session or its line items
 * is recorded here as an append-only log entry.
 *
 * action enum covers:
 *   SESSION_CREATED     — new session opened
 *   SESSION_PAUSED      — session paused mid-count
 *   SESSION_RESUMED     — session resumed after pause
 *   SESSION_SUBMITTED   — submitted for approval/auto-sync
 *   SESSION_APPROVED    — manager approved the whole session
 *   SESSION_REJECTED    — manager rejected the whole session
 *   SESSION_COMPLETED   — inventory synced to Shopify
 *   SESSION_CANCELLED   — session abandoned
 *   LINE_ITEM_UPDATED   — actual count / reason / note changed
 *   LINE_ITEM_APPROVED  — manager approved a single line item
 *   LINE_ITEM_REJECTED  — manager rejected a single line item
 *   SHOPIFY_SYNC        — inventory push to Shopify
 */

const auditLogSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditSession',
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'SESSION_CREATED',
        'SESSION_PAUSED',
        'SESSION_RESUMED',
        'SESSION_SUBMITTED',
        'SESSION_APPROVED',
        'SESSION_REJECTED',
        'SESSION_COMPLETED',
        'SESSION_CANCELLED',
        'LINE_ITEM_UPDATED',
        'LINE_ITEM_APPROVED',
        'LINE_ITEM_REJECTED',
        'SHOPIFY_SYNC',
      ],
    },
    /** The user (_id) who triggered this action */
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    /** Human-readable actor info snapshot (denormalized so logs stay valid if user deleted) */
    actorSnapshot: {
      name:  { type: String, default: null },
      email: { type: String, default: null },
      role:  { type: String, default: null },
    },
    /** For LINE_ITEM_* actions: which line item */
    lineItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditLineItem',
      default: null,
    },
    /** Arbitrary previous-state snapshot */
    previousValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    /** Arbitrary next-state snapshot */
    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    /** Optional free-text context (e.g. rejection reason) */
    note: {
      type: String,
      default: '',
      maxlength: 1000,
    },
    /** Shopify sync metadata (for SHOPIFY_SYNC action) */
    shopifySyncResult: {
      success:       { type: Boolean, default: null },
      adjustedCount: { type: Number,  default: null },
      errors:        { type: [String], default: [] },
    },
  },
  {
    // createdAt only — logs are immutable, no updatedAt needed
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'tbl_AuditLog',
  }
);

// Compound index for efficient session timeline queries
auditLogSchema.index({ sessionId: 1, createdAt: 1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
