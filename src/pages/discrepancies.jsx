import { useState, useEffect, useCallback } from "react";
import {
  Page,
  Grid,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  DataTable,
  Filters,
  EmptyState,
  TextField,
  Select,
  Tabs,
  Banner,
  Box,
  Spinner,
  Icon,
  Avatar,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import ThresholdBanner from "../components/approvals/ThresholdBanner";
import { AlertTriangleIcon, RefreshIcon, CheckCircleIcon, ListBulletedIcon, ProductIcon } from "@shopify/polaris-icons";
import AppDrawer from "../components/common/AppDrawer";

const statusTone = {
  uncounted: "subdued",
  matched: "success",
  discrepancy: "warning",
  missing: "critical"
};

export default function Discrepancies() {
  const { request, loading, error } = useApi();
  const [discrepanciesData, setDiscrepanciesData] = useState([]);
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [queryValue, setQueryValue] = useState("");
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [resolveModal, setResolveModal] = useState(false);
  const [resolveNote, setResolveNote] = useState("");
  const [resolveAction, setResolveAction] = useState("wrong_count");
  const [actualCount, setActualCount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [inventoryDrawerOpen, setInventoryDrawerOpen] = useState(false);
  const [inventoryNote, setInventoryNote] = useState("");
  const [inventoryResult, setInventoryResult] = useState(null);
  const [inventoryProcessing, setInventoryProcessing] = useState(false);

  const fetchDiscrepancies = useCallback(async () => {
    try {
      // 1. Get active audits (in progress)
      const auditsRes = await request((api) => api.get("/audits?status=IN_PROGRESS"));
      const activeAudits = auditsRes.data || [];
      
      // 2. Fetch line items for each audit
      let allItems = [];
      for (const audit of activeAudits) {
        // Get all items to compute discrepancy status properly
        const detailRes = await request((api) => api.get(`/audits/${audit._id}`));
        const items = detailRes.lineItems || [];
        
        // Filter discrepancies and missing items
        const discItems = items
          .filter(i => i.status === 'discrepancy' || i.status === 'missing')
          .map(i => ({
            ...i,
            auditId: audit._id,
            auditName: audit.name || `Audit #${audit.auditNumber}`,
            locationId: audit.locationId,
            reportedBy: i.countedById?.name || "Uncounted",
            date: i.updatedAt
          }));
          
        allItems = [...allItems, ...discItems];
      }
      
      setDiscrepanciesData(allItems);
    } catch (err) {
      console.error("Failed to load discrepancies:", err);
    }
  }, [request]);

  useEffect(() => {
    fetchDiscrepancies();
  }, [fetchDiscrepancies]);

  const handleResolve = async () => {
    if (!selectedItem) return;
    setIsProcessing(true);
    try {
      // Backend accepts: damaged, missing, misplaced, wrong_count, unknown
      // 'recount' is a UI concept — maps to wrong_count + new actualCount
      // 'escalate' is a UI concept — maps to unknown reason + escalation note
      const backendReasonCode = resolveAction === "escalate" ? "unknown" : resolveAction;

      const payload = {
        reasonCode: backendReasonCode,
        note: resolveAction === "escalate"
          ? `[ESCALATED] ${resolveNote}`.trim()
          : resolveNote,
      };

      // If user provided a recount value, update the actual count too
      if (actualCount !== "") {
        payload.actualCount = Number(actualCount);
      }

      await request((api) => api.patch(`/audits/${selectedItem.auditId}/items/${selectedItem._id}`, payload));

      setResolveModal(false);
      setResolveNote("");
      setActualCount("");
      fetchDiscrepancies();
    } catch (err) {
      console.error("Resolution failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const openInventoryDrawer = (item) => {
    setSelectedItem(item);
    setInventoryNote("");
    setInventoryResult(null);
    setInventoryDrawerOpen(true);
  };

  const handleInventoryUpdate = async () => {
    if (!selectedItem) return;
    setInventoryProcessing(true);
    try {
      const response = await request((api) => api.post(
        `/audits/${selectedItem.auditId}/items/${selectedItem._id}/update-inventory`,
        { note: inventoryNote.trim() }
      ));
      setInventoryResult(response);
      await fetchDiscrepancies();
    } catch (err) {
      setInventoryResult({ error: err.message || "Shopify inventory update failed." });
    } finally {
      setInventoryProcessing(false);
    }
  };

  const tabs = [
    { id: "all", content: "All" },
    { id: "discrepancy", content: "Count Mismatch" },
    { id: "missing", content: "Missing" },
  ];

  const filtered = discrepanciesData.filter((d) => {
    const matchesQuery =
      (d.title || "").toLowerCase().includes(queryValue.toLowerCase()) ||
      (d.sku || "").toLowerCase().includes(queryValue.toLowerCase());
    if (selectedTab === 1) return matchesQuery && d.status === "discrepancy";
    if (selectedTab === 2) return matchesQuery && d.status === "missing";
    return matchesQuery;
  });

  const rows = filtered.map((d) => [
    <InlineStack gap="200" blockAlign="center" wrap={false}>
      <Avatar size="sm" source={ProductIcon} />
      <BlockStack gap="050">
        <Text as="p" variant="bodyMd" fontWeight="semibold">{d.title || "Unknown Product"}</Text>
        <Text as="p" variant="bodySm" tone="subdued">{d.sku || "No SKU"} · {d.auditName}</Text>
      </BlockStack>
    </InlineStack>,
    d.locationId,
    d.expectedCount,
    d.actualCount !== null ? d.actualCount : "-",
    <Text
      as="p"
      variant="bodyMd"
      fontWeight="semibold"
      tone={d.variance < 0 ? "critical" : d.variance > 0 ? "success" : "subdued"}
    >
      {d.variance > 0 ? `+${d.variance}` : d.variance}
    </Text>,
    <Badge tone={statusTone[d.status]}>{d.status}</Badge>,
    d.reportedBy,
    new Date(d.date).toLocaleDateString(),
    <InlineStack gap="200" wrap={false}>
      <Button
        size="slim"
        onClick={() => openInventoryDrawer(d)}
        disabled={d.actualCount === null || d.actualCount === undefined}
      >
        Update inventory
      </Button>
      <Button 
        size="slim" 
        variant="primary" 
        onClick={() => {
          setSelectedItem(d);
          setResolveAction(d.reasonCode || "wrong_count");
          setResolveNote(d.note || "");
          setActualCount(d.actualCount?.toString() || "");
          setResolveModal(true);
        }}
      >
        Resolve
      </Button>
    </InlineStack>,
  ]);

  const unresolvedCount = discrepanciesData.filter((d) => !d.reasonCode).length;
  const inReviewCount = discrepanciesData.filter((d) => d.reasonCode === "escalate").length;
  const resolvedCount = discrepanciesData.filter((d) => d.reasonCode && d.reasonCode !== "escalate").length;

  return (
    <Page
      fullWidth
      title="Discrepancies"
      subtitle="Review and resolve inventory count mismatches in active audits"
      primaryAction={{
        content: "Export Report",
      }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: fetchDiscrepancies, loading }]}
    >
      <BlockStack gap="400">
        {error && (
          <Banner title="Error" tone="critical">
            <p>{error}</p>
          </Banner>
        )}
        
        <ThresholdBanner count={unresolvedCount} tone="critical" title={`${unresolvedCount} discrepancies need attention`}>
          <Text as="p" variant="bodyMd">These items have not been reviewed yet. Please resolve or escalate them.</Text>
        </ThresholdBanner>

        {/* Summary Cards */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200"><Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Unresolved</Text><Text as="p" variant="headingXl" fontWeight="bold">{unresolvedCount}</Text><Badge tone="critical">Needs Action</Badge></BlockStack><Box background="bg-surface-critical" padding="300" borderRadius="200"><Icon source={AlertTriangleIcon} tone="critical" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Escalated</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{inReviewCount}</Text>
                <Badge tone="warning">Pending Manager</Badge>
              </BlockStack><Box background="bg-surface-warning" padding="300" borderRadius="200"><Icon source={AlertTriangleIcon} tone="warning" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Resolved / Accepted</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {resolvedCount}
                </Text>
                <Badge tone="success">Documented</Badge>
              </BlockStack><Box background="bg-surface-success" padding="300" borderRadius="200"><Icon source={CheckCircleIcon} tone="success" /></Box></InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}><Card padding="500"><InlineStack align="space-between" blockAlign="start" wrap={false}><BlockStack gap="200"><Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Total Issues</Text><Text as="p" variant="headingXl" fontWeight="bold">{discrepanciesData.length}</Text><Text as="p" variant="bodySm" tone="subdued">Across active audits</Text></BlockStack><Box background="bg-surface-secondary" padding="300" borderRadius="200"><Icon source={ListBulletedIcon} tone="base" /></Box></InlineStack></Card></Grid.Cell>
        </Grid>

        {/* Discrepancies Table */}
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
                  queryPlaceholder="Search by product or SKU..."
                />
              </div>
            </InlineStack>
            {loading && discrepanciesData.length === 0 ? (
              <Box padding="600">
                <BlockStack inlineAlign="center" gap="400">
                  <Spinner size="large" />
                  <Text as="p">Loading Discrepancies...</Text>
                </BlockStack>
              </Box>
            ) : rows.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "numeric", "numeric", "numeric", "text", "text", "text", "text"]}
                headings={["Product", "Location", "Expected", "Actual", "Difference", "Status", "Reported By", "Date", "Actions"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No discrepancies found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text as="p">No items match your current filter.</Text>
              </EmptyState>
            )}
          </BlockStack>
        </Card>
      </BlockStack>

      {/* Resolve Drawer */}
      <AppDrawer
        open={resolveModal}
        onClose={() => setResolveModal(false)}
        title="Resolve Discrepancy"
        primaryAction={{
          content: isProcessing ? "Saving..." : "Confirm Resolution",
          onAction: handleResolve,
          disabled: isProcessing
        }}
        secondaryActions={[{ content: "Cancel", onAction: () => setResolveModal(false), disabled: isProcessing }]}
      >
        <BlockStack gap="400">
          {error && (
            <Banner tone="critical">
              <p>{error}</p>
            </Banner>
          )}
          <Text as="p" variant="bodyMd">
            Resolving discrepancy for <strong>{selectedItem?.title}</strong>
          </Text>
          <InlineStack gap="400">
             <Text as="p">Expected: {selectedItem?.expectedCount}</Text>
             <Text as="p">Current Count: {selectedItem?.actualCount !== null ? selectedItem?.actualCount : '-'}</Text>
          </InlineStack>
          <Select
            label="Resolution Action"
            options={[
              { label: "Wrong Count — update actual count", value: "wrong_count" },
              { label: "Damaged", value: "damaged" },
              { label: "Missing / Lost", value: "missing" },
              { label: "Misplaced", value: "misplaced" },
              { label: "Escalate to Manager (Unknown)", value: "escalate" },
              { label: "Other / Unknown", value: "unknown" },
            ]}
            value={resolveAction}
            onChange={(val) => { setResolveAction(val); setActualCount(""); }}
          />
          {/* Always show actual count field so staff can correct the count */}
          <TextField
            label="Corrected Actual Count"
            type="number"
              value={actualCount}
              onChange={setActualCount}
              autoComplete="off"
              disabled={isProcessing}
            />
          <TextField
            label="Resolution Notes"
            value={resolveNote}
            onChange={setResolveNote}
            multiline={4}
            placeholder="Add notes about how this discrepancy was resolved..."
            autoComplete="off"
            disabled={isProcessing}
          />
        </BlockStack>
      </AppDrawer>

        <AppDrawer
          open={inventoryDrawerOpen}
          onClose={() => { if (!inventoryProcessing) setInventoryDrawerOpen(false); }}
          title={inventoryResult && !inventoryResult.error ? "Inventory update completed" : "Apply inventory changes"}
          width="620px"
          primaryAction={inventoryResult && !inventoryResult.error ? {
            content: "Okay",
            onAction: () => setInventoryDrawerOpen(false),
          } : {
            content: inventoryProcessing ? "Updating..." : "Update inventory",
            onAction: handleInventoryUpdate,
            loading: inventoryProcessing,
            disabled: inventoryProcessing || !selectedItem || selectedItem.actualCount === null,
          }}
          secondaryActions={inventoryResult && !inventoryResult.error ? [] : [{
            content: "Cancel",
            onAction: () => setInventoryDrawerOpen(false),
            disabled: inventoryProcessing,
          }]}
        >
          <BlockStack gap="400">
            {inventoryResult?.error && <Banner tone="critical" title="Inventory update failed"><p>{inventoryResult.error}</p></Banner>}
            {inventoryResult && !inventoryResult.error ? (
              <Banner tone="success" title="Inventory update completed">
                <p>Shopify available stock was set to {inventoryResult.quantity} units for this product variant.</p>
              </Banner>
            ) : (
              <>
                <Text as="p" variant="bodyMd">Apply the counted quantity to Shopify for <strong>{selectedItem?.title}</strong>.</Text>
                <Text as="p" variant="bodyMd">Location: <strong>{selectedItem?.locationId}</strong></Text>
                <Text as="p" variant="bodyMd">Only this product variant will be updated.</Text>
                <Card padding="0">
                  <BlockStack gap="0">
                    <Box padding="300"><InlineStack align="space-between"><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">Inventory type</Text><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">Quantity</Text><Text as="span" variant="bodySm" tone="subdued" fontWeight="semibold">Difference</Text></InlineStack></Box>
                    <Box padding="300" borderBlockStartWidth="025" borderColor="border"><InlineStack align="space-between"><Text as="span">Shopify stock</Text><Text as="span">{selectedItem?.expectedCount ?? 0} units</Text><Text as="span">-</Text></InlineStack></Box>
                    <Box padding="300" borderBlockStartWidth="025" borderColor="border"><InlineStack align="space-between"><Text as="span">Actual stock</Text><Text as="span">{selectedItem?.actualCount ?? 0} units</Text><Text as="span">{selectedItem?.variance > 0 ? `+${selectedItem.variance}` : selectedItem?.variance ?? 0} units</Text></InlineStack></Box>
                    <Box padding="300" background="bg-surface-secondary" borderBlockStartWidth="025" borderColor="border"><InlineStack align="space-between"><Text as="span" fontWeight="bold">New Shopify stock</Text><Text as="span" fontWeight="bold">{selectedItem?.actualCount ?? 0} units</Text><Text as="span" fontWeight="bold">{selectedItem?.variance > 0 ? `+${selectedItem.variance}` : selectedItem?.variance ?? 0} units</Text></InlineStack></Box>
                  </BlockStack>
                </Card>
                <Banner tone="warning" title="This changes Shopify inventory">
                  <p>Shopify available stock for this variant at the selected location will be set to the actual counted quantity.</p>
                </Banner>
                <TextField
                  label="Notes"
                  value={inventoryNote}
                  onChange={setInventoryNote}
                  multiline={4}
                  maxLength={1000}
                  showCharacterCount
                  placeholder="Add notes about this inventory update"
                  autoComplete="off"
                  disabled={inventoryProcessing}
                />
              </>
            )}
          </BlockStack>
        </AppDrawer>
    </Page>
  );
}
