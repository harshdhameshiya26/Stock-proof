import { useState } from "react";
import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  ProgressBar,
  Divider,
  Banner,
  Grid,
  Box,
  Icon,
} from "@shopify/polaris";
import {
  ClipboardIcon,
  AlertTriangleIcon,
  ClockIcon,
  PackageIcon,
  RefreshIcon,
} from "@shopify/polaris-icons";

/* ─── static data ──────────────────────────────────────────── */
const statsData = [
  {
    label: "Active Audits",
    value: "3",
    tone: "success",
    sub: "2 pending approval",
    badge: "In Progress",
    icon: ClipboardIcon,
    iconColor: "#008060",
    bg: "#f0faf6",
  },
  {
    label: "Discrepancies Found",
    value: "12",
    tone: "critical",
    sub: "5 unresolved",
    badge: "Unresolved",
    icon: AlertTriangleIcon,
    iconColor: "#d72c0d",
    bg: "#fff4f4",
  },
  {
    label: "Pending Approvals",
    value: "7",
    tone: "warning",
    sub: "Oldest: 3 days ago",
    badge: "Pending",
    icon: ClockIcon,
    iconColor: "#b98900",
    bg: "#fffbe6",
  },
  {
    label: "Products Scanned",
    value: "1,482",
    tone: "info",
    sub: "Last 30 days",
    badge: "This Month",
    icon: PackageIcon,
    iconColor: "#005bd3",
    bg: "#f0f5ff",
  },
];

const activeAudits = [
  { name: "Warehouse A – Full Audit", status: "In Progress", progress: 68, started: "Sep 5, 2026", assignee: "John D." },
  { name: "Store #12 – Cycle Count", status: "Pending", progress: 0, started: "Sep 7, 2026", assignee: "Sarah M." },
  { name: "Backroom – Spot Check", status: "In Progress", progress: 42, started: "Sep 6, 2026", assignee: "Raj P." },
];

const recentActivity = [
  { item: "SKU-1023 — Blue Hoodie", event: "Discrepancy", statusTone: "critical", status: "Unresolved", date: "Sep 7" },
  { item: "SKU-0881 — Running Shoes", event: "Approval", statusTone: "success", status: "Approved", date: "Sep 6" },
  { item: "SKU-2211 — Canvas Tote", event: "Discrepancy", statusTone: "warning", status: "In Review", date: "Sep 6" },
  { item: "SKU-0034 — Denim Jacket", event: "Count Updated", statusTone: "info", status: "Saved", date: "Sep 5" },
];

/* ─── helpers ──────────────────────────────────────────────── */
function auditStatusTone(status) {
  if (status === "In Progress") return "attention";
  if (status === "Pending") return "warning";
  if (status === "Completed") return "success";
  return "info";
}

/* ─── stat card ────────────────────────────────────────────── */
function StatCard({ stat }) {
  return (
    <Card padding="500">
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="start">
          <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">
            {stat.label}
          </Text>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: stat.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon source={stat.icon} tone="base" />
          </div>
        </InlineStack>

        <Text as="p" variant="heading2xl" fontWeight="bold">
          {stat.value}
        </Text>

        <InlineStack gap="200" blockAlign="center">
          <Badge tone={stat.tone}>{stat.badge}</Badge>
          <Text as="span" variant="bodySm" tone="subdued">
            {stat.sub}
          </Text>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

/* ─── audit row ────────────────────────────────────────────── */
function AuditRow({ audit }) {
  return (
    <Box paddingBlock="400">
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="p" variant="bodyMd" fontWeight="semibold">
            {audit.name}
          </Text>
          <InlineStack gap="200" blockAlign="center">
            <Badge tone={auditStatusTone(audit.status)}>{audit.status}</Badge>
            <Text as="p" variant="bodySm" tone="subdued">
              {audit.assignee}
            </Text>
          </InlineStack>
        </InlineStack>

        <InlineStack align="space-between" blockAlign="center" gap="400">
          <Box minWidth="55%">
            <ProgressBar
              progress={audit.progress}
              size="small"
              tone={audit.progress > 50 ? "success" : "primary"}
            />
          </Box>
          <InlineStack gap="300" blockAlign="center">
            <Text as="p" variant="bodySm" tone="subdued">
              {audit.progress}% done
            </Text>
            <Text as="p" variant="bodySm" tone="subdued">
              {audit.started}
            </Text>
          </InlineStack>
        </InlineStack>
      </BlockStack>
    </Box>
  );
}

/* ─── activity row ─────────────────────────────────────────── */
function ActivityRow({ row }) {
  return (
    <Box paddingBlock="350">
      <InlineStack align="space-between" blockAlign="center" wrap={false} gap="300">
        <BlockStack gap="100">
          <Text as="p" variant="bodyMd" fontWeight="semibold">
            {row.item}
          </Text>
          <Text as="p" variant="bodySm" tone="subdued">
            {row.event} · {row.date}
          </Text>
        </BlockStack>
        <div style={{ flexShrink: 0 }}>
          <Badge tone={row.statusTone}>{row.status}</Badge>
        </div>
      </InlineStack>
    </Box>
  );
}

/* ─── main component ───────────────────────────────────────── */
export default function Dashboard() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <Page
      title="Dashboard"
      subtitle="Stock-Proof — Inventory Audit Management"
      primaryAction={{ content: "Start New Audit" }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: () => window.location.reload() }, { content: "View Reports" }]}
    >
      <BlockStack gap="600">

        {/* ── Notification banner ── */}
        {!dismissed && (
          <Banner
            title="3 audits are currently in progress"
            tone="info"
            onDismiss={() => setDismissed(true)}
            action={{ content: "View Active Audits", url: "/app/activeAudit" }}
          >
            <Text as="p" variant="bodyMd">
              You have pending approvals that require your attention.
            </Text>
          </Banner>
        )}

        {/* ── Stat cards – 4-column grid ── */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <StatCard stat={statsData[0]} />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <StatCard stat={statsData[1]} />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <StatCard stat={statsData[2]} />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <StatCard stat={statsData[3]} />
          </Grid.Cell>
        </Grid>

        {/* ── Active Audits (2/3) + Recent Activity (1/3) ── */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">Active Audits</Text>
                  <Button variant="plain" url="/app/activeAudit">View all</Button>
                </InlineStack>

                <Divider />

                <Box paddingBlockEnd="100">
                  <InlineStack align="space-between">
                    <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">
                      AUDIT NAME
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">
                      STATUS / ASSIGNEE
                    </Text>
                  </InlineStack>
                </Box>

                <BlockStack gap="0">
                  {activeAudits.map((audit, i) => (
                    <div key={audit.name}>
                      <AuditRow audit={audit} />
                      {i < activeAudits.length - 1 && <Divider />}
                    </div>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Grid.Cell>

          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">Recent Activity</Text>
                  <Button variant="plain" url="/app/auditHistory">History</Button>
                </InlineStack>

                <Divider />

                <BlockStack gap="0">
                  {recentActivity.map((row, i) => (
                    <div key={row.item}>
                      <ActivityRow row={row} />
                      {i < recentActivity.length - 1 && <Divider />}
                    </div>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Grid.Cell>
        </Grid>

        {/* ── Quick Actions ── */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Quick Actions</Text>
            <Divider />
            <InlineStack gap="300" wrap>
              <Button variant="primary" url="/app/activeAudit">View Active Audits</Button>
              <Button url="/app/discrepancies">Manage Discrepancies</Button>
              <Button url="/app/approvals">Pending Approvals</Button>
              <Button url="/app/auditHistory">Audit History</Button>
              <Button url="/app/settings">Settings</Button>
            </InlineStack>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
