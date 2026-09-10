import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { requireActivePlan } from "../utils/billing.server";
import Approvals from "../../src/pages/approvals.jsx";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  await requireActivePlan(billing);
  return null;
};

export default function ApprovalsPage() {
  return <Approvals />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
