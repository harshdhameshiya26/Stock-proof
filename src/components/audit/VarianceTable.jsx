import { Badge, DataTable, Text } from "@shopify/polaris";

export default function VarianceTable({ items = [], onSelect }) {
	const rows = items.map((item) => {
		const variance = Number(item.variance ?? ((item.actualCount ?? 0) - (item.expectedCount ?? 0)));
		const tone = variance < 0 ? "critical" : variance > 0 ? "success" : "subdued";
		return [
			<Text key={`${item._id}-title`} as="span" fontWeight="semibold">{item.title || item.productTitle || "Untitled item"}</Text>,
			item.sku || "-",
			item.expectedCount ?? 0,
			item.actualCount ?? "-",
			<Text key={`${item._id}-variance`} tone={tone} fontWeight="semibold">{variance > 0 ? `+${variance}` : variance}</Text>,
			<Badge key={`${item._id}-status`} tone={item.status === "matched" ? "success" : item.status === "missing" ? "critical" : "warning"}>{item.status || "uncounted"}</Badge>,
			onSelect ? <button key={`${item._id}-action`} type="button" onClick={() => onSelect(item)}>Review</button> : "-",
		];
	});

	return <DataTable columnContentTypes={["text", "text", "numeric", "numeric", "numeric", "text", "text"]} headings={["Product", "SKU", "Expected", "Actual", "Variance", "Status", "Action"]} rows={rows} />;
}