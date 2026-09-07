/**
 * middleware/billing.js
 *
 * Enforces that a shop has an active subscription or is within a free trial.
 * Applies to endpoints that require a paid subscription.
 */

import { AppError } from '../utils/helpers.js';
import logger from '../utils/logger.js';

/**
 * Middleware: requireActiveSubscription
 *
 * Ensures the requesting shop has a valid billing state before proceeding.
 * This expects `req.shop` to have been populated by `verifyShopifySession`.
 *
 * Allowed states:
 *   1. shop.billingStatus === 'active'
 *   2. shop.trialEndsAt is in the future
 *
 * If the shop is not subscribed, returns a 402 Payment Required
 * along with a redirectUrl to the billing page.
 */
export const requireActiveSubscription = (req, res, next) => {
  try {
    const shop = req.shop;

    if (!shop) {
      throw new AppError(
        'Server Error: requireActiveSubscription must be used after verifyShopifySession',
        500
      );
    }

    const now = new Date();
    const isTrialActive = shop.trialEndsAt && new Date(shop.trialEndsAt) > now;
    const isSubscribed = shop.billingStatus === 'active';

    if (!isSubscribed && !isTrialActive) {
      logger.warn('[Billing] Subscription required', { shop: shop.shopifyDomain });
      
      // Fallback for appUrl if not set
      const appUrl = process.env.SHOPIFY_APP_URL || process.env.APP_URL || '';
      
      return res.status(402).json({
        error: 'Payment Required',
        message: 'This feature requires an active subscription.',
        code: 'SUBSCRIPTION_REQUIRED',
        // Provide a URL where the frontend can redirect the user to pick a plan
        redirectUrl: `${appUrl}/billing`,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
