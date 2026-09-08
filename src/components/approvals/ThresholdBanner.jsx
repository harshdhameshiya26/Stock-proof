import { Banner, Text } from "@shopify/polaris";

export default function ThresholdBanner({ count = 0, tone = "warning", title, children }) {
	if (!count) return null;
	return (
		<Banner tone={tone} title={title || `${count} discrepancies require attention`}>
			{children || <Text as="p">Review these items before submitting the audit.</Text>}
		</Banner>
	);
}