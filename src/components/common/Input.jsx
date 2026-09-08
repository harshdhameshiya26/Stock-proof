import { TextField } from "@shopify/polaris";

export default function Input({ value, onChange, type = "text", ...props }) {
	return (
		<TextField
			value={value ?? ""}
			onChange={onChange}
			type={type}
			autoComplete="off"
			{...props}
		/>
	);
}