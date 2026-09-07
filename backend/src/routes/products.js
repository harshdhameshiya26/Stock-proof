/**
 * routes/products.js
 *
 * Shopify product catalog browsing endpoints.
 * Used during audit session setup to let staff select scope.
 * All routes require a valid Shopify session.
 */

import express from 'express';
import * as productController from '../controllers/productController.js';
import { verifyShopifySession } from '../middleware/auth.js';

const router = express.Router();

// All product routes require a verified Shopify session
router.use(verifyShopifySession);

// GET /api/products/locations — List all active Shopify locations
router.get('/locations', productController.getLocations);

// GET /api/products/collections — List all Shopify collections
router.get('/collections', productController.getCollections);

// GET /api/products/vendors — List distinct vendor names
router.get('/vendors', productController.getVendors);

// GET /api/products — Paginated product listing (supports ?search=, ?cursor=)
router.get('/', productController.getProducts);

// GET /api/products/:id — Single product with all variants
router.get('/:id', productController.getProduct);

export default router;