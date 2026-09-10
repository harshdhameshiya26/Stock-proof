import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export function useAuthenticatedFetch() {
  const appBridge = useAppBridge();

  return useCallback(async (url, options = {}) => {
    let token = "";
    if (import.meta.env?.DEV) {
      token = "dev_token";
    } else if (appBridge) {
      token = await appBridge.idToken();
    }

    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }, [appBridge]);
}
