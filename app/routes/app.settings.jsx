import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Settings from "../../src/pages/Settings.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function SettingsPage() {
  return <Settings />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
