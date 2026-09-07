/**
 * controllers/billingController.js
 *
 * Shopify Billing API — Recurring Application Charges (REST)
 *
 * Flow:
 *   1. Merchant calls POST /api/billing/subscribe  → get confirmationUrl
 *   2. Redirect merchant to confirmationUrl         → merchant approves on Shopify
 *   3. Shopify redirects to GET /api/billing/callback?charge_id=XXX&shop=YYY
 *   4. We verify the charge status and activate the shop
 *
 * Shopify docs:
 *   https://shopify.dev/docs/api/admin-rest/latest/resources/recurringapplicationcharge
 */

import Shop        from '../models/Shop.js';
import { PLANS, getPlan, PLAN_KEYS } from '../config/billingPlans.js';
import { AppError }                  from '../utils/helpers.js';
import logger                        from '../utils/logger.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build the Shopify Admin REST base URL for the given shop domain.
 * Uses the api version stored on the Shop document, or a safe default.
 */
const shopifyAdminUrl = (shopDomain, apiVersion = '2024-10') =>
  `https://${shopDomain}/admin/api/${apiVersion}`;

/**
 * In development/test environments, pass test:true to Shopify so charges
 * can be approved without real billing. Auto-disabled in production.
 */
const isTestMode = () => process.env.NODE_ENV !== 'development';

/**
 * Returns the app's public base URL used to build the redirect/callback URL.
 * Falls back to SHOPIFY_APP_URL env var.
 */
const appBaseUrl = () =>
  process.env.SHOPIFY_APP_URL || process.env.APP_URL || 'https://example.com';


// ── 1. GET /api/billing/plans ─────────────────────────────────────────────────

/**
 * Returns all available billing plans.
 * No authentication required — this is shown to merchants before sign-up.
 *
 * Response:
 *   { plans: [ { key, name, price, trialDays, features, description } ] }
 */
export const getPlans = (req, res) => {
  const plans = Object.values(PLANS).map(({ key, name, price, trialDays, description, features }) => ({
    key,
    name,
    price,
    trialDays,
    description,
    features,
  }));

  return res.status(200).json({
    testMode: isTestMode(),
    plans,
  });
};


// ── 2. POST /api/billing/subscribe ───────────────────────────────────────────

/**
 * Creates a Shopify Recurring Application Charge and returns the confirmation URL.
 * The merchant must be redirected to this URL to approve billing.
 *
 * Headers required:
 *   Authorization: Bearer <token>
 *   x-store-domain: yourshop.myshopify.com
 *
 * Body:
 *   { planKey: "starter" | "pro" }
 *
 * Response:
 *   { confirmationUrl, chargeId, plan }
 */
export const createSubscription = async (req, res, next) => {
  try {
    const { planKey } = req.body;

    // Validate planKey
    if (!planKey || !PLAN_KEYS.includes(planKey)) {
      throw new AppError(
        `'planKey' is required and must be one of: ${PLAN_KEYS.join(', ')}`,
        400
      );
    }

    // req.shop is set by verifyShopifySession middleware
    const shop = await Shop.findOne({ shopifyDomain: req.storeDomain });
    if (!shop) throw new AppError('Shop not found', 404);

    const plan      = getPlan(planKey);
    const returnUrl = `${appBaseUrl()}/api/billing/callback?shop=${shop.shopifyDomain}`;

    // ── Call Shopify REST API to create the charge ─────────────────────────
    const shopifyUrl = `${shopifyAdminUrl(shop.shopifyDomain, shop.apiVersion)}/recurring_application_charges.json`;

    let shopifyResponse;
    try {
      const resp = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': shop.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recurring_application_charge: {
            name:       plan.name,
            price:      plan.price,
            trial_days: plan.trialDays,
            return_url: returnUrl,
            test:       isTestMode(),
          },
        }),
      });
      
      const responseBody = await resp.json();
      if (!resp.ok) {
         throw new Error(JSON.stringify(responseBody.errors || responseBody));
      }
      shopifyResponse = { data: responseBody };
    } catch (shopifyErr) {
      const msg =
        shopifyErr.message ||
        'Shopify billing API request failed';
      logger.error('[Billing] Shopify charge creation failed', { error: msg, shop: shop.shopifyDomain });
      throw new AppError(`Shopify billing error: ${JSON.stringify(msg)}`, 502);
    }

    const charge = shopifyResponse.data.recurring_application_charge;

    // ── Persist pending charge on the shop ────────────────────────────────
    shop.billingPlan   = planKey;
    shop.billingStatus = 'pending';
    shop.chargeId      = String(charge.id);

    // Calculate trial end date if the plan has a trial
    if (plan.trialDays > 0) {
      shop.trialEndsAt = new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000);
    }

    await shop.save();

    logger.info('[Billing] Charge created', {
      shop:      shop.shopifyDomain,
      chargeId:  charge.id,
      plan:      planKey,
      testMode:  isTestMode(),
    });

    return res.status(201).json({
      message:         'Subscription charge created. Redirect merchant to confirmationUrl.',
      chargeId:        charge.id,
      confirmationUrl: charge.confirmation_url,
      plan: {
        key:       plan.key,
        name:      plan.name,
        price:     plan.price,
        trialDays: plan.trialDays,
      },
      testMode: isTestMode(),
    });
  } catch (err) {
    next(err);
  }
};


// ── 3. GET /api/billing/callback ─────────────────────────────────────────────

/**
 * Shopify redirects the merchant here after they approve/decline billing.
 * We fetch the charge from Shopify to verify its status and activate the shop.
 *
 * Query params:
 *   charge_id — the Shopify charge ID
 *   shop      — shop domain (e.g. yourshop.myshopify.com)
 *
 * Response:
 *   { status, message, billingStatus }
 */
export const handleCallback = async (req, res, next) => {
  try {
    const { charge_id, shop: shopDomain } = req.query;

    if (!charge_id || !shopDomain) {
      throw new AppError('Missing required query params: charge_id, shop', 400);
    }

    const shop = await Shop.findOne({ shopifyDomain: shopDomain.toLowerCase().trim() });
    if (!shop) throw new AppError(`Shop not found: ${shopDomain}`, 404);

    // ── Verify charge status with Shopify ─────────────────────────────────
    const shopifyUrl = `${shopifyAdminUrl(shop.shopifyDomain, shop.apiVersion)}/recurring_application_charges/${charge_id}.json`;

    let charge;
    try {
      const resp = await fetch(shopifyUrl, {
        method: 'GET',
        headers: { 'X-Shopify-Access-Token': shop.accessToken },
      });
      const responseBody = await resp.json();
      if (!resp.ok) {
         throw new Error(JSON.stringify(responseBody.errors || responseBody));
      }
      charge = responseBody.recurring_application_charge;
    } catch (shopifyErr) {
      const msg = shopifyErr.message;
      logger.error('[Billing] Shopify charge verification failed', { error: msg });
      throw new AppError(`Shopify charge verification failed: ${JSON.stringify(msg)}`, 502);
    }

    // Shopify charge statuses: pending | accepted | active | declined | expired | frozen | cancelled
    const shopifyStatus = charge.status;

    // Map Shopify status → our DB status
    const statusMap = {
      accepted: 'active',  // accepted = merchant approved, activate now
      active:   'active',
      declined: 'declined',
      expired:  'expired',
      frozen:   'frozen',
      cancelled:'cancelled',
      pending:  'pending',
    };

    const newStatus = statusMap[shopifyStatus] || shopifyStatus;

    // Update shop billing status
    shop.billingStatus = newStatus;
    shop.chargeId      = String(charge_id);

    // If accepted/active, also activate the shop
    if (newStatus === 'active') {
      shop.isActive = true;
      // Set trial end from Shopify's trial_ends_on if available
      if (charge.trial_ends_on) {
        shop.trialEndsAt = new Date(charge.trial_ends_on);
      }
    }

    await shop.save();

    logger.info('[Billing] Charge callback processed', {
      shop:          shop.shopifyDomain,
      chargeId:      charge_id,
      shopifyStatus: shopifyStatus,
      newStatus,
    });

    const messages = {
      active:    'Subscription activated successfully! The app is now fully enabled.',
      declined:  'Merchant declined the subscription charge.',
      expired:   'Confirmation link expired. Please subscribe again.',
      frozen:    'Subscription frozen due to payment failure.',
      cancelled: 'Subscription was cancelled.',
      pending:   'Charge is still pending merchant approval.',
    };

    const httpStatus = newStatus === 'active' ? 200 : (newStatus === 'declined' ? 402 : 200);

    return res.status(httpStatus).json({
      status:        newStatus === 'active' ? 'success' : 'info',
      message:       messages[newStatus] || `Charge status: ${newStatus}`,
      billingStatus: newStatus,
      shop:          shop.shopifyDomain,
      chargeId:      charge_id,
    });
  } catch (err) {
    next(err);
  }
};


// ── 4. GET /api/billing/status ───────────────────────────────────────────────

/**
 * Returns the current subscription status for the requesting shop.
 *
 * Headers required:
 *   Authorization: Bearer <token>
 *   x-store-domain: yourshop.myshopify.com
 *
 * Response:
 *   { billingStatus, billingPlan, chargeId, trialEndsAt, isSubscribed, plan }
 */
export const getStatus = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ shopifyDomain: req.storeDomain })
      .select('shopifyDomain billingPlan billingStatus chargeId trialEndsAt isActive')
      .lean();

    if (!shop) throw new AppError('Shop not found', 404);

    const isTrialActive =
      shop.billingStatus === 'active' &&
      shop.trialEndsAt  &&
      new Date(shop.trialEndsAt) > new Date();

    const isSubscribed = shop.billingStatus === 'active';

    // Attach plan details if subscribed
    const planDetails = shop.billingPlan ? PLANS[shop.billingPlan] || null : null;

    return res.status(200).json({
      shop:          shop.shopifyDomain,
      billingStatus: shop.billingStatus,
      billingPlan:   shop.billingPlan,
      chargeId:      shop.chargeId,
      trialEndsAt:   shop.trialEndsAt,
      isTrialActive,
      isSubscribed,
      plan:          planDetails
        ? { key: planDetails.key, name: planDetails.name, price: planDetails.price }
        : null,
    });
  } catch (err) {
    next(err);
  }
};


// ── 5. DELETE /api/billing/cancel ────────────────────────────────────────────

/**
 * Cancels (deletes) the active recurring charge on Shopify.
 * The shop's billing status is set to 'cancelled'.
 *
 * Headers required:
 *   Authorization: Bearer <token>
 *   x-store-domain: yourshop.myshopify.com
 *
 * Response:
 *   { message, billingStatus }
 */
export const cancelSubscription = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ shopifyDomain: req.storeDomain });
    if (!shop) throw new AppError('Shop not found', 404);

    if (!shop.chargeId) {
      throw new AppError('No active subscription charge found for this shop', 400);
    }

    if (shop.billingStatus === 'cancelled') {
      return res.status(200).json({
        message:       'Subscription is already cancelled.',
        billingStatus: 'cancelled',
      });
    }

    // ── Cancel the charge on Shopify ──────────────────────────────────────
    const shopifyUrl = `${shopifyAdminUrl(shop.shopifyDomain, shop.apiVersion)}/recurring_application_charges/${shop.chargeId}.json`;

    try {
      const resp = await fetch(shopifyUrl, {
        method: 'DELETE',
        headers: { 'X-Shopify-Access-Token': shop.accessToken },
      });
      
      if (!resp.ok && resp.status !== 404) {
          const responseBody = await resp.json().catch(() => ({}));
          throw new Error(JSON.stringify(responseBody.errors || responseBody));
      }
    } catch (shopifyErr) {
      const msg = shopifyErr.message;
      logger.error('[Billing] Shopify charge cancellation failed', { error: msg });
      throw new AppError(`Shopify cancellation failed: ${JSON.stringify(msg)}`, 502);
    }

    // Update our DB
    shop.billingStatus = 'cancelled';
    await shop.save();

    logger.info('[Billing] Subscription cancelled', {
      shop:     shop.shopifyDomain,
      chargeId: shop.chargeId,
    });

    return res.status(200).json({
      message:       'Subscription cancelled successfully.',
      billingStatus: 'cancelled',
      shop:          shop.shopifyDomain,
    });
  } catch (err) {
    next(err);
  }
};
