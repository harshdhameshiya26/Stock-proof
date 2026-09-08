export const toNumber = (value, fallback = 0) => {
	const numericValue = Number(value);
	return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const calcVariance = (actualCount, expectedCount) =>
	toNumber(actualCount) - toNumber(expectedCount);

export const calcDollarImpact = (variance, unitCost) =>
	Math.abs(toNumber(variance)) * toNumber(unitCost);

export const deriveLineItemStatus = (variance, actualCount) => {
	if (actualCount === null || actualCount === undefined) return "uncounted";
	if (toNumber(variance) === 0) return "matched";
	if (toNumber(actualCount) === 0) return "missing";
	return "discrepancy";
};

export const exceedsThreshold = (totalDollarVariance, totalNetVariance, settings = {}) => {
	if (settings.alwaysRequireApproval) return true;

	const dollarOver = Math.abs(toNumber(totalDollarVariance)) > toNumber(settings.dollarLimit);
	const itemsOver = Math.abs(toNumber(totalNetVariance)) > toNumber(settings.itemLimit);

	return settings.requireBothThresholds
		? dollarOver && itemsOver
		: dollarOver || itemsOver;
};

export const formatCurrency = (value, currency = "USD", locale = "en-US") =>
	new Intl.NumberFormat(locale, { style: "currency", currency }).format(toNumber(value));

export const formatVariance = (value) => {
	const numericValue = toNumber(value);
	return numericValue > 0 ? `+${numericValue}` : String(numericValue);
};

export const formatDate = (value, locale = "en-US") => {
	if (!value) return "-";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString(locale);
};

export const parseApiError = (error, fallback = "Something went wrong") =>
	error?.response?.data?.message || error?.message || fallback;

export const debounce = (callback, delay = 250) => {
	let timeoutId;
	const debounced = (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback(...args), delay);
	};
	debounced.cancel = () => clearTimeout(timeoutId);
	return debounced;
};