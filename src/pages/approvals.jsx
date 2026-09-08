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
  Tabs,
  Banner,
  Avatar,
  Spinner,
  Box,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import ManagerSignoff from "../components/approvals/ManagerSignoff";
import { RefreshIcon } from "@shopify/polaris-icons";

const statusTone = {
  pending: "warning",
  approved: "success",
  rejected: "critical",
  na: "subdued"
};

export default function Approvals() {
  const { request, loading, error } = useApi();
  const [approvalsData, setApprovalsData] = useState([]);
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [queryValue, setQueryValue] = useState("");
  
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchApprovals = useCallback(async () => {
    try {
      // 1. Get audits pending approval
      const auditsRes = await request((api) => api.get("/audits?status=PENDING_APPROVAL"));
      const pendingAudits = auditsRes.data || [];
      
      // 2. Fetch line items for each pending audit
      let allItems = [];
      for (const audit of pendingAudits) {
        const detailRes = await request((api) => api.get(`/audits/${audit._id}`));
        const items = detailRes.lineItems || [];
        
        // Filter items that need approval or have been processed
        const approvalItems = items
          .filter(i => i.approvalStatus !== 'na')
          .map(i => ({
            ...i,
            auditId: audit._id,
            auditName: audit.name || `Audit #${audit.auditNumber}`,
            locationId: audit.locationId,
            submittedBy: audit.staffId?.name || "System",
            submittedAt: audit.submittedAt || audit.updatedAt
          }));
          
        allItems = [...allItems, ...approvalItems];
      }
      
      setApprovalsData(allItems);
    } catch (err) {
      console.error("Failed to load approvals:", err);
    }
  }, [request]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const handleApprove = async (approvalOtp) => {
    if (!selectedApproval) return;
    setIsProcessing(true);
    try {
      await request((api) => api.post(`/audits/${selectedApproval.auditId}/items/${selectedApproval._id}/approve`, approvalOtp ? { approvalOtp } : {}));
      setApproveModal(false);
      fetchApprovals();
    } catch (err) {
      console.error("Approval failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedApproval) return;
    setIsProcessing(true);
    try {
      await request((api) => api.post(`/audits/${selectedApproval.auditId}/items/${selectedApproval._id}/reject`, {
        managerNote: rejectReason
      }));
      setRejectModal(false);
      setRejectReason("");
      fetchApprovals();
    } catch (err) {
      console.error("Rejection failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const tabs = [
    { id: "all", content: "All" },
    { id: "pending", content: "Pending" },
    { id: "approved", content: "Approved" },
    { id: "rejected", content: "Rejected" },
  ];

  const filtered = approvalsData.filter((a) => {
    const matchesQuery =
      (a.title || "").toLowerCase().includes(queryValue.toLowerCase()) ||
      (a.sku || "").toLowerCase().includes(queryValue.toLowerCase());
    if (selectedTab === 1) return matchesQuery && a.approvalStatus === "pending";
    if (selectedTab === 2) return matchesQuery && a.approvalStatus === "approved";
    if (selectedTab === 3) return matchesQuery && a.approvalStatus === "rejected";
    return matchesQuery;
  });

  const pendingCount = approvalsData.filter((a) => a.approvalStatus === "pending").length;

  const rows = filtered.map((a) => [
    <BlockStack gap="050">
      <Text as="p" variant="bodySm" tone="subdued">{a.auditName}</Text>
      <Text as="p" variant="bodyMd" fontWeight="semibold">{a.title}</Text>
      <Text as="p" variant="bodySm" tone="subdued">{a.sku}</Text>
    </BlockStack>,
    a.locationId,
    <InlineStack gap="100">
      <Text as="p" tone={a.variance < 0 ? "critical" : "success"} fontWeight="semibold">
        {a.variance > 0 ? `+${a.variance}` : a.variance}
      </Text>
      <Text as="p" tone="subdued">({a.expectedCount} → {a.actualCount})</Text>
    </InlineStack>,
    a.reasonCode || "No Reason provided",
    <Badge tone={a.variance < -10 || a.variance > 10 ? "critical" : "warning"}>
      {a.variance < -10 || a.variance > 10 ? "High" : "Medium"}
    </Badge>,
    <InlineStack gap="100" blockAlign="center">
      <Avatar size="xs" name={a.submittedBy} />
      <Text as="p" variant="bodySm">{a.submittedBy}</Text>
    </InlineStack>,
    new Date(a.submittedAt).toLocaleDateString(),
    <Badge tone={statusTone[a.approvalStatus] || "info"}>{a.approvalStatus}</Badge>,
    a.approvalStatus === "pending" ? (
      <InlineStack gap="200">
        <Button
          size="slim"
          variant="primary"
          tone="success"
          onClick={() => { setSelectedApproval(a); setApproveModal(true); }}
        >
          Approve
        </Button>
        <Button
          size="slim"
          tone="critical"
          onClick={() => { setSelectedApproval(a); setRejectModal(true); }}
        >
          Reject
        </Button>
      </InlineStack>
    ) : (
      <Text as="p" variant="bodySm" tone="subdued">—</Text>
    ),
  ]);

  return (
    <Page
      title="Approvals"
      subtitle="Review and approve discrepancy resolution requests"
      primaryAction={{ content: "Export Approvals" }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: fetchApprovals, loading }]}
    >
      <BlockStack gap="400">
        {error && (
          <Banner title="Error" tone="critical">
            <p>{error}</p>
          </Banner>
        )}
        
        {pendingCount > 0 && (
          <Banner tone="warning" title={`${pendingCount} approvals awaiting your decision`}>
            <Text as="p" variant="bodyMd">
              High priority items should be reviewed first.
            </Text>
          </Banner>
        )}

        {/* Summary Cards */}
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Pending</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">{pendingCount}</Text>
                <Badge tone="warning">Needs Review</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Approved</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {approvalsData.filter((a) => a.approvalStatus === "approved").length}
                </Text>
                <Badge tone="success">Completed</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Rejected</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">
                  {approvalsData.filter((a) => a.approvalStatus === "rejected").length}
                </Text>
                <Badge tone="critical">Declined</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Approvals Table */}
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
            {loading && approvalsData.length === 0 ? (
              <Box padding="600">
                <BlockStack inlineAlign="center" gap="400">
                  <Spinner size="large" />
                  <Text as="p">Loading Approvals...</Text>
                </BlockStack>
              </Box>
            ) : rows.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text", "text", "text", "text", "text"]}
                headings={["Item", "Location", "Difference", "Proposed Action", "Priority", "Submitted By", "Date", "Status", "Decision"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No approvals found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text as="p">No items match your current filter or there are no pending items.</Text>
              </EmptyState>
            )}
          </BlockStack>
        </Card>
      </BlockStack>

      <ManagerSignoff
        open={approveModal}
        item={selectedApproval}
        onClose={() => setApproveModal(false)}
        onConfirm={handleApprove}
        loading={isProcessing}
      />

      {/* Reject Modal */}
      <Modal
        open={rejectModal}
        onClose={() => setRejectModal(false)}
        title="Reject Resolution"
        primaryAction={{ 
          content: isProcessing ? "Rejecting..." : "Reject", 
          tone: "critical", 
          onAction: handleReject,
          disabled: isProcessing || !rejectReason 
        }}
        secondaryActions={[{ content: "Cancel", onAction: () => setRejectModal(false), disabled: isProcessing }]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            {error && (
              <Banner tone="critical">
                <p>{error}</p>
              </Banner>
            )}
            <Text as="p" variant="bodyMd">
              Provide a reason for rejecting the resolution for{" "}
              <strong>{selectedApproval?.title}</strong>.
            </Text>
            <TextField
              label="Rejection Reason"
              value={rejectReason}
              onChange={setRejectReason}
              multiline={3}
              placeholder="Explain why this resolution is being rejected..."
              autoComplete="off"
              disabled={isProcessing}
            />
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
