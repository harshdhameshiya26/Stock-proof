// Staff and manager accounts / generic authentication users

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    jwtToken: {
      type: String,
      default: null,
      select: false,
    },
    otp: {
      type: String,
      default: null,
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['STAFF', 'MANAGER', 'ADMIN'],
      default: 'STAFF',
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    lastLogoutAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'tbl_User',
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);