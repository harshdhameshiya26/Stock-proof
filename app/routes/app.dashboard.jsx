import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Dashboard from "../../src/pages/dashboard.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function DashboardPage() {
  return <Dashboard />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
