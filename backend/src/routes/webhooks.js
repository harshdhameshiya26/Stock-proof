//Shopify mandatory webhooks (inventory updates, app uninstall)
import express from 'express';
import * as webhookController from '../services/webhookService.js';

const router = express.Router();

// Use raw middleware for Shopify HMAC signature verification
router.post('/inventory-update', express.raw({ type: 'application/json' }), webhookController.handleInventoryUpdate);
router.post('/product-update', express.raw({ type: 'application/json' }), webhookController.handleProductUpdate);
router.post('/app-uninstalled', express.raw({ type: 'application/json' }), webhookController.handleAppUninstalled);

export default router;