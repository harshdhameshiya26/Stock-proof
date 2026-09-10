import { useState } from "react";
import { BlockStack, Text, TextField, Button, Banner, InlineStack } from "@shopify/polaris";
import AppDrawer from "../common/AppDrawer";
import { useApi } from "../../hooks/useApi";

export default function ManagerSignoff({ open, item, onClose, onConfirm, loading = false, requireOtp = true }) {
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [sendingOtp, setSendingOtp] = useState(false);
	const [error, setError] = useState(null);
	const { request } = useApi();

	const close = () => {
		setOtp("");
		setOtpSent(false);
		setError(null);
		onClose();
	};

	const requestOtp = async () => {
		if (!item?.auditId) return;
		setSendingOtp(true);
		setError(null);
		try {
			await request((api) => api.post(`/audits/${item.auditId}/approval-otp`, {}));
			setOtpSent(true);
		} catch (err) {
			setError(err.message || "Failed to send OTP.");
		} finally {
			setSendingOtp(false);
		}
	};

	return (
		<AppDrawer
			open={open}
			onClose={close}
			title="Manager sign-off"
			primaryAction={{
				content: loading ? "Approving..." : "Approve resolution",
				onAction: () => onConfirm(otp),
				disabled: loading || (requireOtp && otp.length < 6),
			}}
			secondaryActions={[{ content: "Cancel", onAction: close, disabled: loading }]}
		>
			<BlockStack gap="300">
				{error && (
					<Banner tone="critical" onDismiss={() => setError(null)}>
						<p>{error}</p>
					</Banner>
				)}
				{otpSent && (
					<Banner tone="success" onDismiss={() => setOtpSent(false)}>
						<p>Approval OTP has been sent to your email.</p>
					</Banner>
				)}
				<Text as="p">Confirm the resolution for <strong>{item?.title || "this item"}</strong>.</Text>
				<Text as="p" tone="subdued">Difference: {item?.variance ?? "-"}</Text>

				<InlineStack align="space-between" blockAlign="center">
					<Text as="p" variant="bodyMd" fontWeight="semibold">Approval OTP</Text>
					<Button size="micro" onClick={requestOtp} loading={sendingOtp} disabled={loading}>
						{otpSent ? "Resend OTP" : "Request OTP"}
					</Button>
				</InlineStack>

				<TextField
					value={otp}
					onChange={setOtp}
					type="number"
					inputMode="numeric"
					helpText="Enter the 6-digit one-time code sent to your email."
					disabled={loading}
					autoComplete="off"
				/>
			</BlockStack>
		</AppDrawer>
	);
}