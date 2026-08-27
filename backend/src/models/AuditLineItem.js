// Line items for audit sessions (Expected vs Actual counts, net variance, reason tags)

import mongoose from 'mongoose';

const auditLineItemSchema = new mongoose.Schema(
  {
    auditSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditSession',
      required: true,
      index: true,
    },
    productId: {
      type: String,
      required: true,
    },
    variantId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    unitCost: {
      type: Number,
      default: 0.0,
    },
    expectedCount: {
      type: Number,
      default: 0,
    },
    actualCount: {
      type: Number,
      default: 0,
    },
    variance: {
      type: Number,
      default: 0,
    },
    reasonTag: {
      type: String,
      enum: ['damaged', 'missing', 'misplaced', 'wrong count', 'unknown', null],
      default: null,
    },
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to automatically update net variance
auditLineItemSchema.pre('save', function (next) {
  this.variance = this.actualCount - this.expectedCount;
  next();
});

export default mongoose.models.AuditLineItem || mongoose.model('AuditLineItem', auditLineItemSchema);