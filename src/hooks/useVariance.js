import { useMemo } from "react";

export const calculateVariance = (actualCount, expectedCount) =>
	Number(actualCount ?? 0) - Number(expectedCount ?? 0);

export const calculateDollarImpact = (variance, unitCost) =>
	Math.abs(Number(variance ?? 0)) * Number(unitCost ?? 0);

export const getVarianceStatus = (variance, actualCount) => {
	if (actualCount === null || actualCount === undefined) return "uncounted";
	if (variance === 0) return "matched";
	if (Number(actualCount) === 0) return "missing";
	return "discrepancy";
};

export default function useVariance({ expectedCount = 0, actualCount = null, unitCost = 0 } = {}) {
	return useMemo(() => {
		const variance = actualCount === null || actualCount === undefined
			? 0
			: calculateVariance(actualCount, expectedCount);
		return {
			expectedCount: Number(expectedCount ?? 0),
			actualCount,
			variance,
			dollarImpact: actualCount === null || actualCount === undefined
				? 0
				: calculateDollarImpact(variance, unitCost),
			status: getVarianceStatus(variance, actualCount),
			isCounted: actualCount !== null && actualCount !== undefined,
			isDiscrepancy: actualCount !== null && actualCount !== undefined && variance !== 0,
		};
	}, [actualCount, expectedCount, unitCost]);
}