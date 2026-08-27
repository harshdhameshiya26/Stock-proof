// Request body schema validation (audit setup, line item update, settings)

// 1. Validate Audit Setup Payload
export const validateAuditSetup = (req, res, next) => {
  const { shopId, locationId, staffId } = req.body;
  const errors = [];

  if (!shopId) errors.push("Field 'shopId' is required.");
  if (!locationId) errors.push("Field 'locationId' is required.");
  if (!staffId) errors.push("Field 'staffId' is required.");

  if (errors.length > 0) {
    return res.status(400).json({ error: "Invalid Audit Setup Input", details: errors });
  }

  next();
};

// 2. Validate Line Item Update Input
export const validateLineItemUpdate = (req, res, next) => {
  const { actualCount, reasonTag } = req.body;
  const validReasonTags = ["damaged", "missing", "misplaced", "wrong count", "unknown"];

  if (actualCount !== undefined && (typeof actualCount !== "number" || actualCount < 0)) {
    return res.status(400).json({ error: "Invalid Input: 'actualCount' must be a non-negative number." });
  }

  if (reasonTag !== undefined && !validReasonTags.includes(reasonTag)) {
    return res.status(400).json({
      error: `Invalid Input: 'reasonTag' must be one of: ${validReasonTags.join(", ")}`,
    });
  }

  next();
};

// 3. Validate Settings/Threshold Rule Payload
export const validateSettingsUpdate = (req, res, next) => {
  const { dollarLimit, itemLimit, reasonTags } = req.body;
  const errors = [];

  if (dollarLimit !== undefined && (typeof dollarLimit !== "number" || dollarLimit < 0)) {
    errors.push("'dollarLimit' must be a non-negative number.");
  }
  if (itemLimit !== undefined && (typeof itemLimit !== "number" || itemLimit < 0)) {
    errors.push("'itemLimit' must be a non-negative number.");
  }
  if (reasonTags !== undefined && !Array.isArray(reasonTags)) {
    errors.push("'reasonTags' must be an array of string labels.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Invalid Settings Payload", details: errors });
  }

  next();
};