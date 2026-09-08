import { Link } from "react-router";
import { BlockStack, Text } from "@shopify/polaris";

const links = [
	["Dashboard", "/app"],
	["Active Audit", "/app/activeAudit"],
	["Discrepancies", "/app/discrepancies"],
	["Approvals", "/app/approvals"],
	["Audit History", "/app/auditHistory"],
	["Settings", "/app/settings"],
	["Plans & Billing", "/app/subscription"],
];

export default function Navigation() {
	return (
		<nav aria-label="Main navigation">
			<BlockStack gap="200">
				{links.map(([label, href]) => <Link key={href} to={href}><Text as="span">{label}</Text></Link>)}
			</BlockStack>
		</nav>
	);
}