import { calcDollarImpact } from '../utils/helpers.js';
import { getLiveStockSnapshot as fetchSnapshot } from './shopify.js';

/**
 * Fetch a live inventory snapshot for an audit session.
 */
export const getLiveStockSnapshot = async (params) => {
  return await fetchSnapshot(params);
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