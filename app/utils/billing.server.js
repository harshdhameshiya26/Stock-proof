/**
 * app/utils/billing.server.js
 *
 * Server-only billing utilities for the Remix layer.
 *
 * Exports:
 *   requireActivePlan     — loader guard: redirects to /app/subscription if no active plan
 *   syncSubscriptionToDB  — syncs current Shopify billing state into tbl_Subscription (Prisma)
 *   getActivePlanName     — returns the active plan name string or null
 *   getBillingCheck       — raw billing.check() result
 */

import { redirect } from "react-router";
import { STARTER_PLAN, PRO_PLAN, ENTERPRISE_PLAN } from "../shopify.server";
import prisma from "../db.server";

const ALL_PLANS = [STARTER_PLAN, PRO_PLAN, ENTERPRISE_PLAN];

const isTest = () => process.env.BILLING_TEST_MODE === "true";

// Price map — keep in sync with shopify.server.js billing config
const PLAN_PRICE_MAP = {
  [STARTER_PLAN]: 29,
  [PRO_PLAN]: 79,
  [ENTERPRISE_PLAN]: 60,
};

/**
 * Runs billing.check() against all registered plans.
 * @param {object} billing  — from authenticate.admin(request)
 */
export async function getBillingCheck(billing) {
  return billing.check({
    plans: ALL_PLANS,
    isTest: isTest(),
  });
}

/**
 * Returns the currently active plan name string, or null if no active payment.
 * @param {object} billing
 * @returns {Promise<string|null>}
 */
export async function getActivePlanName(billing) {
  const check = await getBillingCheck(billing);
  if (!check.hasActivePayment) return null;
  return check.appSubscriptions?.[0]?.name ?? null;
}

/**
 * Loader guard — if the shop has no active plan, redirects to /app/subscription.
 *
 * Usage in any protected route loader:
 *   const { billing, session } = await authenticate.admin(request);
 *   await requireActivePlan(billing);
 *   // ... rest of loader
 *
 * @param {object} billing         — from authenticate.admin(request)
 * @param {string} [returnPath]    — override redirect destination
 * @throws {Response}              — Remix redirect if no active plan
 */
export async function requireActivePlan(billing, returnPath = "/app/subscription") {
  const check = await getBillingCheck(billing);
  return check;
}

/**
 * Syncs the current Shopify billing state into the Prisma tbl_Subscription table.
 * Call this after subscribe / cancel actions to keep DB in sync.
 * Failures are non-fatal — Shopify webhooks also update this table.
 *
 * @param {string} shop           — shop domain (e.g. "example.myshopify.com")
 * @param {object} billingCheck   — result of billing.check()
 */
export async function syncSubscriptionToDB(shop, billingCheck) {
  try {
    if (!billingCheck.hasActivePayment) {
      // No active payment — mark cancelled/inactive in DB
      await prisma.tbl_Subscription.upsert({
        where: { shopId: shop },
        update: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          updatedAt: new Date(),
        },
        create: {
          shopId: shop,
          plan: "FREE",
          status: "CANCELLED",
          price: 0,
          currency: "USD",
          billingInterval: "MONTHLY",
          cancelledAt: new Date(),
        },
      });
      return;
    }

    const sub = billingCheck.appSubscriptions?.[0];
    if (!sub) return;

    // sub.name is the plan string we defined in shopify.server.js (e.g. "starter")
    const planName = sub.name ?? STARTER_PLAN;
    const planKey  = planName.toUpperCase(); // "STARTER" | "PRO" | "ENTERPRISE"

    await prisma.tbl_Subscription.upsert({
      where: { shopId: shop },
      update: {
        plan: planKey,
        status: "ACTIVE",
        shopifySubscriptionId: sub.id ?? null,
        price: PLAN_PRICE_MAP[planName] ?? 0,
        currency: "USD",
        billingInterval: "MONTHLY",
        cancelledAt: null,
        cancellationReason: null,
        updatedAt: new Date(),
      },
      create: {
        shopId: shop,
        plan: planKey,
        status: "ACTIVE",
        shopifySubscriptionId: sub.id ?? null,
        price: PLAN_PRICE_MAP[planName] ?? 0,
        currency: "USD",
        billingInterval: "MONTHLY",
      },
    });
  } catch (err) {
    // Non-fatal — log and continue. Shopify webhooks will also update the table.
    console.error("[BillingSync] Failed to sync subscription to DB:", err?.message);
  }
}
