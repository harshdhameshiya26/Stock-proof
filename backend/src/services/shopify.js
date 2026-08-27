// Low-level Shopify GraphQL/REST API integration & Inventory Sync

/**
 * getLiveStockSnapshot
 * Returns a baseline inventory snapshot for an audit session.
 * TODO: Replace with real Shopify Admin REST/GraphQL call using shopId's accessToken.
 */
export const getLiveStockSnapshot = async ({ shopId, locationId, collectionId }) => {
  // STUB — returns mock data for testing
  console.log(`[Shopify] Fetching live stock snapshot for shop=${shopId} location=${locationId}`);
  return [
    {
      productId: "gid://shopify/Product/1",
      variantId: "gid://shopify/ProductVariant/1",
      title: "Sample Product - Default",
      unitCost: 10.00,
      quantity: 50,
    },
  ];
};

/**
 * pushInventoryAdjustments
 * Syncs actualCount variances back to Shopify inventory levels.
 * TODO: Replace with real Shopify inventoryAdjustItem mutation.
 */
export const pushInventoryAdjustments = async (shopId, locationId, lineItems) => {
  // STUB — logs what would be synced
  console.log(`[Shopify] Pushing ${lineItems.length} inventory adjustments for shop=${shopId} location=${locationId}`);
  for (const item of lineItems) {
    if (item.variance !== 0) {
      console.log(`  → ${item.title}: variance ${item.variance > 0 ? '+' : ''}${item.variance}`);
    }
  }
  return { success: true };
};