// Note: no redirect import needed — billing redirect is handled client-side via window.top
import { authenticate, STARTER_PLAN, PRO_PLAN } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import SubscriptionPage from "../../src/pages/subscription.jsx";

/* ── Loader: check current billing status ──────────────────── */
export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);

  // Check which plan (if any) is active
  const billingCheck = await billing.check({
    plans: [STARTER_PLAN, PRO_PLAN],
    isTest: true,          // set false in production
  });

  const activePlan = billingCheck.hasActivePayment
    ? billingCheck.appSubscriptions?.[0]?.name ?? null
    : null;

  // If ?billing_approved=true is in the URL (Shopify redirected back after approval),
  // re-check is already done above — just strip the param and show updated state.
  return { activePlan, shop: session.shop };
};

/* ── Action: create a billing charge & redirect ────────────── */
export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);

  const formData = await request.formData();
  const intent   = formData.get("intent");   // "subscribe" | "cancel"
  const planId   = formData.get("planId");   // "starter" | "pro"

  // Handle Cancellation
  if (intent === "cancel") {
    try {
      const billingCheck = await billing.check({
        plans: [STARTER_PLAN, PRO_PLAN],
        isTest: true,
      });

      if (billingCheck.hasActivePayment) {
        const subscription = billingCheck.appSubscriptions[0];
        await billing.cancel({
          subscriptionId: subscription.id,
          isTest: true,
          prorate: true,
        });
      }
      return { success: true, message: "Subscription cancelled successfully." };
    } catch (error) {
      console.error("Cancellation error:", error);
      return { error: "Failed to cancel subscription.", errorData: error.message };
    }
  }

  // Handle Subscription / Upgrade / Downgrade
  const planName = planId === PRO_PLAN ? PRO_PLAN : STARTER_PLAN;

  let confirmationUrl;
  try {
    // billing.request() returns the confirmationUrl STRING directly (not an object)
    // returnUrl tells Shopify where to send the merchant after they approve/decline
    confirmationUrl = await billing.request({
      plan: planName,
      isTest: true,          // set false in production
      returnUrl: `${process.env.SHOPIFY_APP_URL}/app/subscription?billing_approved=true`,
    });
  } catch (error) {
    console.error("Shopify Billing Error:", error?.message);
    console.error("Billing userErrors:", JSON.stringify(error?.errorData ?? [], null, 2));
    return {
      error: error.message,
      errorData: error.errorData ?? null,
    };
  }

  if (!confirmationUrl) {
    return { error: "Shopify did not return a billing URL. Check your plan configuration." };
  }

  // Return the URL as JSON — the client will navigate via window.top.location.href
  // because this app runs inside a Shopify iframe and server-side redirect() only
  // navigates the iframe, not the top-level window where Shopify billing must open.
  return { confirmationUrl };
};

/* ── Default export ─────────────────────────────────────────── */
export default function Subscription() {
  return <SubscriptionPage />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

