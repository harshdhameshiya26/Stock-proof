import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Dashboard from "../../src/pages/dashboard.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// The default /app route now renders Dashboard directly
// This avoids redirect loops in the Shopify embedded app context
export default function Index() {
  return <Dashboard />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
