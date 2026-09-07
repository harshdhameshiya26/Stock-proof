/**
 * controllers/productController.js
 *
 * Exposes Shopify product catalog, locations, collections, and vendors
 * for use during audit session setup (scope selection).
 */

import {
  getShopifyLocations,
  getShopifyCollections,
  getShopifyVendors,
  listProducts,
  getProductById,
} from '../services/shopify.js';
import { AppError } from '../utils/helpers.js';

// ── Locations ──────────────────────────────────────────────────────────────────

/**
 * GET /api/products/locations
 *
 * Returns all active Shopify locations for the requesting store.
 * Used to populate the "Select Location" dropdown when creating an audit.
 */
export const getLocations = async (req, res, next) => {
  try {
    const shopId = req.query.shopId || req.storeDomain;
    if (!shopId) throw new AppError('shopId is required', 400);

    const locations = await getShopifyLocations(shopId);
    return res.status(200).json({ count: locations.length, locations });
  } catch (err) {
    next(err);
  }
};

// ── Products ───────────────────────────────────────────────────────────────────

/**
 * GET /api/products
 *
 * Paginated product listing for the audit scope selector.
 * Supports cursor-based Shopify pagination and optional title/SKU search.
 *
 * Query params:
 *   shopId   — shop domain (or inferred from session)
 *   cursor   — Shopify page cursor for next page
 *   search   — search term (title or SKU)
 */
export const getProducts = async (req, res, next) => {
  try {
    const shopId  = req.query.shopId || req.storeDomain;
    const { cursor, search } = req.query;

    if (!shopId) throw new AppError('shopId is required', 400);

    const result = await listProducts(shopId, { cursor, search });

    return res.status(200).json({
      count:    result.products.length,
      products: result.products,
      pageInfo: result.pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/products/:id
 *
 * Fetch a single product with all variants for preview.
 * Uses Shopify GID format: gid://shopify/Product/123456
 */
export const getProduct = async (req, res, next) => {
  try {
    const shopId    = req.query.shopId || req.storeDomain;
    const productId = req.params.id;

    if (!shopId)    throw new AppError('shopId is required', 400);
    if (!productId) throw new AppError('productId is required', 400);

    const product = await getProductById(shopId, productId);
    if (!product) throw new AppError('Product not found', 404);

    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

// ── Collections ────────────────────────────────────────────────────────────────

/**
 * GET /api/products/collections
 *
 * Returns all Shopify collections for the collection-scoped audit picker.
 */
export const getCollections = async (req, res, next) => {
  try {
    const shopId = req.query.shopId || req.storeDomain;
    if (!shopId) throw new AppError('shopId is required', 400);

    const collections = await getShopifyCollections(shopId);
    return res.status(200).json({ count: collections.length, collections });
  } catch (err) {
    next(err);
  }
};

// ── Vendors ────────────────────────────────────────────────────────────────────

/**
 * GET /api/products/vendors
 *
 * Returns a sorted list of distinct vendor names.
 * Used to populate the vendor-scope dropdown.
 */
export const getVendors = async (req, res, next) => {
  try {
    const shopId = req.query.shopId || req.storeDomain;
    if (!shopId) throw new AppError('shopId is required', 400);

    const vendors = await getShopifyVendors(shopId);
    return res.status(200).json({ count: vendors.length, vendors });
  } catch (err) {
    next(err);
  }
};