import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  BillingReplacementBehavior,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

export const STARTER_PLAN    = "starter";
export const PRO_PLAN        = "pro";
export const ENTERPRISE_PLAN = "enterprise";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July26,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma, { tableName: 'tbl_Session' }),
  distribution: AppDistribution.AppStore,
  webhooks: {
    APP_SUBSCRIPTIONS_UPDATE: {
      deliveryMethod: "http",
      callbackUrl: "/webhooks",
    },
  },
  billing: {
    [STARTER_PLAN]: {
      replacementBehavior: BillingReplacementBehavior.Prorate,
      lineItems: [
        {
          amount: 29,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
    [PRO_PLAN]: {
      replacementBehavior: BillingReplacementBehavior.Prorate,
      lineItems: [
        {
          amount: 79,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
    [ENTERPRISE_PLAN]: {
      replacementBehavior: BillingReplacementBehavior.Prorate,
      lineItems: [
        {
          amount: 60,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
  },
  future: {
    expiringOfflineAccessTokens: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.July26;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
