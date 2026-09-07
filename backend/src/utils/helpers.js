// Shared helpers: variance math, dollar calculations, pagination, AppError

/* ─── AppError ─────────────────────────────────────────────────────────────── */

/**
 * Operational error with an HTTP status code.
 * Throw this anywhere in the codebase; the central errorHandler will format it.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/* ─── Variance & Dollar Math ────────────────────────────────────────────────── */

/**
 * Core variance formula: actual - expected
 * Returns a signed integer (positive = surplus, negative = shortage).
 */
export const calcVariance = (actual, expected) =>
  Number(actual ?? 0) - Number(expected ?? 0);

/**
 * Dollar impact of a variance: |variance| × unit cost
 */
export const calcDollarImpact = (variance, unitCost) =>
  Math.abs(Number(variance ?? 0)) * Number(unitCost ?? 0);

/**
 * Derive the human-readable status label for a line item.
 * @returns {'matched' | 'discrepancy' | 'missing'}
 */
export const deriveLineItemStatus = (variance, actualCount) => {
  if (variance === 0)        return 'matched';
  if (actualCount === 0)     return 'missing';
  return 'discrepancy';
};

/**
 * Roll up session-level totals from an array of line items.
 * @param {Array} lineItems - Array of AuditLineItem documents
 * @returns {{ totalItemsCounted, totalNetVariance, totalDollarVariance }}
 */
export const rollUpSessionTotals = (lineItems) => {
  let totalItemsCounted  = 0;
  let totalNetVariance   = 0;
  let totalDollarVariance = 0;

  for (const item of lineItems) {
    totalItemsCounted   += Number(item.actualCount ?? 0);
    totalNetVariance    += Number(item.variance   ?? 0);
    totalDollarVariance += calcDollarImpact(item.variance, item.unitCost);
  }

  return {
    totalItemsCounted,
    totalNetVariance,
    totalDollarVariance: parseFloat(totalDollarVariance.toFixed(2)),
  };
};

/**
 * Check whether a session's variance totals exceed configured threshold rules.
 * Returns true if manager approval is required.
 */
export const exceedsThreshold = (totalDollarVariance, totalNetVariance, settings) => {
  const dollarLimit = Number(settings?.dollarLimit ?? 100);
  const itemLimit   = Number(settings?.itemLimit   ?? 10);
  return (
    Math.abs(totalDollarVariance) > dollarLimit ||
    Math.abs(totalNetVariance)    > itemLimit
  );
};

/* ─── Pagination ────────────────────────────────────────────────────────────── */

/**
 * Extract and normalize page / limit from query string.
 * @returns {{ page: number, limit: number, skip: number }}
 */
export const parsePagination = (query) => {
  const page  = Math.max(1, parseInt(query.page  ?? 1,  10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? 20, 10)));
  return { page, limit, skip: (page - 1) * limit };
};

/**
 * Build a standard paginated API response envelope.
 */
export const paginatedResponse = (data, total, page, limit) => ({
  data,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  },
});

/* ─── Shopify GID Helpers ───────────────────────────────────────────────────── */

/**
 * Extract the numeric ID from a Shopify Global ID (GID).
 * e.g. "gid://shopify/Product/12345" → "12345"
 */
export const gidToId = (gid = '') => (gid.split('/').pop() ?? gid);

/**
 * Build a Shopify GID from a type and numeric ID.
 * e.g. ("Product", "12345") → "gid://shopify/Product/12345"
 */
export const idToGid = (type, id) => `gid://shopify/${type}/${id}`;