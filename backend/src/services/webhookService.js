//Processes Shopify webhooks in background

/**
 * handleInventoryUpdate
 * Triggered by Shopify when inventory levels change externally.
 * TODO: Implement HMAC verification and update AuditLineItem baseline counts.
 */
export const handleInventoryUpdate = async (req, res) => {
  console.log("[Webhook] inventory_levels/update received");
  // TODO: verify req HMAC signature, then process payload
  res.status(200).send("OK");
};

/**
 * handleProductUpdate
 * Triggered by Shopify when product details change.
 * TODO: Sync product title/cost changes to existing AuditLineItems.
 */
export const handleProductUpdate = async (req, res) => {
  console.log("[Webhook] products/update received");
  res.status(200).send("OK");
};

/**
 * handleAppUninstalled
 * Mandatory GDPR webhook — clean up shop data when app is uninstalled.
 */
export const handleAppUninstalled = async (req, res) => {
  console.log("[Webhook] app/uninstalled received");
  // TODO: Delete Shop record, Sessions, and optionally audit data for the store
  res.status(200).send("OK");
};