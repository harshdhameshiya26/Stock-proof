import { Badge as PolarisBadge } from "@shopify/polaris";

const statusTones = {
	matched: "success",
	discrepancy: "warning",
	missing: "critical",
	uncounted: "subdued",
	pending: "warning",
	approved: "success",
	rejected: "critical",
	completed: "success",
	cancelled: "critical",
	paused: "attention",
	"in progress": "attention",
};

const getVarianceTone = (variance) => {
	const numericVariance = Number(variance);
	if (!Number.isFinite(numericVariance) || numericVariance === 0) return "subdued";
	return numericVariance > 0 ? "success" : "critical";
};

export default function StatusBadge({ status, variance, children, tone, progress }) {
	const normalizedStatus = String(status || "").toLowerCase();
	const resolvedTone = tone || statusTones[normalizedStatus] || getVarianceTone(variance);
	const label = children ?? (variance !== undefined
		? `${Number(variance) > 0 ? "+" : ""}${variance}`
		: status || "Unknown");

	return (
		<PolarisBadge tone={resolvedTone} progress={progress}>
			{label}
		</PolarisBadge>
	);
}

export { getVarianceTone, statusTones };