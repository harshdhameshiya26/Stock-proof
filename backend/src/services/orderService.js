//Order retrieval logic - fetches active orders from Shopify by location

/**
 * fetchOrdersByLocation
 * TODO: Replace with real Shopify Admin API call to fetch unfulfilled orders at a location.
 */
export const fetchOrdersByLocation = async (locationId) => {
  // STUB — returns mock orders for Postman testing
  console.log(`[OrderService] Fetching active orders for location=${locationId}`);
  return [
    {
      id: "gid://shopify/Order/1001",
      name: "#1001",
      locationId,
      status: "unfulfilled",
      lineItems: [{ title: "Sample Product", quantity: 2 }],
    },
  ];
};