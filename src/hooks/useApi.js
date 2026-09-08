import { useCallback, useMemo, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useOutletContext } from "react-router";
import { createApiClient } from "../services/apiClient";

export function useApi() {
	const appBridge = useAppBridge();
	const routeContext = useOutletContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const urlShopDomain = useMemo(() => {
		if (typeof window === "undefined") return null;
		const params = new URLSearchParams(window.location.search);
		return {
			shop: params.get("shop"),
			staffId: params.get("staffId") || params.get("staff_id"),
		};
	}, []);
	const shopDomain = routeContext?.shopDomain || urlShopDomain?.shop;
	const staffId = routeContext?.staffId || urlShopDomain?.staffId || "";

	const api = useMemo(
		() => createApiClient(appBridge, shopDomain, staffId),
		[appBridge, shopDomain, staffId],
	);

	const request = useCallback(
		async (operation) => {
			setLoading(true);
			setError(null);

			try {
				return await operation(api);
			} catch (requestError) {
				const message = requestError instanceof Error
					? requestError.message
					: "Something went wrong";
				setError(message);
				throw requestError;
			} finally {
				setLoading(false);
			}
		},
		[api],
	);

	return { request, loading, error, shopDomain };
}