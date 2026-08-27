//Configures variance thresholds ($ & count limits) & reason tags

import Settings from "../models/Settings.js";

// Fetch Store Audit Rules
export const getSettings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    let settings = await Settings.findOne({ shopId: storeId });

    if (!settings) {
      settings = await Settings.create({
        shopId: storeId,
        dollarLimit: 100,
        itemLimit: 10,
        customReasonTags: ["damaged", "missing", "misplaced", "wrong count", "unknown"],
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// Update Variance Rules & Reason Tags
export const updateSettings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { dollarLimit, itemLimit, customReasonTags } = req.body;

    const settings = await Settings.findOneAndUpdate(
      { shopId: storeId },
      { dollarLimit, itemLimit, customReasonTags },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Settings updated successfully", settings });
  } catch (error) {
    next(error);
  }
};