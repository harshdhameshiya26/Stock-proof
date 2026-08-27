//Threshold rules ($ value & item limits)

import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
      unique: true,
    },
    dollarLimit: {
      type: Number,
      default: 100.0,
      min: 0,
    },
    itemLimit: {
      type: Number,
      default: 10,
      min: 0,
    },
    customReasonTags: {
      type: [String],
      default: ['damaged', 'missing', 'misplaced', 'wrong count', 'unknown'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);