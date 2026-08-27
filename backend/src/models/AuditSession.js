//Session schema (baseline snapshot, status, staff ID, location)

import mongoose from 'mongoose';

const auditSessionSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    locationId: {
      type: String,
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'PENDING_APPROVAL', 'APPROVED', 'COMPLETED', 'CANCELLED'],
      default: 'IN_PROGRESS',
    },
    totalItemsCounted: {
      type: Number,
      default: 0,
    },
    totalNetVariance: {
      type: Number,
      default: 0,
    },
    totalDollarVariance: {
      type: Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AuditSession || mongoose.model('AuditSession', auditSessionSchema);