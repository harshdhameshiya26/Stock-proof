import { Link, Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-react-router/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import { NavMenu } from "@shopify/app-bridge-react";
import { Frame } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { authenticate } from "../shopify.server";
import "@shopify/polaris/build/esm/styles.css";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    shopDomain: session?.shop || "",
    staffId: "",
  };
};

export default function App() {
  const { apiKey, shopDomain, staffId } = useLoaderData();

  return (
    <ShopifyAppProvider embedded apiKey={apiKey}>
        <NavMenu>
          <Link to="/app" rel="home" prefetch="none">Dashboard</Link>
        <Link to="/app/activeAudit" prefetch="none">Active Audit</Link>
        <Link to="/app/discrepancies" prefetch="none">Discrepancies</Link>
        <Link to="/app/approvals" prefetch="none">Approvals</Link>
        <Link to="/app/auditHistory" prefetch="none">Audit History</Link>
        <Link to="/app/settings" prefetch="none">Settings</Link>
          <Link to="/app/subscription" prefetch="none">Plans & Billing</Link>
        </NavMenu>

        <PolarisAppProvider i18n={translations}>
          <Frame>
            <Outlet context={{ shopDomain, staffId }} />
          </Frame>
        </PolarisAppProvider>
    </ShopifyAppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
