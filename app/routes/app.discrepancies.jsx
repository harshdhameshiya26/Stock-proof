import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { requireActivePlan } from "../utils/billing.server";
import Discrepancies from "../../src/pages/discrepancies.jsx";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  await requireActivePlan(billing);
  return null;
};

export default function DiscrepanciesPage() {
  return <Discrepancies />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
