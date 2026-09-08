export const createApiClient = (appBridge, shopDomain, staffId = "") => {
  const baseURL = "http://localhost:4000/api";

  const request = async (endpoint, options = {}) => {
    let token = "";
    if (import.meta.env?.DEV) {
      // Local backend authentication deliberately uses its documented test token.
      token = "dev_token";
    } else if (appBridge) {
      token = await appBridge.idToken();
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    if (shopDomain) {
      headers["x-store-domain"] = shopDomain;
    }
    if (staffId) {
      headers["x-staff-id"] = staffId;
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
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
