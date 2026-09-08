import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Discrepancies from "../../src/pages/discrepancies.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function DiscrepanciesPage() {
  return <Discrepancies />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
