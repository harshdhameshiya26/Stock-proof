/**
 * routes/webhooks.js
 *
 * Shopify mandatory webhook endpoints.
 *
 * IMPORTANT: These routes use express.raw() to capture the raw body for
 * HMAC signature verification. They must be mounted BEFORE express.json()
 * in server.js, or the raw body will be consumed by the JSON parser.
 *
 * The raw body is stored on req.rawBody by the server-level rawBodyCapture
 * middleware, and read by verifyWebhookHmac in webhookService.js.
 */

import express from 'express';
import {
  verifyWebhookHmac,
  handleInventoryUpdate,
  handleProductUpdate,
  handleAppUninstalled,
  handleAppSubscriptionsUpdate,
} from '../services/webhookService.js';

const router = express.Router();

// All webhook routes go through HMAC verification before the handler
router.use(verifyWebhookHmac);

// POST /api/webhooks/inventory-update — inventory_levels/update
router.post('/inventory-update', handleInventoryUpdate);

// POST /api/webhooks/product-update — products/update
router.post('/product-update', handleProductUpdate);

// POST /api/webhooks/app-uninstalled — app/uninstalled
router.post('/app-uninstalled', handleAppUninstalled);

// POST /api/webhooks/app-subscriptions-update — app_subscriptions/update
router.post('/app-subscriptions-update', handleAppSubscriptionsUpdate);

export default router;