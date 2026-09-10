// Note: no redirect import needed — billing redirect is handled client-side via window.top
import { authenticate, STARTER_PLAN, PRO_PLAN, ENTERPRISE_PLAN } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { syncSubscriptionToDB } from "../utils/billing.server";
import SubscriptionPage from "../../src/pages/subscription.jsx";

const ALL_PLANS = [STARTER_PLAN, PRO_PLAN, ENTERPRISE_PLAN];

/* ── Loader: check current billing status ──────────────────── */
export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);

  const isTest = process.env.BILLING_TEST_MODE === "true";
  const url    = new URL(request.url);

  // Detect return from Shopify billing approval page
  const billingApproved = url.searchParams.get("billing_approved") === "true";
  const billingDeclined = url.searchParams.get("billing_declined") === "true";

  // Always re-check from Shopify to get the latest status
  const billingCheck = await billing.check({
    plans: ALL_PLANS,
    isTest,
  });

  const activePlan = billingCheck.hasActivePayment
    ? billingCheck.appSubscriptions?.[0]?.name ?? null
    : null;

  // If merchant just approved, sync the state to our DB immediately
  if (billingApproved && billingCheck.hasActivePayment) {
    await syncSubscriptionToDB(session.shop, billingCheck);
  }

  // If merchant just declined or cancelled, sync cancelled state
  if (billingDeclined && !billingCheck.hasActivePayment) {
    await syncSubscriptionToDB(session.shop, billingCheck);
  }

  return {
    activePlan,
    shop: session.shop,
    billingMode: isTest ? "test" : "live",
    billingApproved,
    billingDeclined,
  };
};

/* ── Action: create a billing charge & redirect / cancel ────── */
export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const isTest = process.env.BILLING_TEST_MODE === "true";

  const formData = await request.formData();
  const intent   = formData.get("intent");   // "subscribe" | "cancel"
  const planId   = formData.get("planId");   // "starter" | "pro" | "enterprise"

  // ── Handle Cancellation ────────────────────────────────────
  if (intent === "cancel") {
    try {
      const billingCheck = await billing.check({
        plans: ALL_PLANS,
        isTest,
      });

      if (billingCheck.hasActivePayment) {
        const subscription = billingCheck.appSubscriptions[0];
        await billing.cancel({
          subscriptionId: subscription.id,
          isTest,
          prorate: true,
        });
      }

      // After cancellation, sync cancelled state to DB
      const postCancelCheck = await billing.check({
        plans: ALL_PLANS,
        isTest,
      });
      await syncSubscriptionToDB(session.shop, postCancelCheck);

      return { success: true, message: "Subscription cancelled successfully." };
    } catch (error) {
      console.error("Cancellation error:", error);
      return { error: "Failed to cancel subscription.", errorData: error.message };
    }
  }

  // ── Handle Subscribe / Upgrade / Downgrade ─────────────────
  let planName;
  if (planId === ENTERPRISE_PLAN) {
    planName = ENTERPRISE_PLAN;
  } else if (planId === PRO_PLAN) {
    planName = PRO_PLAN;
  } else {
    planName = STARTER_PLAN;
  }

  let confirmationUrl;
  try {
    // Redirect back to the embedded app in Shopify Admin
    await billing.request({
      plan: planName,
      isTest,
      returnUrl: `https://${session.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/app/subscription?billing_approved=true`,
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
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
