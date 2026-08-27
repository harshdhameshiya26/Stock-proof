import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import "../../src/App.jsx"

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home" prefetch="none">Dashboard</Link>
        <Link to="/app/activeAudit" prefetch="none">Notifications</Link>
        <Link to="/app/discrepancies" prefetch="none">Discrepancies</Link>
        <Link to="/app/approvals" prefetch="none">Approvals</Link>
        <Link to="/app/auditHistory" prefetch="none">Audit History</Link>
        <Link to="/app/settings" prefetch="none">Settings</Link>
        <Link to="/app/subscription" prefetch="none">Plans & Billing</Link>
      </NavMenu>

      <PolarisAppProvider i18n={translations}>
        <Frame>
          <Outlet />
        </Frame>
      </PolarisAppProvider>
    </AppProvider>
  );
}  
        
// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
