import { BlockStack, Select, Text, TextField } from "@shopify/polaris";
import AppDrawer from "../common/AppDrawer";

const defaultReasons = [
	{ label: "Damaged", value: "damaged" },
	{ label: "Missing", value: "missing" },
	{ label: "Misplaced", value: "misplaced" },
	{ label: "Count correction", value: "count_correction" },
	{ label: "Escalate to manager", value: "escalate" },
];

export default function ReasonModal({ open, item, value, note, onChange, onClose, onSave, loading = false, reasons = defaultReasons }) {
	return (
		<AppDrawer
			open={open}
			onClose={onClose}
			title="Resolve discrepancy"
			primaryAction={{ content: loading ? "Saving..." : "Save resolution", onAction: onSave, disabled: loading || !value }}
			secondaryActions={[{ content: "Cancel", onAction: onClose, disabled: loading }]}
		>
			<BlockStack gap="300">
				<Text as="p">Choose a reason for <strong>{item?.title || "the selected item"}</strong>.</Text>
				<Select label="Reason" options={reasons} value={value} onChange={(next) => onChange({ value: next, note })} />
				<TextField label="Notes" value={note} onChange={(next) => onChange({ value, note: next })} multiline={4} />
			</BlockStack>
		</AppDrawer>
	);
}