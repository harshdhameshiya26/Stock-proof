import mongoose from 'mongoose';

const auditStartRequestSchema = new mongoose.Schema(
  {
    shopId: { type: String, required: true },
    locationId: { type: String, required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    auditData: { type: mongoose.Schema.Types.Mixed, required: true },
    otp: { type: String, required: true, select: false },
    otpExpiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'tbl_AuditStartRequest' }
);

auditStartRequestSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.AuditStartRequest ||
  mongoose.model('AuditStartRequest', auditStartRequestSchema);