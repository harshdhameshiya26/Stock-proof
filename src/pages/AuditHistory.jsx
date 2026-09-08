import { useState, useEffect, useCallback } from "react";
import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  DataTable,
  Filters,
  EmptyState,
  Tabs,
  Spinner,
  Box,
  Banner,
  Grid,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import { RefreshIcon } from "@shopify/polaris-icons";

const statusTone = {
  COMPLETED: "success",
  CANCELLED: "critical",
  PENDING_APPROVAL: "warning",
};

export default function AuditHistory() {
  const { request, loading, error } = useApi();
  const [historyData, setHistoryData] = useState([]);
  const [locations, setLocations] = useState({});
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [queryValue, setQueryValue] = useState("");

  const fetchHistory = useCallback(async () => {
    try {
      // Fetch audits that are completed or cancelled
      const res = await request((api) => api.get("/audits"));
      const past = (res.data || []).filter(a => 
        a.status === 'COMPLETED' || a.status === 'CANCELLED'
      );
      setHistoryData(past);

      try {
        const locationResponse = await request((api) => api.get("/products/locations"));
        const locationMap = (locationResponse.locations || []).reduce((map, location) => {
          map[location.id] = location.name;
          return map;
        }, {});
        setLocations(locationMap);
      } catch (locationError) {
        // History remains usable if Shopify location lookup is temporarily unavailable.
        console.warn("Failed to load location names:", locationError);
      }
    } catch (err) {
      console.error("Failed to load audit history:", err);
    }
  }, [request]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const tabs = [
    { id: "all", content: "All Audits" },
    { id: "completed", content: "Completed" },
    { id: "cancelled", content: "Cancelled" },
  ];

  const filtered = historyData.filter((h) => {
    const searchQuery = String(queryValue || "").toLowerCase();
    const searchableText = (value) => String(value ?? "").toLowerCase();
    const matchesQuery =
      searchableText(h.name).includes(searchQuery) ||
      searchableText(h.locationId).includes(searchQuery) ||
      searchableText(h.auditNumber).includes(searchQuery);
    if (selectedTab === 1) return matchesQuery && h.status === "COMPLETED";
    if (selectedTab === 2) return matchesQuery && h.status === "CANCELLED";
    return matchesQuery;
  });

  const totalItems = historyData.reduce((sum, h) => sum + (h.totalItemsCounted || 0), 0);
  // Net variance as discrepancies count proxy
  const totalDiscrepancies = historyData.reduce((sum, h) => sum + Math.abs(h.totalNetVariance || 0), 0);

  const rows = filtered.map((h) => [
    <BlockStack gap="050">
      <Text as="p" variant="bodySm" tone="subdued">{h.auditNumber || h._id.substring(0,8)}</Text>
      <Text as="p" variant="bodyMd" fontWeight="semibold">{h.name || `Audit #${h.auditNumber}`}</Text>
    </BlockStack>,
    locations[h.locationId] || "Unknown location",
    h.submittedById?.name || h.staffId?.name || "Unknown staff",
    h.approvedById?.name || "-",
    new Date(h.completedAt || h.updatedAt).toLocaleDateString(),
    // Calculate duration roughly in days if possible, otherwise placeholder
    h.startedAt && h.completedAt 
      ? `${Math.max(1, Math.round((new Date(h.completedAt) - new Date(h.startedAt)) / (1000 * 60 * 60 * 24)))} days`
      : "-",
    (h.totalItemsCounted || 0).toLocaleString(),
    Math.abs(h.totalNetVariance || 0) > 0 ? (
      <Badge tone="warning">{Math.abs(h.totalNetVariance)}</Badge>
    ) : (
      <Badge tone="success">0</Badge>
    ),
    <Badge tone={statusTone[h.status] || "info"}>{h.status.replace("_", " ")}</Badge>,
    <Button size="slim" url={`/app/activeAudit`}>View Report</Button>,
  ]);

  return (
    <Page
      title="Audit History"
      subtitle="Complete record of all past inventory audits"
      primaryAction={{ content: "Export CSV" }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: fetchHistory, loading }, { content: "Print Report" }]}
    >
      <BlockStack gap="400">
        {error && (
          <Banner title="Error loading data" tone="critical">
            <p>{error}</p>
          </Banner>
        )}
        
        {/* Summary Cards */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Total Audits</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{historyData.length}</Text>
                <Text as="p" variant="bodySm" tone="subdued">All time</Text>
              </BlockStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Completed</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {historyData.filter((h) => h.status === "COMPLETED").length}
                </Text>
                <Badge tone="success">Successfully closed</Badge>
              </BlockStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Items Audited</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{totalItems.toLocaleString()}</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total across all audits</Text>
              </BlockStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Discrepancies Found</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{totalDiscrepancies}</Text>
                <Badge tone="warning">All time total</Badge>
              </BlockStack>
            </Card>
          </Grid.Cell>
        </Grid>

        {/* History Table */}
        <Card>
          <BlockStack gap="400">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
            <InlineStack gap="400" align="start">
              <div style={{ flexGrow: 1 }}>
                <Filters
                  queryValue={queryValue}
                  filters={[]}
                  onQueryChange={setQueryValue}
                  onQueryClear={() => setQueryValue("")}
                  onClearAll={() => setQueryValue("")}
                  queryPlaceholder="Search by audit name or location..."
                />
              </div>
            </InlineStack>
            
            {loading && historyData.length === 0 ? (
              <Box padding="600">
                <BlockStack inlineAlign="center" gap="400">
                  <Spinner size="large" />
                  <Text as="p">Loading History...</Text>
                </BlockStack>
              </Box>
            ) : rows.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text", "numeric", "numeric", "text", "text", "text"]}
                headings={["Audit Name", "Location", "Completed By", "Approved By", "Date", "Duration", "Items", "Discrepancies", "Status", "Action"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No audit history found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text as="p">Try adjusting your filters or date range.</Text>
              </EmptyState>
            )}
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
