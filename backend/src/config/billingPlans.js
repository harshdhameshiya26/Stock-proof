/**
 * config/billingPlans.js
 *
 * Shopify Billing plan definitions for Stock-proof.
 * Each key matches the `billingPlan` field on the Shop model.
 *
 * Prices are in USD. trialDays controls the Shopify free-trial period.
 * The `test` flag is set automatically by the controller based on NODE_ENV.
 */

export const PLANS = {
  starter: {
    /** Plan key — must match Shop.billingPlan enum */
    key: 'starter',
    /** Display name shown to merchants */
    name: 'Starter',
    /** Monthly price in USD */
    price: 9.99,
    /** Free trial length in days (0 = no trial) */
    trialDays: 7,
    /** Short description shown on the pricing page */
    description: 'Perfect for small stores running regular stock counts.',
    /** Feature bullet points */
    features: [
      'Up to 500 SKUs per audit session',
      'Unlimited audit sessions',
      'Manager approval workflow',
      'CSV & PDF export',
      'Email notifications',
    ],
  },
  pro: {
    key: 'pro',
    name: 'Pro',
    price: 29.99,
    trialDays: 7,
    description: 'For high-volume stores that need advanced inventory control.',
    features: [
      'Unlimited SKUs per audit session',
      'Unlimited audit sessions',
      'Manager approval workflow',
      'Priority support',
      'Advanced analytics & reports',
      'Multi-location support',
      'CSV, PDF & XLSX export',
      'Webhook integrations',
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
