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
      // Fires when a subscription is created, updated, cancelled, frozen, or expired.
      // This is the authoritative source of truth for billing state changes that happen
      // OUTSIDE of our app (e.g. merchant cancels from Shopify billing settings).
      if (payload?.app_subscription) {
        const sub = payload.app_subscription;

        // Normalize the Shopify plan name to our enum key
        const rawName   = (sub.name || "").toLowerCase().trim();
        const planKey   = rawName === "enterprise"
          ? "ENTERPRISE"
          : rawName === "pro"
          ? "PRO"
          : rawName === "starter"
          ? "STARTER"
          : "STARTER";

        // Map Shopify status (UPPERCASE from webhook) to our DB status
        const rawStatus  = (sub.status || "").toUpperCase();
        const statusMap  = {
          ACTIVE:    "ACTIVE",
          PENDING:   "PENDING",
          ACCEPTED:  "ACTIVE",    // accepted = approved by merchant, treat as active
          DECLINED:  "DECLINED",
          EXPIRED:   "CANCELLED", // expired approval window → treat same as cancelled
          FROZEN:    "SUSPENDED",
          CANCELLED: "CANCELLED",
        };
        const dbStatus = statusMap[rawStatus] ?? "CANCELLED";

        const price    = parseFloat(sub.line_items?.[0]?.price?.amount ?? "0");
        const currency = sub.line_items?.[0]?.price?.currency_code ?? "USD";
        const interval = sub.line_items?.[0]?.interval ?? "MONTHLY";

        const isCancelled = ["CANCELLED", "DECLINED", "EXPIRED", "FROZEN"].includes(rawStatus);

        await db.tbl_Subscription.upsert({
          where:  { shopId: shop },
          update: {
            plan:                    planKey,
            status:                  dbStatus,
            shopifySubscriptionId:   sub.admin_graphql_api_id ?? null,
            price,
            currency,
            billingInterval:         interval,
            cancelledAt:             isCancelled ? new Date() : null,
            cancellationReason:      isCancelled ? `Shopify webhook: ${rawStatus}` : null,
            updatedAt:               new Date(),
          },
          create: {
            shopId:                  shop,
            plan:                    planKey,
            status:                  dbStatus,
            shopifySubscriptionId:   sub.admin_graphql_api_id ?? null,
            price,
            currency,
            billingInterval:         interval,
            cancelledAt:             isCancelled ? new Date() : null,
            cancellationReason:      isCancelled ? `Shopify webhook: ${rawStatus}` : null,
          },
        });

        console.log(`[Webhook] APP_SUBSCRIPTIONS_UPDATE: shop=${shop} plan=${planKey} status=${dbStatus}`);
      }
      break;

    default:
      console.log(`Unhandled webhook topic: ${topic}`);
      break;
  }

  return new Response("Webhook handled", { status: 200 });
};
