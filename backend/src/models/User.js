//Staff & manager accounts/permissions

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
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
    },
    role: {
      type: String,
      enum: ['STAFF', 'MANAGER', 'ADMIN'],
      default: 'STAFF',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);