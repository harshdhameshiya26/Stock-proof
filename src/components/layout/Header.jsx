import { Badge, InlineStack, Text } from "@shopify/polaris";

export default function Header({ storeName = "My Shopify Store", location, status = "Connected" }) {
	return (
		<InlineStack align="space-between" blockAlign="center">
			<div>
				<Text as="h1" variant="headingLg">{storeName}</Text>
				{location && <Text as="p" tone="subdued">{location}</Text>}
			</div>
			<Badge tone={status === "Connected" ? "success" : "warning"}>{status}</Badge>
		</InlineStack>
	);
}