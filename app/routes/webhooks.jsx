import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't available if the webhook is not authenticated.
    return new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.tbl_Session.deleteMany({ where: { shop } });
      }
      break;

    case "APP_SUBSCRIPTIONS_UPDATE":
      // This is triggered whenever a subscription is created, updated, or cancelled
      if (payload?.app_subscription) {
        const sub = payload.app_subscription;
        
        // Ensure tbl_Subscription exists or updates it
        await db.tbl_Subscription.upsert({
          where: { shopId: shop },
          update: {
            plan: sub.name,
            status: sub.status,
            shopifySubscriptionId: sub.admin_graphql_api_id,
            price: parseFloat(sub.line_items?.[0]?.price?.amount || "0"),
            currency: sub.line_items?.[0]?.price?.currency_code || "USD",
            billingInterval: sub.line_items?.[0]?.interval || "MONTHLY",
            updatedAt: new Date(),
          },
          create: {
            shopId: shop,
            plan: sub.name,
            status: sub.status,
            shopifySubscriptionId: sub.admin_graphql_api_id,
            price: parseFloat(sub.line_items?.[0]?.price?.amount || "0"),
            currency: sub.line_items?.[0]?.price?.currency_code || "USD",
            billingInterval: sub.line_items?.[0]?.interval || "MONTHLY",
          },
        });
      }
      break;

    default:
      console.log(`Unhandled webhook topic: ${topic}`);
      break;
  }

  return new Response("Webhook handled", { status: 200 });
};
