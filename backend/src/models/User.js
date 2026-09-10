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
    status: {
      type: String,
      enum: ['INVITED', 'ACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
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
    activationOtp: {
      type: String,
      default: null,
      select: false,
    },
    activationOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    loginOtp: {
      type: String,
      default: null,
      select: false,
    },
    loginOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    deleteOtp: {
      type: String,
      default: null,
      select: false,
    },
    deleteOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    passwordResetOtp: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    roleChangeOtp: {
      type: String,
      default: null,
      select: false,
    },
    roleChangeOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    activatedAt: {
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