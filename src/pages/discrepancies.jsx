import { useState, useEffect, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  DataTable,
  Filters,
  EmptyState,
  Modal,
  TextField,
  Select,
  Tabs,
  Banner,
  Box,
  Spinner,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import ThresholdBanner from "../components/approvals/ThresholdBanner";
import { RefreshIcon } from "@shopify/polaris-icons";

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
  const [resolveAction, setResolveAction] = useState("accept_count");
  const [actualCount, setActualCount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
      const payload = {
        reasonCode: resolveAction,
        note: resolveNote
      };
      
      if (resolveAction === "recount" && actualCount !== "") {
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
    <BlockStack gap="050">
      <Text as="p" variant="bodySm" tone="subdued">{d.auditName}</Text>
      <Text as="p" variant="bodyMd" fontWeight="semibold">{d.title}</Text>
      <Text as="p" variant="bodySm" tone="subdued">{d.sku}</Text>
    </BlockStack>,
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
    <InlineStack gap="200">
      <Button 
        size="slim" 
        variant="primary" 
        onClick={() => { 
          setSelectedItem(d); 
          setResolveAction(d.reasonCode || "accept_count");
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
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Unresolved</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{unresolvedCount}</Text>
                <Badge tone="critical">Needs Action</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Escalated</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{inReviewCount}</Text>
                <Badge tone="warning">Pending Manager</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Resolved / Accepted</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {resolvedCount}
                </Text>
                <Badge tone="success">Documented</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Discrepancies Table */}
        <Card>
          <BlockStack gap="400">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
            <Filters
              queryValue={queryValue}
              filters={[]}
              onQueryChange={setQueryValue}
              onQueryClear={() => setQueryValue("")}
              onClearAll={() => setQueryValue("")}
              queryPlaceholder="Search by product or SKU..."
            />
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

      {/* Resolve Modal */}
      <Modal
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
        <Modal.Section>
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
                { label: "Accept Actual Count", value: "accept_count" },
                { label: "Recount Required (Update Count)", value: "recount" },
                { label: "Write-off Loss", value: "writeoff" },
                { label: "Escalate to Manager", value: "escalate" },
              ]}
              value={resolveAction}
              onChange={setResolveAction}
            />
            {resolveAction === "recount" && (
              <TextField
                label="New Actual Count"
                type="number"
                value={actualCount}
                onChange={setActualCount}
                autoComplete="off"
                disabled={isProcessing}
              />
            )}
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
        </Modal.Section>
      </Modal>
    </Page>
  );
}
