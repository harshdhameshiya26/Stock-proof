import { authenticate, STARTER_PLAN, PRO_PLAN } from "../shopify.server";
import db from "../db.server";

/**
 * Checks if the user has an active premium subscription.
 * Call this in loaders/actions of routes that require a paid plan.
 * 
 * @param {Request} request - The Remix request object
 * @param {boolean} requiresPro - If true, requires the PRO plan specifically.
 * @returns {Promise<{ hasActivePlan: boolean, plan: string | null }>}
 */
export async function requireActivePlan(request, requiresPro = false) {
  const { session, billing } = await authenticate.admin(request);
  const shop = session.shop;

  // Check local database first for speed
  try {
    const localSub = await db.tbl_Subscription.findFirst({
      where: { shopId: shop, status: "ACTIVE" },
    });

    if (localSub) {
      if (requiresPro && localSub.plan !== PRO_PLAN) {
        return { hasActivePlan: false, plan: localSub.plan };
      }
      return { hasActivePlan: true, plan: localSub.plan };
    }
  } catch (err) {
    // tbl_Subscription may not exist yet; fall through to API
  }

  // Fallback to Shopify API (e.g. if webhooks haven't fired yet)
  try {
    const plansToCheck = requiresPro ? [PRO_PLAN] : [STARTER_PLAN, PRO_PLAN];
    const billingCheck = await billing.check({
      plans: plansToCheck,
      isTest: true,
    });

    if (billingCheck.hasActivePayment) {
      const planName = billingCheck.appSubscriptions[0].name;
      return { hasActivePlan: true, plan: planName };
    }
  } catch (err) {
    console.error("Error falling back to Shopify API for billing check:", err);
  }

  return { hasActivePlan: false, plan: null };
}
