import { useFetcher, useLoaderData, useRevalidator } from "react-router";
import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  Divider,
  Grid,
  Icon,
  DataTable,
  Banner,
  Modal,
  Toast,
  Frame,
} from "@shopify/polaris";
import {
  CheckIcon,
  XSmallIcon,
  StarIcon,
  CreditCardIcon,
  ReceiptIcon,
  RefreshIcon,
} from "@shopify/polaris-icons";
import { useState, useEffect, useCallback } from "react";

/* ─── plan data ────────────────────────────────────────────── */
const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for small stores just getting started with inventory audits.",
    badge: null,
    featured: false,
    color: "#6b7280",
    features: {
      activeAudits: "Up to 3",
      discrepancyAlerts: "Basic",
      approvalWorkflows: false,
      multiStore: false,
      customSchedules: false,
      auditHistory: "30 days",
      support: "Email",
      workspaces: "1",
      apiAccess: false,
      exportReports: false,
    },
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: "For growing teams that need full audit visibility and approval workflows.",
    badge: "Most Popular",
    featured: true,
    cta: "Upgrade to Starter",
    color: "#005bd3",
    features: {
      activeAudits: "Unlimited",
      discrepancyAlerts: "Priority",
      approvalWorkflows: true,
      multiStore: false,
      customSchedules: false,
      auditHistory: "1 year",
      support: "Priority email",
      workspaces: "Unlimited",
      apiAccess: true,
      exportReports: true,
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For operations teams managing multi-store inventory at scale.",
    badge: "Best Value",
    featured: false,
    cta: "Upgrade to Pro",
    color: "#008060",
    features: {
      activeAudits: "Unlimited",
      discrepancyAlerts: "Advanced + AI",
      approvalWorkflows: true,
      multiStore: true,
      customSchedules: true,
      auditHistory: "Unlimited",
      support: "Dedicated manager",
      workspaces: "Unlimited",
      apiAccess: true,
      exportReports: true,
    },
  },
];

const FEATURE_ROWS = [
  { key: "activeAudits",      label: "Active Audits" },
  { key: "discrepancyAlerts", label: "Discrepancy Alerts" },
  { key: "approvalWorkflows", label: "Approval Workflows" },
  { key: "multiStore",        label: "Multi-Store Reporting" },
  { key: "customSchedules",   label: "Custom Audit Schedules" },
  { key: "auditHistory",      label: "Audit History" },
  { key: "support",           label: "Support" },
  { key: "workspaces",        label: "Workspaces" },
  { key: "apiAccess",         label: "API Access" },
  { key: "exportReports",     label: "Export Reports" },
];

const BILLING_HISTORY = [
  { date: "Sep 1, 2026", description: "Free plan", amount: "$0.00", status: "Paid", tone: "success" },
  { date: "Aug 1, 2026", description: "Free plan", amount: "$0.00", status: "Paid", tone: "success" },
  { date: "Jul 1, 2026", description: "Free plan", amount: "$0.00", status: "Paid", tone: "success" },
];

/* ─── helpers ──────────────────────────────────────────────── */
function FeatureValue({ value }) {
  if (value === true)  return <Icon source={CheckIcon} tone="success" />;
  if (value === false) return <Icon source={XSmallIcon} tone="subdued" />;
  return <Text as="span" variant="bodySm">{value}</Text>;
}

/* ─── plan card ────────────────────────────────────────────── */
function PlanCard({ plan, billingPeriod, subscribeFetcher, cancelFetcher, onCancelClick }) {
  const price  = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  const saving = plan.monthlyPrice > 0 ? Math.round((1 - plan.yearlyPrice / plan.monthlyPrice) * 100) : 0;

  // Subscribe loading: subscribeFetcher is submitting for THIS plan
  const submittingPlanId = subscribeFetcher.state !== "idle"
    ? subscribeFetcher.formData?.get("planId")
    : null;
  const isSubmitting = submittingPlanId === plan.id;

  // Cancel loading
  const isCancelling =
    plan.isCurrent &&
    cancelFetcher.state !== "idle" &&
    cancelFetcher.formData?.get("intent") === "cancel";

  return (
    <div style={{
      border: plan.featured ? `2px solid ${plan.color}` : "1px solid var(--p-color-border)",
      borderRadius: "var(--p-border-radius-400)",
      background: plan.featured ? `${plan.color}08` : "var(--p-color-bg-surface)",
      boxShadow: plan.featured ? `0 8px 32px ${plan.color}22` : "var(--p-shadow-100)",
      padding: "var(--p-space-500)",
      position: "relative",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow 0.2s",
    }}>
      {plan.badge && (
        <div style={{ position: "absolute", top: -1, right: 16 }}>
          <div style={{
            background: plan.color,
            color: "#fff",
            borderRadius: "0 0 8px 8px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>{plan.badge}</div>
        </div>
      )}

      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h3" variant="headingMd" fontWeight="bold">{plan.name}</Text>
          {plan.isCurrent && <Badge tone="success">Current</Badge>}
        </InlineStack>

        <BlockStack gap="100">
          <InlineStack blockAlign="baseline" gap="150">
            <Text as="p" fontWeight="bold" variant="heading2xl">${price}</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              {plan.monthlyPrice === 0 ? "/ forever" : "/ mo"}
            </Text>
          </InlineStack>
          {billingPeriod === "yearly" && saving > 0 && (
            <Badge tone="success">Save {saving}% yearly</Badge>
          )}
        </BlockStack>

        <Text as="p" variant="bodySm" tone="subdued">{plan.description}</Text>
        <Divider />

        <BlockStack gap="300">
          {FEATURE_ROWS.slice(0, 5).map((row) => {
            const val = plan.features[row.key];
            return (
              <InlineStack key={row.key} gap="200" blockAlign="center">
                <div style={{ color: val ? plan.color : "#8c9196", flexShrink: 0 }}>
                  <Icon source={val ? CheckIcon : XSmallIcon} tone={val ? "base" : "subdued"} />
                </div>
                <Text as="span" variant="bodySm">
                  {typeof val === "string" ? `${row.label}: ${val}` : row.label}
                </Text>
              </InlineStack>
            );
          })}
        </BlockStack>

        <div style={{ marginTop: "auto", paddingTop: "var(--p-space-400)" }}>
          {plan.isCurrent && plan.id === "free" ? (
            <Button fullWidth disabled>Current plan</Button>
          ) : plan.isCurrent ? (
            <BlockStack gap="200">
              <Button fullWidth disabled>Current plan</Button>
              <Button
                fullWidth
                tone="critical"
                variant="secondary"
                onClick={() => onCancelClick(plan)}
                loading={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Subscription"}
              </Button>
            </BlockStack>
          ) : plan.id === "free" ? (
            <cancelFetcher.Form method="post">
              <input type="hidden" name="intent" value="cancel" />
              <input type="hidden" name="planId" value="free" />
              <Button fullWidth loading={isCancelling} submit tone="critical" variant="secondary">
                {isCancelling ? "Downgrading..." : "Downgrade to Free"}
              </Button>
            </cancelFetcher.Form>
          ) : (
            <subscribeFetcher.Form method="post">
              <input type="hidden" name="intent" value="subscribe" />
              <input type="hidden" name="planId" value={plan.id} />
              <Button
                variant="primary"
                fullWidth
                loading={isSubmitting}
                submit
                tone={plan.featured ? "success" : undefined}
              >
                {isSubmitting ? "Opening Shopify billing..." : plan.cta}
              </Button>
            </subscribeFetcher.Form>
          )}
        </div>
      </BlockStack>
    </div>
  );
}

/* ─── main page ────────────────────────────────────────────── */
export default function SubscriptionPage() {
  const loaderData  = useLoaderData();
  const activePlan  = loaderData?.activePlan ?? null;
  const { revalidate, state: revalidationState } = useRevalidator();

  // Two separate fetchers:
  //   subscribeFetcher — posts subscribe intent, receives {confirmationUrl} JSON,
  //                       then window.top redirects out of the iframe
  //   cancelFetcher    — posts cancel intent, receives {success} JSON
  const subscribeFetcher = useFetcher();
  const cancelFetcher    = useFetcher();

  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [activeTab, setActiveTab]         = useState("plans");
  const [cancelModal, setCancelModal]     = useState({ open: false, plan: null });
  const [toastActive, setToastActive]     = useState(false);
  const [toastMessage, setToastMessage]   = useState("");
  const [toastError, setToastError]       = useState(false);

  const showToast = useCallback((msg, isError = false) => {
    setToastMessage(msg);
    setToastError(isError);
    setToastActive(true);
  }, []);

  // When server returns { confirmationUrl }, navigate TOP window to break out of iframe
  useEffect(() => {
    if (subscribeFetcher.state === "idle" && subscribeFetcher.data) {
      const { confirmationUrl, error } = subscribeFetcher.data;
      if (confirmationUrl) {
        // Break out of Shopify's embedded-app iframe to open the billing approval page
        window.top.location.href = confirmationUrl;
      } else if (error) {
        showToast(error, true);
      }
    }
  }, [subscribeFetcher.state, subscribeFetcher.data, showToast]);

  // Handle cancel response
  useEffect(() => {
    if (cancelFetcher.state === "idle" && cancelFetcher.data) {
      if (cancelFetcher.data.success) {
        showToast(cancelFetcher.data.message || "Subscription cancelled.", false);
        setCancelModal({ open: false, plan: null });
      } else if (cancelFetcher.data.error) {
        showToast(cancelFetcher.data.error, true);
      }
    }
  }, [cancelFetcher.state, cancelFetcher.data, showToast]);

  const plans = PLANS.map((p) => ({
    ...p,
    isCurrent: activePlan ? p.id === activePlan : p.id === "free",
  }));

  const currentPlan = plans.find((p) => p.isCurrent);

  const handleCancelClick = (plan) => setCancelModal({ open: true, plan });

  const handleConfirmCancel = () => {
    const fd = new FormData();
    fd.append("intent", "cancel");
    fd.append("planId", cancelModal.plan?.id ?? "");
    cancelFetcher.submit(fd, { method: "post" });
  };

  const subscribeError = subscribeFetcher.state === "idle" && subscribeFetcher.data?.error
    ? subscribeFetcher.data.error : null;
  const subscribeErrorData = subscribeFetcher.data?.errorData ?? null;

  return (
    <Frame>
      {toastActive && (
        <Toast
          content={toastMessage}
          error={toastError}
          onDismiss={() => setToastActive(false)}
          duration={4000}
        />
      )}

      <Modal
        open={cancelModal.open}
        onClose={() => setCancelModal({ open: false, plan: null })}
        title="Cancel subscription?"
        primaryAction={{
          content: "Yes, cancel subscription",
          destructive: true,
          loading: cancelFetcher.state !== "idle",
          onAction: handleConfirmCancel,
        }}
        secondaryActions={[{
          content: "Keep my subscription",
          onAction: () => setCancelModal({ open: false, plan: null }),
        }]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Banner tone="warning">
              <Text as="p">
                You will immediately lose access to all <strong>{cancelModal.plan?.name}</strong> plan features.
                Your remaining days will be prorated.
              </Text>
            </Banner>
            <Text as="p" variant="bodySm" tone="subdued">
              You can re-subscribe anytime. Your data will not be deleted.
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>

      <Page
        title="Plans & Billing"
        subtitle="Manage your Stock-Proof subscription"
        secondaryActions={[
          { content: "Refresh", icon: RefreshIcon, onAction: revalidate, loading: revalidationState === "loading" },
          { content: "View invoices", icon: ReceiptIcon },
          { content: "Manage payment method", icon: CreditCardIcon },
        ]}
      >
        <BlockStack gap="600">

          {/* Subscribe billing error */}
          {subscribeError && (
            <Banner tone="critical" title="Billing error">
              <BlockStack gap="200">
                <Text as="p">{subscribeError}</Text>
                {subscribeErrorData && (
                  <div style={{ background: "#fff1f1", padding: 8, borderRadius: 4, overflowX: "auto" }}>
                    <pre style={{ margin: 0, fontSize: 12 }}>
                      {typeof subscribeErrorData === "string"
                        ? subscribeErrorData
                        : JSON.stringify(subscribeErrorData, null, 2)}
                    </pre>
                  </div>
                )}
              </BlockStack>
            </Banner>
          )}

          {/* Cancel error */}
          {cancelFetcher.state === "idle" && cancelFetcher.data?.error && (
            <Banner tone="critical" title="Cancellation error">
              <Text as="p">{cancelFetcher.data.error}</Text>
            </Banner>
          )}

          <Card>
            <InlineStack align="space-between" blockAlign="center" wrap={false}>
              <InlineStack gap="400" blockAlign="center">
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: currentPlan ? `${currentPlan.color}18` : "#f0faf6",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon source={StarIcon} tone="base" />
                </div>
                <BlockStack gap="100">
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="p" variant="headingMd" fontWeight="bold">
                      {currentPlan ? `${currentPlan.name} Plan` : "Free Plan"}
                    </Text>
                    <Badge tone="success">Active</Badge>
                  </InlineStack>
                  <Text as="p" variant="bodySm" tone="subdued">
                    {currentPlan?.monthlyPrice === 0
                      ? "Free plan · Upgrade anytime"
                      : `$${currentPlan?.monthlyPrice}/mo · Renews every 30 days`}
                  </Text>
                </BlockStack>
              </InlineStack>
              {currentPlan?.id === "free" ? (
                <Button variant="primary" onClick={() => setActiveTab("plans")}>Upgrade plan</Button>
              ) : (
                <InlineStack gap="200">
                  <Button onClick={() => setActiveTab("plans")}>Change plan</Button>
                  <Button tone="critical" onClick={() => handleCancelClick(currentPlan)}>Cancel</Button>
                </InlineStack>
              )}
            </InlineStack>
          </Card>

          <InlineStack gap="200">
            {[
              { id: "plans", label: "Plans" },
              { id: "comparison", label: "Feature Comparison" },
              { id: "history", label: "Billing History" },
            ].map((tab) => (
              <Button key={tab.id} variant={activeTab === tab.id ? "primary" : "secondary"}
                size="slim" onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </Button>
            ))}
          </InlineStack>

          {activeTab === "plans" && (
            <BlockStack gap="500">
              <InlineStack align="center" gap="300" blockAlign="center">
                <Text as="p" variant="bodyMd" tone={billingPeriod === "monthly" ? "base" : "subdued"}>Monthly</Text>
                <button
                  onClick={() => setBillingPeriod(b => b === "monthly" ? "yearly" : "monthly")}
                  style={{
                    width: 52, height: 28, borderRadius: 999, border: "none",
                    background: billingPeriod === "yearly" ? "#008060" : "#d1d5db",
                    cursor: "pointer", position: "relative", transition: "background 0.25s", flexShrink: 0,
                  }}
                  aria-label="Toggle billing period"
                >
                  <span style={{
                    position: "absolute", top: 3, left: billingPeriod === "yearly" ? 26 : 3,
                    width: 22, height: 22, borderRadius: "50%",
                    background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.18)", transition: "left 0.25s",
                  }} />
                </button>
                <InlineStack gap="150" blockAlign="center">
                  <Text as="p" variant="bodyMd" tone={billingPeriod === "yearly" ? "base" : "subdued"}>Yearly</Text>
                  <Badge tone="success">Save up to 20%</Badge>
                </InlineStack>
              </InlineStack>

              <Grid>
                {plans.map((plan) => (
                  <Grid.Cell key={plan.id} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                    <PlanCard
                      plan={plan}
                      billingPeriod={billingPeriod}
                      subscribeFetcher={subscribeFetcher}
                      cancelFetcher={cancelFetcher}
                      onCancelClick={handleCancelClick}
                    />
                  </Grid.Cell>
                ))}
              </Grid>

              <Card>
                <InlineStack align="space-around" wrap gap="400">
                  {[
                    { icon: "🔒", label: "Secure checkout", sub: "via Shopify Payments" },
                    { icon: "🔄", label: "Cancel anytime", sub: "No lock-in contracts" },
                    { icon: "💬", label: "7-day free trial", sub: "on paid plans" },
                    { icon: "📧", label: "Instant activation", sub: "No waiting period" },
                  ].map((item) => (
                    <BlockStack key={item.label} gap="100" inlineAlign="center">
                      <Text as="p" variant="headingLg">{item.icon}</Text>
                      <Text as="p" variant="bodySm" fontWeight="semibold" alignment="center">{item.label}</Text>
                      <Text as="p" variant="bodySm" tone="subdued" alignment="center">{item.sub}</Text>
                    </BlockStack>
                  ))}
                </InlineStack>
              </Card>
            </BlockStack>
          )}

          {activeTab === "comparison" && (
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Feature Comparison</Text>
                <Divider />
                <DataTable
                  columnContentTypes={["text", "text", "text", "text"]}
                  headings={[
                    "Feature",
                    <Text as="span" fontWeight="bold">Free</Text>,
                    <Text as="span" fontWeight="bold" tone="magic">Starter — $29/mo</Text>,
                    <Text as="span" fontWeight="bold">Pro — $79/mo</Text>,
                  ]}
                  rows={FEATURE_ROWS.map((row) => [
                    <Text as="span" variant="bodySm" fontWeight="semibold">{row.label}</Text>,
                    <FeatureValue value={PLANS[0].features[row.key]} />,
                    <FeatureValue value={PLANS[1].features[row.key]} />,
                    <FeatureValue value={PLANS[2].features[row.key]} />,
                  ])}
                />
                <InlineStack gap="300" align="center">
                  <Button variant="primary" onClick={() => setActiveTab("plans")}>View pricing plans</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          )}

          {activeTab === "history" && (
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">Billing History</Text>
                    <Button size="slim" icon={ReceiptIcon}>Download all</Button>
                  </InlineStack>
                  <Divider />
                  <DataTable
                    columnContentTypes={["text", "text", "text", "text", "text"]}
                    headings={["Date", "Description", "Amount", "Status", "Invoice"]}
                    rows={BILLING_HISTORY.map((row) => [
                      row.date, row.description, row.amount,
                      <Badge tone={row.tone}>{row.status}</Badge>,
                      <Button variant="plain" size="micro">Download PDF</Button>,
                    ])}
                    footerContent={`Showing ${BILLING_HISTORY.length} invoices`}
                  />
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">Payment Method</Text>
                    <Button size="slim">Update</Button>
                  </InlineStack>
                  <Divider />
                  <InlineStack gap="400" blockAlign="center">
                    <div style={{
                      width: 48, height: 32, borderRadius: 6, background: "#1a1a2e",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon source={CreditCardIcon} tone="base" />
                    </div>
                    <BlockStack gap="050">
                      <Text as="p" variant="bodyMd" fontWeight="semibold">Managed by Shopify Billing</Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Payment is handled securely through your Shopify account.
                      </Text>
                    </BlockStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </BlockStack>
          )}

        </BlockStack>
      </Page>
    </Frame>
  );
}
