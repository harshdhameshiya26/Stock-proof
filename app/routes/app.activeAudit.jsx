import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import ActiveAudit from "../../src/pages/activeAudit.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function ActiveAuditPage() {
  return <ActiveAudit />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
