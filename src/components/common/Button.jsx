import { Button as PolarisButton } from "@shopify/polaris";

export default function ActionButton({ children, onClick, loading = false, ...props }) {
	return (
		<PolarisButton onClick={onClick} loading={loading} {...props}>
			{children}
		</PolarisButton>
	);
}