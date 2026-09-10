import { useCallback, useEffect, useMemo, useState } from "react";
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
  Box,
  Icon,
  Spinner,
  Banner,
  ProgressBar,
} from "@shopify/polaris";
import {
  ClipboardIcon,
  AlertTriangleIcon,
  ClockIcon,
  PackageIcon,
  RefreshIcon,
  ArrowUpIcon,
} from "@shopify/polaris-icons";
import { useApi } from "../hooks/useApi";

const statusTone = {
  IN_PROGRESS: "success",
  PAUSED: "subdued",
  PENDING_APPROVAL: "warning",
  COMPLETED: "success",
  CANCELLED: "critical",
};

const statusLabel = (status) => String(status || "").replaceAll("_", " ");

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

function MetricCard({ label, value, detail, tone, icon }) {
  return (
    <Card padding="500">
      <InlineStack align="space-between" blockAlign="start" wrap={false}>
        <BlockStack gap="150">
          <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">{label}</Text>
          <Text as="p" variant="headingXl" fontWeight="bold">{value}</Text>
          <InlineStack gap="150" blockAlign="center" wrap={false}>
            <Icon source={ArrowUpIcon} tone={tone} />
            <Text as="span" variant="bodySm" tone="subdued">{detail}</Text>
          </InlineStack>
        </BlockStack>
        <Box background="bg-surface-secondary" padding="300" borderRadius="200"><Icon source={icon} tone={tone} /></Box>
      </InlineStack>
    </Card>
  );
}

function ProgressOverview({ audits }) {
  const points = audits.length
    ? audits.slice(0, 7).map((audit) => Math.min(100, Math.max(0, Number(audit.progress || (audit.totalItemsCounted ? 50 : 0)))))
    : [18, 42, 30, 56, 45, 72, 64];

  return (
    <BlockStack gap="300">
      {points.map((progress, index) => (
        <InlineStack key={`${progress}-${index}`} gap="200" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodySm" tone="subdued">{`W${index + 1}`}</Text>
          <Box width="100%"><ProgressBar progress={progress} size="small" tone={progress > 60 ? "success" : "primary"} /></Box>
          <Text as="span" variant="bodySm" tone="subdued">{progress}%</Text>
        </InlineStack>
      ))}
      <InlineStack gap="400">
        <Badge tone="success">Completed</Badge>
        <Badge tone="info">In Progress</Badge>
        <Badge tone="warning">Pending</Badge>
      </InlineStack>
    </BlockStack>
  );
}

function Distribution({ counts, total }) {
  const entries = [
    ["In Progress", counts.IN_PROGRESS || 0, "info"],
    ["Completed", counts.COMPLETED || 0, "success"],
    ["Pending", counts.PENDING_APPROVAL || 0, "warning"],
    ["On Hold", counts.PAUSED || 0, "critical"],
  ];
  return (
    <BlockStack gap="300">
      <InlineStack align="center"><Text as="p" variant="heading2xl" fontWeight="bold">{total}</Text></InlineStack>
      <Text as="p" variant="bodySm" tone="subdued" alignment="center">Total Audits</Text>
      {entries.map(([label, count, tone]) => (
        <InlineStack key={label} align="space-between" blockAlign="center">
          <InlineStack gap="200" blockAlign="center"><Badge tone={tone}>{label}</Badge><Text as="span" variant="bodySm">{count}</Text></InlineStack>
          <Text as="span" variant="bodySm" tone="subdued">{total ? Math.round((count / total) * 100) : 0}%</Text>
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export default function Dashboard() {
  const { request, loading, error } = useApi();
  const [audits, setAudits] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await request((api) => api.get("/audits"));
      setAudits(response?.data || []);
    } catch {
      setAudits([]);
    }
  }, [request]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const counts = useMemo(() => audits.reduce((result, audit) => {
    result[audit.status] = (result[audit.status] || 0) + 1;
    return result;
  }, {}), [audits]);
  const activeAudits = audits.filter((audit) => ["IN_PROGRESS", "PAUSED", "PENDING_APPROVAL"].includes(audit.status)).slice(0, 5);
  const productsScanned = audits.reduce((sum, audit) => sum + Number(audit.totalItemsCounted || 0), 0);
  const discrepancies = audits.reduce((sum, audit) => sum + Math.abs(Number(audit.totalNetVariance || 0)), 0);
  const pending = counts.PENDING_APPROVAL || 0;

  return (
    <Page
      title="Good morning, Arman!"
      subtitle="Here is what's happening with your inventory audits today."
      primaryAction={{ content: "Start New Audit", url: "/app/activeAudit" }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: fetchDashboard, loading }, { content: "View Reports", url: "/app/auditHistory" }]}
    >
      <BlockStack gap="400">
        {error && <Banner tone="critical" title="Unable to load dashboard"><p>{error}</p></Banner>}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}><MetricCard label="Active Audits" value={counts.IN_PROGRESS || 0} detail={`${pending} pending approval`} tone="info" icon={ClipboardIcon} /></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}><MetricCard label="Discrepancies Found" value={discrepancies} detail="Across all audits" tone="critical" icon={AlertTriangleIcon} /></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}><MetricCard label="Pending Approval" value={pending} detail="Needs review" tone="warning" icon={ClockIcon} /></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}><MetricCard label="Products Scanned" value={productsScanned.toLocaleString()} detail="Across all audits" tone="success" icon={PackageIcon} /></Grid.Cell>
        </Grid>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}><Card padding="400"><BlockStack gap="300"><InlineStack align="space-between"><Text as="h2" variant="headingMd">Audit Progress Overview</Text><Badge tone="info">Last 7 Audits</Badge></InlineStack><ProgressOverview audits={audits} /></BlockStack></Card></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}><Card padding="400"><BlockStack gap="300"><Text as="h2" variant="headingMd">Audit Status Distribution</Text><Distribution counts={counts} total={audits.length} /></BlockStack></Card></Grid.Cell>
        </Grid>
        <Card padding="0">
          <Box padding="400"><InlineStack align="space-between"><Text as="h2" variant="headingMd">All Audits</Text><Button variant="plain" url="/app/activeAudit">View all</Button></InlineStack></Box>
          <Divider />
          {loading && !audits.length ? <Box padding="600"><InlineStack align="center"><Spinner /></InlineStack></Box> : activeAudits.length ? <BlockStack gap="0">
            <Box padding="300"><InlineStack align="space-between"><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">AUDIT NAME</Text><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">STATUS / ASSIGNEE</Text><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">PROGRESS</Text><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">STARTED</Text></InlineStack></Box>
            {activeAudits.map((audit) => { const progress = Number(audit.progress || (audit.totalItemsCounted ? 50 : 0)); return <Box key={audit._id} padding="300" borderBlockStartWidth="025" borderColor="border"><InlineStack align="space-between" blockAlign="center" wrap={false} gap="300"><BlockStack gap="050"><Text as="span" fontWeight="semibold">{audit.name || `Audit #${audit.auditNumber}`}</Text><Text as="span" variant="bodySm" tone="subdued">{audit.locationId || "Location audit"}</Text></BlockStack><InlineStack gap="200" blockAlign="center" wrap={false}><Badge tone={statusTone[audit.status] || "info"}>{statusLabel(audit.status)}</Badge><Text as="span" variant="bodySm" tone="subdued">{audit.staffId?.name || "Unassigned"}</Text></InlineStack><Box width="30%"><ProgressBar progress={progress} size="small" tone={progress > 60 ? "success" : "primary"} /></Box><Text as="span" variant="bodySm" tone="subdued">{formatDate(audit.updatedAt || audit.startedAt)}</Text></InlineStack></Box>; })}
          </BlockStack> : <Box padding="500"><Text as="p" tone="subdued">No active audits found.</Text></Box>}
        </Card>
      </BlockStack>
    </Page>
  );
}
