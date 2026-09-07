/**
 * controllers/productController.js
 *
 * Exposes Shopify product catalog, locations, collections, and vendors
 * for use during audit session setup (scope selection).
 *
 * Dev-mode behaviour
 * ──────────────────
 * When NODE_ENV !== 'production' AND the shop's accessToken is the
 * placeholder value ("dev_token"), every Shopify call is skipped and
 * a realistic mock dataset is returned instead.
 * This allows full frontend + audit testing WITHOUT a real Shopify store.
 */

import Shop from '../models/Shop.js';
import {
  getShopifyLocations,
  getShopifyCollections,
  getShopifyVendors,
  listProducts,
  getProductById,
} from '../services/shopify.js';
import { AppError, gidToId } from '../utils/helpers.js';
import logger from '../utils/logger.js';

// ── Dev Mock Helper ───────────────────────────────────────────────────────────

/**
 * Returns true when the requesting shop is using the placeholder dev_token.
 * In that case we skip real Shopify calls and return mock data.
 */
const isDevMode = (shop) =>
  process.env.NODE_ENV !== 'production' &&
  (!shop?.accessToken || shop.accessToken === 'dev_token');

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_LOCATIONS = [
  {
    id: 'gid://shopify/Location/1001',
    name: 'Main Warehouse',
    address1: '123 Stock Lane',
    city: 'Mumbai',
    provinceCode: 'MH',
    countryCode: 'IN',
    isActive: true,
  },
  {
    id: 'gid://shopify/Location/1002',
    name: 'Retail Store - Andheri',
    address1: '45 Market Street',
    city: 'Mumbai',
    provinceCode: 'MH',
    countryCode: 'IN',
    isActive: true,
  },
];

const MOCK_COLLECTIONS = [
  { id: 'gid://shopify/Collection/2001', title: 'T-Shirts', handle: 't-shirts', productsCount: 12 },
  { id: 'gid://shopify/Collection/2002', title: 'Electronics', handle: 'electronics', productsCount: 8 },
  { id: 'gid://shopify/Collection/2003', title: 'Accessories', handle: 'accessories', productsCount: 25 },
  { id: 'gid://shopify/Collection/2004', title: 'Footwear', handle: 'footwear', productsCount: 15 },
];

const MOCK_VENDORS = ['Nike', 'Adidas', 'Samsung', 'Apple', 'Local Brand Co.'];

const MOCK_PRODUCTS = [
  {
    id: 'gid://shopify/Product/3001',
    title: 'Classic White T-Shirt',
    handle: 'classic-white-t-shirt',
    vendor: 'Local Brand Co.',
    status: 'ACTIVE',
    imageUrl: null,
    totalVariants: 3,
    firstVariantSku: 'TSHIRT-WHT-S',
    variants: [
      { id: 'gid://shopify/ProductVariant/40001', displayName: 'Small', sku: 'TSHIRT-WHT-S', barcode: '1234567890', inventoryItem: { id: 'gid://shopify/InventoryItem/50001', unitCost: { amount: '150' } } },
      { id: 'gid://shopify/ProductVariant/40002', displayName: 'Medium', sku: 'TSHIRT-WHT-M', barcode: '1234567891', inventoryItem: { id: 'gid://shopify/InventoryItem/50002', unitCost: { amount: '150' } } },
      { id: 'gid://shopify/ProductVariant/40003', displayName: 'Large', sku: 'TSHIRT-WHT-L', barcode: '1234567892', inventoryItem: { id: 'gid://shopify/InventoryItem/50003', unitCost: { amount: '150' } } },
    ],
  },
  {
    id: 'gid://shopify/Product/3002',
    title: 'Wireless Bluetooth Headphones',
    handle: 'wireless-bluetooth-headphones',
    vendor: 'Samsung',
    status: 'ACTIVE',
    imageUrl: null,
    totalVariants: 2,
    firstVariantSku: 'HEADPH-BLK',
    variants: [
      { id: 'gid://shopify/ProductVariant/40004', displayName: 'Black', sku: 'HEADPH-BLK', barcode: '9876543210', inventoryItem: { id: 'gid://shopify/InventoryItem/50004', unitCost: { amount: '2500' } } },
      { id: 'gid://shopify/ProductVariant/40005', displayName: 'White', sku: 'HEADPH-WHT', barcode: '9876543211', inventoryItem: { id: 'gid://shopify/InventoryItem/50005', unitCost: { amount: '2500' } } },
    ],
  },
  {
    id: 'gid://shopify/Product/3003',
    title: 'Running Shoes Pro',
    handle: 'running-shoes-pro',
    vendor: 'Nike',
    status: 'ACTIVE',
    imageUrl: null,
    totalVariants: 4,
    firstVariantSku: 'SHOE-RUN-7',
    variants: [
      { id: 'gid://shopify/ProductVariant/40006', displayName: 'Size 7', sku: 'SHOE-RUN-7', barcode: '1122334455', inventoryItem: { id: 'gid://shopify/InventoryItem/50006', unitCost: { amount: '3200' } } },
      { id: 'gid://shopify/ProductVariant/40007', displayName: 'Size 8', sku: 'SHOE-RUN-8', barcode: '1122334456', inventoryItem: { id: 'gid://shopify/InventoryItem/50007', unitCost: { amount: '3200' } } },
      { id: 'gid://shopify/ProductVariant/40008', displayName: 'Size 9', sku: 'SHOE-RUN-9', barcode: '1122334457', inventoryItem: { id: 'gid://shopify/InventoryItem/50008', unitCost: { amount: '3200' } } },
      { id: 'gid://shopify/ProductVariant/40009', displayName: 'Size 10', sku: 'SHOE-RUN-10', barcode: '1122334458', inventoryItem: { id: 'gid://shopify/InventoryItem/50009', unitCost: { amount: '3200' } } },
    ],
  },
  {
    id: 'gid://shopify/Product/3004',
    title: 'Leather Wallet',
    handle: 'leather-wallet',
    vendor: 'Local Brand Co.',
    status: 'ACTIVE',
    imageUrl: null,
    totalVariants: 1,
    firstVariantSku: 'WALLET-BRN',
    variants: [
      { id: 'gid://shopify/ProductVariant/40010', displayName: 'Brown', sku: 'WALLET-BRN', barcode: '5544332211', inventoryItem: { id: 'gid://shopify/InventoryItem/50010', unitCost: { amount: '800' } } },
    ],
  },
  {
    id: 'gid://shopify/Product/3005',
    title: 'Sports Water Bottle 1L',
    handle: 'sports-water-bottle-1l',
    vendor: 'Adidas',
    status: 'ACTIVE',
    imageUrl: null,
    totalVariants: 2,
    firstVariantSku: 'BOTTLE-BLU',
    variants: [
      { id: 'gid://shopify/ProductVariant/40011', displayName: 'Blue', sku: 'BOTTLE-BLU', barcode: '6677889900', inventoryItem: { id: 'gid://shopify/InventoryItem/50011', unitCost: { amount: '400' } } },
      { id: 'gid://shopify/ProductVariant/40012', displayName: 'Red', sku: 'BOTTLE-RED', barcode: '6677889901', inventoryItem: { id: 'gid://shopify/InventoryItem/50012', unitCost: { amount: '400' } } },
    ],
  },
];

// ── Shared: Resolve Shop Document ─────────────────────────────────────────────

/**
 * Load the Shop document for the requesting store.
 * Prefers req.shop (already populated by verifyShopifySession middleware)
 * then falls back to query param lookup.
 */
const resolveShop = async (req) => {
  if (req.shop) return req.shop;

  const shopId = (req.query.shopId || req.storeDomain || '').trim().toLowerCase();
  if (!shopId) throw new AppError('shopId is required (pass as query param or x-store-domain header)', 400);

  const shop = await Shop.findOne({ shopifyDomain: shopId, isActive: true }).lean();
  if (!shop) throw new AppError(`Shop not found or inactive: ${shopId}`, 404);
  return shop;
};

// ── 1. GET /api/products/locations ────────────────────────────────────────────

/**
 * Returns all active Shopify locations for the requesting store.
 * Used to populate the "Select Location" dropdown when creating an audit.
 *
 * Headers: Authorization: Bearer <token>  |  x-store-domain: yourshop.myshopify.com
 * Query (optional): shopId=yourshop.myshopify.com
 */
export const getLocations = async (req, res, next) => {
  try {
    const shop = await resolveShop(req);

    // ── Dev mode: return mock locations ──────────────────────────────────────
    if (isDevMode(shop)) {
      logger.info('[Products/DEV] Returning mock locations');
      return res.status(200).json({
        count: MOCK_LOCATIONS.length,
        locations: MOCK_LOCATIONS,
        devMode: true,
      });
    }

    // ── Production: call Shopify ──────────────────────────────────────────────
    logger.info(`[Products] Fetching locations for shop=${shop.shopifyDomain}`);
    const locations = await getShopifyLocations(shop.shopifyDomain);

    return res.status(200).json({
      count: locations.length,
      locations,
    });
  } catch (err) {
    next(err);
  }
};

// ── 2. GET /api/products ──────────────────────────────────────────────────────

/**
 * Paginated product listing for the audit scope selector.
 * Supports cursor-based Shopify pagination and optional title/vendor/sku search.
 *
 * Query params:
 *   search  — filter by title or vendor (partial match)
 *   cursor  — Shopify endCursor for next-page navigation
 *   limit   — number of items per page (default 50, max 250)
 *   vendor  — filter by exact vendor name
 *   status  — 'ACTIVE' | 'DRAFT' | 'ARCHIVED' (default: ACTIVE)
 */
export const getProducts = async (req, res, next) => {
  try {
    const shop = await resolveShop(req);
    const { cursor, search, vendor, status } = req.query;

    // ── Dev mode: return filtered mock products ───────────────────────────────
    if (isDevMode(shop)) {
      logger.info('[Products/DEV] Returning mock products');
      let results = MOCK_PRODUCTS;

      if (search) {
        const term = search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.vendor.toLowerCase().includes(term) ||
            p.firstVariantSku?.toLowerCase().includes(term)
        );
      }
      if (vendor) {
        results = results.filter((p) => p.vendor.toLowerCase() === vendor.toLowerCase());
      }

      return res.status(200).json({
        count: results.length,
        products: results,
        pageInfo: { hasNextPage: false, endCursor: null },
        devMode: true,
      });
    }

    // ── Production: call Shopify ──────────────────────────────────────────────
    logger.info(`[Products] Listing products for shop=${shop.shopifyDomain} search="${search || ''}"`);
    const result = await listProducts(shop.shopifyDomain, { cursor, search, vendor, status });

    return res.status(200).json({
      count: result.products.length,
      products: result.products,
      pageInfo: result.pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

// ── 3. GET /api/products/:id ──────────────────────────────────────────────────

/**
 * Fetch a single product with all variants for preview / audit scope.
 *
 * :id can be:
 *   - Shopify GID:        gid://shopify/Product/12345
 *   - Numeric Shopify ID: 12345  (auto-converted to GID)
 *   - Mock ID (dev):      3001
 *
 * Query (optional): shopId=yourshop.myshopify.com
 */
export const getProduct = async (req, res, next) => {
  try {
    const shop = await resolveShop(req);
    let productId = req.params.id?.trim();

    if (!productId) throw new AppError('productId URL parameter is required', 400);

    // Auto-convert numeric ID → GID
    if (/^\d+$/.test(productId)) {
      productId = `gid://shopify/Product/${productId}`;
    }

    // ── Dev mode: find in mock data ───────────────────────────────────────────
    if (isDevMode(shop)) {
      logger.info(`[Products/DEV] Returning mock product id=${productId}`);
      const numericId = gidToId(productId);
      const mock = MOCK_PRODUCTS.find(
        (p) => p.id === productId || gidToId(p.id) === numericId
      );
      if (!mock) throw new AppError(`Product not found (dev mode): ${productId}`, 404);
      return res.status(200).json({ product: mock, devMode: true });
    }

    // ── Production: call Shopify ──────────────────────────────────────────────
    logger.info(`[Products] Fetching product id=${productId} shop=${shop.shopifyDomain}`);
    const product = await getProductById(shop.shopifyDomain, productId);
    if (!product) throw new AppError('Product not found', 404);

    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

// ── 4. GET /api/products/collections ─────────────────────────────────────────

/**
 * Returns all Shopify collections for the collection-scoped audit picker.
 *
 * Headers: Authorization: Bearer <token>  |  x-store-domain: yourshop.myshopify.com
 */
export const getCollections = async (req, res, next) => {
  try {
    const shop = await resolveShop(req);

    // ── Dev mode: return mock collections ─────────────────────────────────────
    if (isDevMode(shop)) {
      logger.info('[Products/DEV] Returning mock collections');
      return res.status(200).json({
        count: MOCK_COLLECTIONS.length,
        collections: MOCK_COLLECTIONS,
        devMode: true,
      });
    }

    // ── Production: call Shopify ──────────────────────────────────────────────
    logger.info(`[Products] Fetching collections for shop=${shop.shopifyDomain}`);
    const collections = await getShopifyCollections(shop.shopifyDomain);

    return res.status(200).json({
      count: collections.length,
      collections,
    });
  } catch (err) {
    next(err);
  }
};

// ── 5. GET /api/products/vendors ──────────────────────────────────────────────

/**
 * Returns a sorted list of distinct vendor names.
 * Used to populate the vendor-scope dropdown when creating an audit.
 *
 * Headers: Authorization: Bearer <token>  |  x-store-domain: yourshop.myshopify.com
 */
export const getVendors = async (req, res, next) => {
  try {
    const shop = await resolveShop(req);

    // ── Dev mode: return mock vendors ─────────────────────────────────────────
    if (isDevMode(shop)) {
      logger.info('[Products/DEV] Returning mock vendors');
      return res.status(200).json({
        count: MOCK_VENDORS.length,
        vendors: MOCK_VENDORS,
        devMode: true,
      });
    }

    // ── Production: call Shopify ──────────────────────────────────────────────
    logger.info(`[Products] Fetching vendors for shop=${shop.shopifyDomain}`);
    const vendors = await getShopifyVendors(shop.shopifyDomain);

    return res.status(200).json({
      count: vendors.length,
      vendors,
    });
  } catch (err) {
    next(err);
  }
};