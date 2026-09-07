import mongoose from 'mongoose';

const pendingUserRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['STAFF', 'MANAGER', 'ADMIN'], default: 'STAFF' },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', default: null },
    otp: { type: String, required: true, select: false },
    otpExpiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'tbl_PendingUserRegistration' }
);

pendingUserRegistrationSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PendingUserRegistration ||
  mongoose.model('PendingUserRegistration', pendingUserRegistrationSchema);