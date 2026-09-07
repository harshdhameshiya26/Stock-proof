/**
 * services/shopify.js
 *
 * Shopify Admin API abstraction layer.
 * Uses the 2024-10 GraphQL Admin API (native fetch — Node 18+).
 *
 * All public functions accept a `shop` document (from tbl_Shop).
 * Implements exponential-backoff retry for 429 / 500-class errors.
 */

import Shop  from '../models/Shop.js';
import logger from '../utils/logger.js';
import { AppError, gidToId } from '../utils/helpers.js';

// ── Constants ─────────────────────────────────────────────────────────────────

const API_VERSION      = process.env.SHOPIFY_API_VERSION || '2024-10';
const MAX_RETRIES      = 3;
const BASE_RETRY_MS    = 500;   // doubles each attempt
const GRAPHQL_PAGE_SIZE = 50;

// ── HTTP Client ───────────────────────────────────────────────────────────────

/**
 * Execute a Shopify Admin GraphQL request with retry logic.
 *
 * @param {string} shopDomain   — e.g. "my-store.myshopify.com"
 * @param {string} accessToken  — Shopify access token
 * @param {string} query        — GraphQL query or mutation string
 * @param {Object} variables    — GraphQL variables
 * @returns {Object}            — `data` field from the GraphQL response
 */
const shopifyGraphQL = async (shopDomain, accessToken, query, variables = {}) => {
  const url = `https://${shopDomain}/admin/api/${API_VERSION}/graphql.json`;
  const headers = {
    'Content-Type':         'application/json',
    'X-Shopify-Access-Token': accessToken,
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    // Rate limit — back off and retry
    if (response.status === 429) {
      const retryAfterMs = (parseFloat(response.headers.get('Retry-After') ?? '1')) * 1000;
      const waitMs = Math.max(retryAfterMs, BASE_RETRY_MS * 2 ** (attempt - 1));
      logger.warn(`[Shopify] Rate limited (429). Retrying in ${waitMs}ms (attempt ${attempt}/${MAX_RETRIES})`);
      if (attempt === MAX_RETRIES) throw new AppError('Shopify API rate limit exceeded. Please retry later.', 429);
      await sleep(waitMs);
      continue;
    }

    if (!response.ok) {
      const body = await response.text();
      logger.error(`[Shopify] HTTP ${response.status}`, { url, body });
      throw new AppError(`Shopify API error: HTTP ${response.status}`, 502);
    }

    const json = await response.json();

    // GraphQL user errors
    if (json.errors) {
      logger.error('[Shopify] GraphQL errors', { errors: json.errors });
      throw new AppError(`Shopify GraphQL error: ${json.errors[0]?.message ?? 'Unknown error'}`, 502);
    }

    return json.data;
  }
};

/**
 * Execute a Shopify Admin REST request.
 */
const shopifyREST = async (shopDomain, accessToken, path, method = 'GET', body = null) => {
  const url = `https://${shopDomain}/admin/api/${API_VERSION}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type':         'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    logger.error(`[Shopify REST] ${method} ${path} → ${response.status}`, { text });
    throw new AppError(`Shopify REST API error: HTTP ${response.status}`, 502);
  }
  return response.json();
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Shop Lookup Utility ───────────────────────────────────────────────────────

/**
 * Load a shop by shopId (domain string) and validate it is active.
 * @throws AppError if not found or inactive
 */
const getShop = async (shopId) => {
  const shop = await Shop.findOne({ shopifyDomain: shopId, isActive: true }).lean();
  if (!shop) throw new AppError(`Shop not found or inactive: ${shopId}`, 404);
  return shop;
};

// ── GraphQL Fragments ─────────────────────────────────────────────────────────

const VARIANT_INVENTORY_FIELDS = `
  id
  sku
  barcode
  displayName
  inventoryItem {
    id
    unitCost { amount }
  }
  image { url }
`;

// ── Products & Inventory Snapshot ─────────────────────────────────────────────

/**
 * Fetch all products at a Shopify location and return a flat list of variant
 * inventory levels ready to seed AuditLineItem documents.
 *
 * Supports scoping by: location (default), collection, vendor, product.
 *
 * @param {Object} options
 * @param {string} options.shopId         — shop domain
 * @param {string} options.locationId     — Shopify GID of the location
 * @param {string} [options.scopeType]    — 'all'|'location'|'collection'|'vendor'|'product'
 * @param {string} [options.collectionId] — required if scopeType='collection'
 * @param {string} [options.vendor]       — required if scopeType='vendor'
 * @param {string} [options.productId]    — required if scopeType='product'
 *
 * @returns {Array<{
 *   shopifyProductId, shopifyVariantId, shopifyInventoryItemId,
 *   title, sku, barcode, imageUrl, unitCost, quantity
 * }>}
 */
export const getLiveStockSnapshot = async ({
  shopId,
  locationId,
  scopeType   = 'location',
  collectionId,
  vendor,
  productId,
  accessToken
}) => {
  const shop    = await getShop(shopId);
  if (accessToken) shop.accessToken = accessToken;
  let products  = [];

  if (scopeType === 'product' && productId) {
    products = await fetchProductById(shop, productId);
  } else if (scopeType === 'collection' && collectionId) {
    products = await fetchProductsByCollection(shop, collectionId);
  } else if (scopeType === 'vendor' && vendor) {
    products = await fetchProductsByVendor(shop, vendor);
  } else {
    // 'all' or 'location' — fetch full catalog (paginated)
    products = await fetchAllProducts(shop);
  }

  // For each variant, fetch the inventory level at the requested location
  return buildInventorySnapshot(shop, locationId, products);
};

/**
 * Fetch a single product by GID.
 */
const fetchProductById = async (shop, productId) => {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        vendor
        variants(first: 100) {
          edges {
            node { ${VARIANT_INVENTORY_FIELDS} }
          }
        }
      }
    }
  `;
  const data = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query, { id: productId });
  return data?.product ? [data.product] : [];
};

/**
 * Fetch all products within a collection (paginated).
 */
const fetchProductsByCollection = async (shop, collectionId) => {
  const query = `
    query CollectionProducts($id: ID!, $cursor: String) {
      collection(id: $id) {
        products(first: ${GRAPHQL_PAGE_SIZE}, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id title vendor
              variants(first: 100) { edges { node { ${VARIANT_INVENTORY_FIELDS} } } }
            }
          }
        }
      }
    }
  `;
  return paginateProducts(shop, query, 'collection.products', { id: collectionId });
};

/**
 * Fetch all products from a specific vendor (paginated).
 */
const fetchProductsByVendor = async (shop, vendor) => {
  const query = `
    query VendorProducts($query: String!, $cursor: String) {
      products(first: ${GRAPHQL_PAGE_SIZE}, query: $query, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id title vendor
            variants(first: 100) { edges { node { ${VARIANT_INVENTORY_FIELDS} } } }
          }
        }
      }
    }
  `;
  return paginateProducts(shop, query, 'products', { query: `vendor:'${vendor}'` });
};

/**
 * Fetch entire product catalog (paginated).
 */
const fetchAllProducts = async (shop) => {
  const query = `
    query AllProducts($cursor: String) {
      products(first: ${GRAPHQL_PAGE_SIZE}, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id title vendor
            variants(first: 100) { edges { node { ${VARIANT_INVENTORY_FIELDS} } } }
          }
        }
      }
    }
  `;
  return paginateProducts(shop, query, 'products');
};

/**
 * Generic paginator for product list queries.
 * Follows `pageInfo.hasNextPage / endCursor` pattern.
 */
const paginateProducts = async (shop, query, dataPath, baseVariables = {}) => {
  const products = [];
  let cursor     = null;

  do {
    const variables = { ...baseVariables, cursor };
    const data      = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query, variables);
    const node      = dataPath.split('.').reduce((acc, key) => acc?.[key], data);
    if (!node) break;

    node.edges.forEach(({ node: p }) => products.push(p));
    cursor = node.pageInfo.hasNextPage ? node.pageInfo.endCursor : null;
  } while (cursor);

  return products;
};

/**
 * Given a flat list of Shopify products, fetch inventory levels at the
 * given location and assemble the final snapshot array.
 *
 * Uses the inventoryLevels query batched by inventoryItemId.
 */
const buildInventorySnapshot = async (shop, locationId, products) => {
  // Flatten to variants
  const variants = [];
  for (const product of products) {
    for (const { node: variant } of product.variants?.edges ?? []) {
      variants.push({ product, variant });
    }
  }
  if (!variants.length) return [];

  // Batch inventory level lookups in groups of 50
  const inventoryItemIds = variants.map(({ variant }) => variant.inventoryItem?.id).filter(Boolean);
  const levelMap         = await fetchInventoryLevels(shop, locationId, inventoryItemIds);

  return variants.map(({ product, variant }) => {
    const inventoryItemId = variant.inventoryItem?.id;
    const quantity        = levelMap[inventoryItemId] ?? 0;
    const unitCost        = parseFloat(variant.inventoryItem?.unitCost?.amount ?? 0);

    return {
      shopifyProductId:       product.id,
      shopifyVariantId:       variant.id,
      shopifyInventoryItemId: inventoryItemId,
      title:    `${product.title} — ${variant.displayName}`,
      sku:      variant.sku    || null,
      barcode:  variant.barcode || null,
      imageUrl: variant.image?.url || null,
      unitCost,
      quantity,
    };
  });
};

/**
 * Fetch inventory levels for a batch of inventoryItemIds at a location.
 * Returns a map: { inventoryItemId → availableQuantity }
 */
const fetchInventoryLevels = async (shop, locationId, inventoryItemIds) => {
  const levelMap = {};
  const BATCH    = 50;

  for (let i = 0; i < inventoryItemIds.length; i += BATCH) {
    const batch = inventoryItemIds.slice(i, i + BATCH);
    const query = `
      query InventoryLevels($locationId: ID!) {
        inventoryItems(first: ${BATCH}, query: "id:${batch.map(gidToId).join(' OR id:')}") {
          edges {
            node {
              id
              inventoryLevel(locationId: $locationId) {
                quantities(names: ["available"]) {
                  name
                  quantity
                }
              }
            }
          }
        }
      }
    `;
    const data = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query, { locationId });
    for (const { node: item } of data?.inventoryItems?.edges ?? []) {
      const qty = item.inventoryLevel?.quantities?.find((q) => q.name === 'available')?.quantity ?? 0;
      levelMap[item.id] = qty;
    }
  }

  return levelMap;
};

// ── Locations ─────────────────────────────────────────────────────────────────

/**
 * Fetch all active Shopify locations for a shop.
 * @returns {Array<{ id, name, address1, city, provinceCode, countryCode, isActive }>}
 */
export const getShopifyLocations = async (shopId) => {
  const shop  = await getShop(shopId);
  const query = `
    query GetLocations {
      locations(first: 50, includeInactive: false) {
        edges {
          node {
            id name isActive
            address {
              address1 city provinceCode countryCode
            }
          }
        }
      }
    }
  `;
  const data = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query);
  return (data?.locations?.edges ?? []).map(({ node }) => ({
    id:           node.id,
    name:         node.name,
    address1:     node.address?.address1,
    city:         node.address?.city,
    provinceCode: node.address?.provinceCode,
    countryCode:  node.address?.countryCode,
    isActive:     node.isActive,
  }));
};

// ── Collections ───────────────────────────────────────────────────────────────

/**
 * Fetch custom collections (paginated, up to 250).
 */
export const getShopifyCollections = async (shopId) => {
  const shop  = await getShop(shopId);
  const query = `
    query GetCollections($cursor: String) {
      collections(first: 50, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id title handle productsCount { count }
          }
        }
      }
    }
  `;
  const collections = [];
  let cursor = null;

  do {
    const data = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query, { cursor });
    const conn = data?.collections;
    if (!conn) break;
    conn.edges.forEach(({ node }) => collections.push({
      id:            node.id,
      title:         node.title,
      handle:        node.handle,
      productsCount: node.productsCount?.count ?? 0,
    }));
    cursor = conn.pageInfo.hasNextPage ? conn.pageInfo.endCursor : null;
  } while (cursor);

  return collections;
};

// ── Vendors ───────────────────────────────────────────────────────────────────

/**
 * Fetch distinct vendor names from the Shopify catalog.
 */
export const getShopifyVendors = async (shopId) => {
  const shop = await getShop(shopId);
  // REST endpoint is more efficient for aggregated vendor list
  const data = await shopifyREST(shop.shopifyDomain, shop.accessToken, '/products.json?fields=vendor&limit=250');
  const vendors = [...new Set((data?.products ?? []).map((p) => p.vendor).filter(Boolean))].sort();
  return vendors;
};

// ── Inventory Adjustments ─────────────────────────────────────────────────────

/**
 * Push inventory adjustments to Shopify using the inventorySetQuantities mutation
 * (Shopify 2024-04+). Sets the "available" quantity to the counted actualCount.
 *
 * Only pushes line items where variance !== 0 (unless settings.syncVarianceOnly = false).
 *
 * @param {string}  shopId      — shop domain
 * @param {string}  locationId  — Shopify location GID
 * @param {Array}   lineItems   — AuditLineItem documents
 * @param {Object}  settings    — Settings document (for shopifyAdjustmentReason)
 * @returns {{ success: boolean, adjustedCount: number, errors: string[] }}
 */
export const pushInventoryAdjustments = async (shopId, locationId, lineItems, settings) => {
  const shop   = await getShop(shopId);
  const errors = [];

  // Filter items to sync
  const syncVarianceOnly = settings?.syncVarianceOnly !== false; // default true
  const itemsToSync = lineItems.filter((item) => {
    if (item.actualCount === null || item.actualCount === undefined) return false;
    if (syncVarianceOnly && item.variance === 0) return false;
    return !!item.shopifyInventoryItemId;
  });

  if (!itemsToSync.length) {
    logger.info(`[Shopify] No inventory adjustments needed for shop=${shopId}`);
    return { success: true, adjustedCount: 0, errors: [] };
  }

  const reason  = settings?.shopifyAdjustmentReason || 'cycle_count_available';
  const BATCH   = 10; // Shopify recommends ≤ 10 quantities per mutation call
  let adjusted  = 0;

  for (let i = 0; i < itemsToSync.length; i += BATCH) {
    const batch = itemsToSync.slice(i, i + BATCH);

    const quantities = batch.map((item) => ({
      inventoryItemId: item.shopifyInventoryItemId,
      locationId,
      quantity: item.actualCount,
    }));

    const mutation = `
      mutation SetInventory($input: InventorySetQuantitiesInput!) {
        inventorySetQuantities(input: $input) {
          inventoryAdjustmentGroup {
            id
            changes {
              name
              delta
              quantityAfterChange
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;

    const variables = {
      input: {
        name:       'available',
        reason,
        quantities,
      },
    };

    try {
      const data   = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, mutation, variables);
      const result = data?.inventorySetQuantities;

      if (result?.userErrors?.length) {
        const msgs = result.userErrors.map((e) => `[${e.field}] ${e.message}`);
        errors.push(...msgs);
        logger.warn('[Shopify] inventorySetQuantities userErrors', { msgs });
      } else {
        adjusted += batch.length;
        logger.info(`[Shopify] Synced ${batch.length} inventory adjustments (batch ${Math.ceil((i + 1) / BATCH)})`);
      }
    } catch (err) {
      logger.error('[Shopify] inventorySetQuantities failed', { message: err.message, batch: i });
      errors.push(err.message);
    }
  }

  return {
    success:       errors.length === 0,
    adjustedCount: adjusted,
    errors,
  };
};

// ── Shopify Session / OAuth Helpers ───────────────────────────────────────────

/**
 * Upsert a Shop document from Shopify OAuth callback data.
 * Called by your OAuth flow (outside this file) after token exchange.
 */
export const upsertShopFromOAuth = async ({ shopDomain, accessToken, shopData = {} }) => {
  const shop = await Shop.findOneAndUpdate(
    { shopifyDomain: shopDomain },
    {
      accessToken,
      isActive:      true,
      uninstalledAt: null,
      installedAt:   new Date(),
      name:          shopData.name       ?? undefined,
      email:         shopData.email      ?? undefined,
      currency:      shopData.currency   ?? undefined,
      timezone:      shopData.timezone   ?? undefined,
      shopifyPlan:   shopData.plan_name  ?? undefined,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return shop;
};

/**
 * Deactivate a shop (called when app/uninstalled webhook fires).
 */
export const deactivateShop = async (shopDomain) => {
  const shop = await Shop.findOneAndUpdate(
    { shopifyDomain: shopDomain },
    { isActive: false, accessToken: '', uninstalledAt: new Date() },
    { new: true }
  );
  if (shop) logger.info(`[Shopify] Shop deactivated: ${shopDomain}`);
  return shop;
};

/**
 * Fetch a product by GID — used by product controller.
 */
export const getProductById = async (shopId, productId) => {
  const shop  = await getShop(shopId);
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id title handle vendor status
        images(first: 1) { edges { node { url } } }
        variants(first: 100) {
          edges {
            node {
              id displayName sku barcode
              inventoryItem { id unitCost { amount } }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, query, { id: productId });
  return data?.product ?? null;
};

/**
 * List products with pagination — used by product browsing controller.
 *
 * Shopify GraphQL product query supports these filter fields:
 *   title, vendor, product_type, status, tag, gift_card, published_status
 * NOTE: `sku` is a VARIANT-level field and cannot be used here.
 *
 * @param {string}  shopId
 * @param {Object}  options  — { cursor, search, vendor, status, limit }
 */
export const listProducts = async (shopId, { cursor = null, search = null, vendor = null, status = null, limit = null } = {}) => {
  const shop      = await getShop(shopId);
  const pageSize  = Math.min(250, Math.max(1, parseInt(limit ?? GRAPHQL_PAGE_SIZE, 10)));

  // Build Shopify filter query string
  // Only title is supported for partial search at product level
  const filters = [];
  if (search)  filters.push(`title:*${search}*`);
  if (vendor)  filters.push(`vendor:${vendor}`);
  if (status)  filters.push(`status:${status.toUpperCase()}`);
  const queryString = filters.length > 0 ? filters.join(' AND ') : null;

  const gqlQuery = `
    query ListProducts($cursor: String, $query: String) {
      products(first: ${pageSize}, after: $cursor, query: $query) {
        pageInfo { hasNextPage endCursor hasPreviousPage startCursor }
        edges {
          node {
            id title handle vendor status
            images(first: 1) { edges { node { url altText } } }
            variants(first: 1) { edges { node { id sku barcode } } }
            totalVariants
          }
        }
      }
    }
  `;

  const data     = await shopifyGraphQL(shop.shopifyDomain, shop.accessToken, gqlQuery, { cursor, query: queryString });
  const conn     = data?.products;
  const products = (conn?.edges ?? []).map(({ node }) => ({
    id:              node.id,
    title:           node.title,
    handle:          node.handle,
    vendor:          node.vendor,
    status:          node.status,
    imageUrl:        node.images?.edges?.[0]?.node?.url    ?? null,
    imageAlt:        node.images?.edges?.[0]?.node?.altText ?? null,
    totalVariants:   node.totalVariants,
    firstVariantSku: node.variants?.edges?.[0]?.node?.sku     ?? null,
    firstVariantBarcode: node.variants?.edges?.[0]?.node?.barcode ?? null,
  }));

  return {
    products,
    pageInfo: conn?.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
};