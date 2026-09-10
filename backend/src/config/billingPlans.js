/**
 * config/billingPlans.js
 *
 * Shopify Billing plan definitions for Stock-proof.
 * Each key matches the `billingPlan` field on the Shop model.
 *
 * IMPORTANT: Prices here must match the Remix shopify.server.js billing config
 * (the Remix layer is the canonical billing path; these are used by the
 * legacy Express REST path and for display purposes).
 */

export const PLANS = {
  starter: {
    /** Plan key — must match Shop.billingPlan enum */
    key: 'starter',
    /** Display name shown to merchants (must match Remix STARTER_PLAN value) */
    name: 'Starter',
    /** Monthly price in USD — must match shopify.server.js lineItems amount */
    price: 29,
    /** Free trial length in days (0 = no trial) */
    trialDays: 7,
    /** Short description shown on the pricing page */
    description: 'For growing teams that need full audit visibility and approval workflows.',
    /** Feature bullet points */
    features: [
      'Unlimited audit sessions',
      'Approval workflows',
      '1 year audit history',
      'Priority email support',
      'API access & CSV/PDF export',
    ],
  },
  pro: {
    key: 'pro',
    name: 'Pro',
    price: 79,
    trialDays: 7,
    description: 'For operations teams managing multi-store inventory at scale.',
    features: [
      'Everything in Starter',
      'Multi-store reporting',
      'Custom audit schedules',
      'Unlimited audit history',
      'Dedicated account manager',
      'Advanced analytics & AI alerts',
      'Webhook integrations',
    ],
  },
  enterprise: {
    key: 'enterprise',
    name: 'Enterprise',
    price: 60,
    trialDays: 7,
    description: 'Custom deployments with dedicated support and SLA guarantees.',
    features: [
      'Everything in Pro',
      '24/7 SLA support',
      'Custom integrations',
      'Dedicated infrastructure',
      'SSO / SAML',
    ],
  },
};

/**
 * Returns the plan object for the given key, or throws if not found.
 * @param {string} planKey
 * @returns {object}
 */
export const getPlan = (planKey) => {
  const plan = PLANS[planKey];
  if (!plan) {
    const valid = Object.keys(PLANS).join(', ');
    throw new Error(`Invalid plan key: '${planKey}'. Must be one of: ${valid}`);
  }
  return plan;
};

/** All plan keys as an array (useful for validation). */
export const PLAN_KEYS = Object.keys(PLANS);
