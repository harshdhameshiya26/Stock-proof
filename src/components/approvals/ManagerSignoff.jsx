import { useState } from "react";
import { BlockStack, Modal, Text, TextField } from "@shopify/polaris";

export default function ManagerSignoff({ open, item, onClose, onConfirm, loading = false, requireOtp = false }) {
	const [otp, setOtp] = useState("");

	const close = () => {
		setOtp("");
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={close}
			title="Manager sign-off"
			primaryAction={{
				content: loading ? "Approving..." : "Approve resolution",
				onAction: () => onConfirm(otp),
				disabled: loading || (requireOtp && otp.length < 4),
			}}
			secondaryActions={[{ content: "Cancel", onAction: close, disabled: loading }]}
		>
			<Modal.Section>
				<BlockStack gap="300">
					<Text as="p">Confirm the resolution for <strong>{item?.title || "this item"}</strong>.</Text>
					<Text as="p" tone="subdued">Difference: {item?.variance ?? "-"}</Text>
					<TextField
						label="Approval OTP"
						value={otp}
						onChange={setOtp}
						type="number"
						inputMode="numeric"
						helpText="Enter the one-time code sent to the manager."
						disabled={loading}
					/>
				</BlockStack>
			</Modal.Section>
		</Modal>
	);
}