import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import AuditHistory from "../../src/pages/AuditHistory.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AuditHistoryPage() {
  return <AuditHistory />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
