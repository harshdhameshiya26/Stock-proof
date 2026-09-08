import { useEffect, useState } from "react";
import { BlockStack, Button, Card, Checkbox, FormLayout, Text, TextField } from "@shopify/polaris";

const defaults = { dollarLimit: 100, itemLimit: 5, requireBothThresholds: false, alwaysRequireApproval: false, syncVarianceOnly: true };

export default function ThresholdConfig({ value = defaults, onSave, loading = false }) {
	const [form, setForm] = useState({ ...defaults, ...value });
	useEffect(() => setForm({ ...defaults, ...value }), [value]);
	const update = (key) => (next) => setForm((current) => ({ ...current, [key]: next }));

	return (
		<Card>
			<BlockStack gap="400">
				<Text as="h2" variant="headingMd">Variance approval thresholds</Text>
				<Text as="p" tone="subdued">Set the limits that decide when a discrepancy needs manager approval.</Text>
				<FormLayout.Group>
					<TextField label="Dollar variance limit" type="number" prefix="$" value={String(form.dollarLimit)} onChange={update("dollarLimit")} />
					<TextField label="Item variance limit" type="number" value={String(form.itemLimit)} onChange={update("itemLimit")} />
				</FormLayout.Group>
				<Checkbox label="Require both limits to be exceeded" checked={form.requireBothThresholds} onChange={update("requireBothThresholds")} />
				<Checkbox label="Always require manager approval" checked={form.alwaysRequireApproval} onChange={update("alwaysRequireApproval")} />
				<Checkbox label="Sync only items with variance" checked={form.syncVarianceOnly} onChange={update("syncVarianceOnly")} />
				<Button variant="primary" loading={loading} onClick={() => onSave({ ...form, dollarLimit: Number(form.dollarLimit), itemLimit: Number(form.itemLimit) })}>Save threshold rules</Button>
			</BlockStack>
		</Card>
	);
}