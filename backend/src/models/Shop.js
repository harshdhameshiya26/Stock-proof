//Store access tokens & configuration

import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    shopifyDomain: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Shop || mongoose.model('Shop', shopSchema);