import { useAppBridge } from "@shopify/app-bridge-react";
import { useMemo } from "react";
import { createApiClient } from "./apiClient";
import { readShopContext } from "../hooks/useShop";

export const createApi = createApiClient;

export function useApiService() {
	const appBridge = useAppBridge();
	const { shopDomain } = readShopContext();
	return useMemo(
		() => createApiClient(appBridge, shopDomain),
		[appBridge, shopDomain],
	);
}

export const getAudits = (api, params = {}) => {
	const query = new URLSearchParams(params).toString();
	return api.get(`/audits${query ? `?${query}` : ""}`);
};

export const getAudit = (api, auditId) => api.get(`/audits/${encodeURIComponent(auditId)}`);

export const startAudit = (api, payload) => api.post("/audits/start", payload);

export const updateLineItem = (api, auditId, itemId, payload) =>
	api.patch(`/audits/${encodeURIComponent(auditId)}/items/${encodeURIComponent(itemId)}`, payload);

export const submitAudit = (api, auditId) => api.post(`/audits/${encodeURIComponent(auditId)}/submit`, {});

export const getSettings = (api, shopId) => api.get(`/settings/${encodeURIComponent(shopId)}`);

export const updateSettings = (api, shopId, payload) =>
	api.put(`/settings/${encodeURIComponent(shopId)}`, payload);