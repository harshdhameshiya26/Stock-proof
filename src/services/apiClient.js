export const createApiClient = (appBridge, shopDomain, staffId = "", authenticatedFetch = null) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
  const requestTimeoutMs = 35_000;

  const request = async (endpoint, options = {}) => {
    const fetcher = authenticatedFetch || (async (url, fetchOptions = {}) => {
      let token = "";
      try {
        token = import.meta.env?.DEV
          ? "dev_token"
          : appBridge
            ? await appBridge.idToken()
            : "";
      } catch {
        throw new Error("Session authentication failed. Please reopen the Shopify app and try again.");
      }
      return fetch(url, {
        ...fetchOptions,
        headers: {
          Authorization: `Bearer ${token}`,
          ...fetchOptions.headers,
        },
      });
    });

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (shopDomain) {
      headers["x-store-domain"] = shopDomain;
    }
    if (staffId) {
      headers["x-staff-id"] = staffId;
    }

    let response;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
      try {
        response = await fetcher(`${baseURL}${endpoint}`, {
          ...options,
          headers,
          signal: controller.signal,
        });
        if (![502, 503, 504].includes(response.status) || attempt === 2) break;
      } catch (error) {
        if (attempt === 2) {
          if (error.name === "AbortError") {
            throw new Error("Network error: The request timed out. Please check server connectivity and try again.");
          }
          throw new Error("Network error: Please check server connectivity and try again.");
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        const isGatewayError = response.status === 502 || response.status === 503 || response.status === 504;
        errorData = {
          message: isGatewayError
            ? "Network error: Please check server connectivity and try again."
            : errorText,
        };
      }
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  };

  return {
    get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options) =>
      request(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
    put: (endpoint, body, options) =>
      request(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
    patch: (endpoint, body, options) =>
      request(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
  };
};
