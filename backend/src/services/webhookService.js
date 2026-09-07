/**
 * services/webhookService.js
 *
 * HMAC-verified Shopify webhook handlers.
 * Routes must pass the raw body (Buffer) to these handlers —
 * do NOT parse through express.json() before reaching these endpoints.
 */

import crypto  from 'crypto';
import Shop    from '../models/Shop.js';
import logger  from '../utils/logger.js';
import { deactivateShop } from './shopify.js';

// ── HMAC Verification ─────────────────────────────────────────────────────────

/**
 * Verify the X-Shopify-Hmac-Sha256 header against the raw request body.
 * Uses timing-safe comparison to prevent timing attacks.
 *
 * @param {Buffer} rawBody    — raw request body (Buffer)
 * @param {string} signature  — base64 HMAC from header
 * @param {string} secret     — webhook signing secret
 * @returns {boolean}
 */
const verifyHmac = (rawBody, signature, secret) => {
  if (!rawBody || !signature || !secret) return false;
  try {
    const digest    = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');
    const sigBuf    = Buffer.from(signature, 'base64');
    const digestBuf = Buffer.from(digest,    'base64');
    if (sigBuf.length !== digestBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, digestBuf);
  } catch {
    return false;
  }
};

/**
 * Middleware-style HMAC guard.
 * Rejects the request with 401 if the HMAC is invalid.
 * Attaches `req.webhookPayload` (parsed JSON) on success.
 */
export const verifyWebhookHmac = async (req, res, next) => {
  try {
    const shopDomain = req.headers['x-shopify-shop-domain'];
    const signature  = req.headers['x-shopify-hmac-sha256'];
    const topic      = req.headers['x-shopify-topic'];

    if (!shopDomain || !signature) {
      return res.status(401).json({ error: 'Missing Shopify webhook headers' });
    }

    // Look up the per-shop webhook secret
    const shop = await Shop.findOne({ shopifyDomain: shopDomain }).select('webhookSecret isActive').lean();

    // Fall back to global secret if shop not found yet (e.g. during install flow)
    const secret = shop?.webhookSecret || process.env.SHOPIFY_API_SECRET;

    if (!secret) {
      logger.warn(`[Webhook] No secret found for shop: ${shopDomain}`);
      return res.status(401).json({ error: 'Webhook secret not configured for this shop' });
    }

    const rawBody = req.rawBody; // attached by raw body capture middleware in server.js
    if (!verifyHmac(rawBody, signature, secret)) {
      logger.warn(`[Webhook] HMAC verification failed for shop=${shopDomain} topic=${topic}`);
      return res.status(401).json({ error: 'Webhook HMAC verification failed' });
    }

    // Parse payload
    req.webhookPayload = JSON.parse(rawBody.toString('utf8'));
    req.shopDomain     = shopDomain;
    req.webhookTopic   = topic;

    logger.info(`[Webhook] Verified: topic=${topic} shop=${shopDomain}`);
    next();
  } catch (err) {
    logger.error('[Webhook] HMAC verification error', { message: err.message });
    return res.status(500).json({ error: 'Internal webhook verification error' });
  }
};

// ── Handlers ──────────────────────────────────────────────────────────────────

/**
 * Handle inventory_levels/update
 *
 * Shopify fires this when inventory is adjusted outside of StockProof.
 * We log the event so in-progress audits can optionally show a stale-baseline warning.
 */
export const handleInventoryUpdate = async (req, res) => {
  try {
    const payload    = req.webhookPayload;
    const shopDomain = req.shopDomain;

    logger.info('[Webhook] inventory_levels/update', {
      shop:            shopDomain,
      inventoryItemId: payload?.inventory_item_id,
      locationId:      payload?.location_id,
      available:       payload?.available,
      updatedAt:       payload?.updated_at,
    });

    /**
     * Optional enhancement: flag active audit sessions at this location
     * as having a stale baseline so staff can be warned.
     *
     *   const locationGid = `gid://shopify/Location/${payload.location_id}`;
     *   await AuditSession.updateMany(
     *     { locationId: locationGid, shopId: shopDomain, status: { $in: ['IN_PROGRESS', 'PAUSED'] } },
     *     { $set: { baselineStale: true } }
     *   );
     */

    return res.status(200).json({ received: true });
  } catch (err) {
    logger.error('[Webhook] handleInventoryUpdate error', { message: err.message });
    return res.status(500).json({ error: 'Internal error processing inventory update' });
  }
};

/**
 * Handle products/update
 *
 * Shopify fires this when a product or variant title/sku/barcode changes.
 * We log and can optionally invalidate cached snapshot data.
 */
export const handleProductUpdate = async (req, res) => {
  try {
    const payload    = req.webhookPayload;
    const shopDomain = req.shopDomain;

    logger.info('[Webhook] products/update', {
      shop:      shopDomain,
      productId: payload?.id,
      title:     payload?.title,
      updatedAt: payload?.updated_at,
    });

    /**
     * Optional enhancement: find active audit sessions containing
     * variants of this product and mark line items as having stale
     * display data (title/sku/barcode may have changed).
     */

    return res.status(200).json({ received: true });
  } catch (err) {
    logger.error('[Webhook] handleProductUpdate error', { message: err.message });
    return res.status(500).json({ error: 'Internal error processing product update' });
  }
};

/**
 * Handle app/uninstalled
 *
 * Shopify fires this when the merchant uninstalls StockProof.
 * MUST respond within 5 seconds — we send 200 immediately then do cleanup.
 */
export const handleAppUninstalled = async (req, res) => {
  // Respond immediately — Shopify has a strict 5-second timeout
  res.status(200).json({ received: true });

  const shopDomain = req.shopDomain;
  try {
    logger.info(`[Webhook] app/uninstalled for shop: ${shopDomain}`);
    const shop = await deactivateShop(shopDomain);
    if (shop) {
      logger.info(`[Webhook] Shop record deactivated: ${shopDomain}`);
    } else {
      logger.warn(`[Webhook] app/uninstalled: shop not found in DB: ${shopDomain}`);
    }
  } catch (err) {
    logger.error('[Webhook] handleAppUninstalled cleanup error', {
      message: err.message,
      shop:    shopDomain,
    });
  }
};

/**
 * Handle app/subscriptions/update
 *
 * Shopify fires this when a merchant cancels or changes their subscription
 * from the Shopify Admin, outside of our app.
 */
export const handleAppSubscriptionsUpdate = async (req, res) => {
  const shopDomain = req.shopDomain;
  try {
    const subscriptionData = req.webhookPayload?.app_subscription;
    if (!subscriptionData) {
      return res.status(200).json({ received: true });
    }

    logger.info(`[Webhook] app/subscriptions/update for shop: ${shopDomain}`, {
      status: subscriptionData.status,
    });

    // Check if the subscription was cancelled, declined, expired, or frozen
    if (['CANCELLED', 'DECLINED', 'EXPIRED', 'FROZEN'].includes(subscriptionData.status)) {
      await Shop.findOneAndUpdate(
        { shopifyDomain: shopDomain },
        {
          $set: {
            billingStatus: subscriptionData.status.toLowerCase(),
            isActive: false, // Revoke access since they cancelled
          }
        }
      );
      logger.info(`[Webhook] Revoked access for ${shopDomain} due to subscription status: ${subscriptionData.status}`);
    } else if (subscriptionData.status === 'ACTIVE') {
      await Shop.findOneAndUpdate(
        { shopifyDomain: shopDomain },
        {
          $set: {
            billingStatus: 'active',
            isActive: true,
          }
        }
      );
      logger.info(`[Webhook] Activated access for ${shopDomain} due to subscription status: ACTIVE`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    logger.error('[Webhook] handleAppSubscriptionsUpdate error', {
      message: err.message,
      shop:    shopDomain,
    });
    res.status(500).json({ error: 'Internal error processing subscription update' });
  }
};