import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createApiClient } from "../services/apiClient";

const readShopContext = () => {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	return {
		shopDomain: params.get("shop") || params.get("shopDomain") || "",
		locationId: params.get("location_id") || params.get("locationId") || "",
	};
};

export default function useShop() {
	const appBridge = useAppBridge();
	const [context, setContext] = useState(readShopContext);
	const [user, setUser] = useState(null);

	useEffect(() => {
		setContext(readShopContext());
	}, []);

	const api = useMemo(
		() => createApiClient(appBridge, context.shopDomain),
		[appBridge, context.shopDomain],
	);

	const loadProfile = useCallback(async () => {
		if (!context.shopDomain) return null;
		const response = await api.get("/users/me");
		const profile = response.user || response.data || response;
		setUser(profile);
		return profile;
	}, [api, context.shopDomain]);

	return {
		...context,
		shop: context.shopDomain,
		user,
		setUser,
		api,
		loadProfile,
	};
}

export { readShopContext };