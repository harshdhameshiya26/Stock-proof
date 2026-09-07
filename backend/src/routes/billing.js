/**
 * routes/billing.js
 *
 * Billing API routes.
 */

import express from 'express';
import {
  getPlans,
  createSubscription,
  handleCallback,
  getStatus,
  cancelSubscription,
} from '../controllers/billingController.js';
import { verifyShopifySession } from '../middleware/auth.js';

const router = express.Router();

// ── Public Routes (no auth required) ──────────────────────────────────────────
// Shown to merchants before they have selected a plan.
router.get('/plans', getPlans);

// The callback from Shopify after the merchant approves the charge.
// (Shopify sends shop and charge_id in query params, so we don't need bearer auth)
router.get('/callback', handleCallback);

// ── Protected Routes (require valid Shopify session) ─────────────────────────
router.use(verifyShopifySession);

router.get('/status', getStatus);
router.post('/subscribe', createSubscription);
router.delete('/cancel', cancelSubscription);

export default router;
