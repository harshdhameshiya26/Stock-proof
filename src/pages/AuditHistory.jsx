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
  Modal,
  Avatar,
  Icon,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import { ClipboardIcon, RefreshIcon, CheckCircleIcon, ListBulletedIcon, AlertTriangleIcon } from "@shopify/polaris-icons";
import AppDrawer from "../components/common/AppDrawer";

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

  // ── View Report Drawer State ─────────────────────────────
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false);
  const [selectedAuditForReport, setSelectedAuditForReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [deleteAudit, setDeleteAudit] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

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

  // ── View Audit Report ────────────────────────────────────
  const handleView = async (audit) => {
    setSelectedAuditForReport(audit);
    setReportDrawerOpen(true);
    setReportLoading(true);
    try {
      const res = await request((api) => api.get(`/audits/${audit._id}`));
      setReportData(res);
    } catch (err) {
      console.error("Failed to fetch report details:", err);
    } finally {
      setReportLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteAudit) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await request((api) => api.delete(`/audits/${deleteAudit._id}`));
      setHistoryData((audits) => audits.filter((audit) => audit._id !== deleteAudit._id));
      setDeleteAudit(null);
      await fetchHistory();
    } catch (err) {
      setDeleteError(err.message || "Failed to permanently delete this audit.");
    } finally {
      setDeleteLoading(false);
    }
  };

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
    <InlineStack gap="200" blockAlign="center" wrap={false}>
      <Avatar size="sm" initials="A" source={ClipboardIcon} />
      <BlockStack gap="050">
        <Text as="p" variant="bodyMd" fontWeight="semibold">{h.name || `Audit #${h.auditNumber}`}</Text>
        <Text as="p" variant="bodySm" tone="subdued">#{h.auditNumber || h._id.substring(0, 8)} · {h.scopeType || "location"}</Text>
      </BlockStack>
    </InlineStack>,
    <BlockStack gap="050">
      <Text as="span" variant="bodySm">{locations[h.locationId] || "Unknown location"}</Text>
      <Text as="span" variant="bodySm" tone="subdued">{h.locationId || "Location unavailable"}</Text>
    </BlockStack>,
    <InlineStack gap="150" blockAlign="center" wrap={false}>
      <Avatar size="xs" name={h.submittedById?.name || h.staffId?.name || "Unknown staff"} />
      <BlockStack gap="050">
        <Text as="span" variant="bodySm">{h.submittedById?.name || h.staffId?.name || "Unknown staff"}</Text>
        <Text as="span" variant="bodySm" tone="subdued">Approved: {h.approvedById?.name || "-"}</Text>
      </BlockStack>
    </InlineStack>,
    <BlockStack gap="050">
      <Text as="span" variant="bodySm">{new Date(h.completedAt || h.updatedAt).toLocaleDateString()}</Text>
      <Text as="span" variant="bodySm" tone="subdued">
        {h.startedAt && h.completedAt
          ? `${Math.max(1, Math.round((new Date(h.completedAt) - new Date(h.startedAt)) / (1000 * 60 * 60 * 24)))} days`
          : "Duration unavailable"}
      </Text>
    </BlockStack>,
    <BlockStack gap="050">
      <Text as="span" variant="bodySm" fontWeight="semibold">{(h.totalItemsCounted || 0).toLocaleString()} items</Text>
      <Text as="span" variant="bodySm" tone="subdued">Counted inventory</Text>
    </BlockStack>,
    Math.abs(h.totalNetVariance || 0) > 0 ? (
      <Badge tone="warning">{Math.abs(h.totalNetVariance)}</Badge>
    ) : (
      <Badge tone="success">0</Badge>
    ),
    <Badge tone={statusTone[h.status] || "info"}>{h.status.replace("_", " ")}</Badge>,
    <InlineStack gap="200" wrap={false}>
      <Button size="slim" variant="primary" onClick={() => handleView(h)}>View</Button>
      <Button size="slim" tone="critical" onClick={() => { setDeleteError(null); setDeleteAudit(h); }}>
        Delete
      </Button>
    </InlineStack>,
  ]);

  return (
    <Page
      fullWidth
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
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Total Audits</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{historyData.length}</Text>
                <Text as="p" variant="bodySm" tone="subdued">All time</Text>
              </BlockStack><Box background="bg-surface-secondary" padding="300" borderRadius="200"><Icon source={ListBulletedIcon} tone="base" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Completed</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {historyData.filter((h) => h.status === "COMPLETED").length}
                </Text>
                <Badge tone="success">Successfully closed</Badge>
              </BlockStack><Box background="bg-surface-success" padding="300" borderRadius="200"><Icon source={CheckCircleIcon} tone="success" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Items Audited</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{totalItems.toLocaleString()}</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total across all audits</Text>
              </BlockStack><Box background="bg-surface-info" padding="300" borderRadius="200"><Icon source={ClipboardIcon} tone="info" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Discrepancies Found</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{totalDiscrepancies}</Text>
                <Badge tone="warning">All time total</Badge>
              </BlockStack><Box background="bg-surface-warning" padding="300" borderRadius="200"><Icon source={AlertTriangleIcon} tone="warning" /></Box></InlineStack>
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
                columnContentTypes={["text", "text", "text", "text", "text", "text", "text", "text"]}
                headings={["Audit", "Location", "Completed By", "Date", "Items", "Discrepancies", "Status", "Actions"]}
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

      {/* ── View Audit Report Drawer ── */}
      <AppDrawer
        open={reportDrawerOpen}
        onClose={() => { setReportDrawerOpen(false); setReportData(null); }}
        title={`Audit Report: ${selectedAuditForReport?.name || selectedAuditForReport?.auditNumber || ""}`}
        primaryAction={{ content: "Close", onAction: () => { setReportDrawerOpen(false); setReportData(null); } }}
      >
        <BlockStack gap="400">
          {reportLoading ? (
            <Box padding="600">
              <BlockStack inlineAlign="center" gap="400">
                <Spinner size="large" />
                <Text as="p">Loading report details...</Text>
              </BlockStack>
            </Box>
          ) : reportData ? (
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text as="h2" variant="headingMd">Summary</Text>
                <Badge tone={statusTone[reportData.session?.status] || "info"}>
                  {reportData.session?.status?.replace(/_/g, " ")}
                </Badge>
              </InlineStack>
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Total Items</Text>
                    <Text as="p" fontWeight="bold">{reportData.summary?.total || 0}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Counted</Text>
                    <Text as="p" fontWeight="bold">{reportData.summary?.counted || 0}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Matches</Text>
                    <Text as="p" tone="success" fontWeight="bold">{reportData.summary?.matched || 0}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Discrepancies</Text>
                    <Text as="p" tone="warning" fontWeight="bold">{reportData.summary?.discrepancy || 0}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Missing</Text>
                    <Text as="p" tone="critical" fontWeight="bold">{reportData.summary?.missing || 0}</Text>
                  </InlineStack>
                </BlockStack>
              </Card>

              <Text as="h2" variant="headingMd">Item Details</Text>
              {reportData.lineItems?.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "numeric", "text"]}
                    headings={["Product", "Expected", "Actual", "Variance", "Status"]}
                    rows={reportData.lineItems.map((item) => [
                      item.title,
                      item.expectedCount,
                      item.actualCount !== null ? item.actualCount : "—",
                      <Text as="span" tone={item.variance < 0 ? "critical" : item.variance > 0 ? "success" : "base"}>
                        {item.variance > 0 ? `+${item.variance}` : item.variance}
                      </Text>,
                      item.status
                    ])}
                  />
                </div>
              ) : (
                <Text as="p" tone="subdued">No items found in this audit.</Text>
              )}
            </BlockStack>
          ) : (
            <Text as="p" tone="subdued">Report data could not be loaded.</Text>
          )}
        </BlockStack>
      </AppDrawer>

      <Modal
        open={!!deleteAudit}
        onClose={() => { if (!deleteLoading) setDeleteAudit(null); }}
        title="Delete audit permanently?"
        primaryAction={{
          content: "Delete permanently",
          destructive: true,
          onAction: handleDelete,
          loading: deleteLoading,
        }}
        secondaryActions={[{
          content: "Cancel",
          onAction: () => setDeleteAudit(null),
          disabled: deleteLoading,
        }]}
      >
        <Modal.Section>
          {deleteError && (
            <Banner tone="critical" title="Delete failed">
              <p>{deleteError}</p>
            </Banner>
          )}
          <Text as="p">
            This will permanently delete {deleteAudit?.name || `Audit #${deleteAudit?.auditNumber || ""}`} and all counted items and logs. This action cannot be undone.
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
