import { useState, useCallback } from "react";
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
  ProgressBar,
  Modal,
  TextField,
  Select,
  EmptyState,
  Filters,
  ChoiceList,
  Divider,
  Box,
  Tabs,
} from "@shopify/polaris";
import { RefreshIcon } from "@shopify/polaris-icons";

const auditsData = [
  {
    id: "1",
    name: "Warehouse A - Full Audit",
    status: "In Progress",
    progress: 68,
    assignee: "John D.",
    started: "Sep 5, 2026",
    location: "Warehouse A",
    items: 1240,
    scanned: 843,
  },
  {
    id: "2",
    name: "Store #12 - Cycle Count",
    status: "Pending",
    progress: 0,
    assignee: "Sarah M.",
    started: "Sep 7, 2026",
    location: "Store #12",
    items: 320,
    scanned: 0,
  },
  {
    id: "3",
    name: "Backroom - Spot Check",
    status: "In Progress",
    progress: 42,
    assignee: "Raj P.",
    started: "Sep 6, 2026",
    location: "Backroom",
    items: 180,
    scanned: 76,
  },
];

const statusTone = {
  "In Progress": "attention",
  "Pending": "warning",
  "Completed": "success",
  "Paused": "subdued",
};

export default function ActiveAudit() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuditName, setNewAuditName] = useState("");
  const [newAuditLocation, setNewAuditLocation] = useState("");
  const [newAuditAssignee, setNewAuditAssignee] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const tabs = [
    { id: "all", content: "All Audits", accessibilityLabel: "All Audits" },
    { id: "in-progress", content: "In Progress", accessibilityLabel: "In Progress" },
    { id: "pending", content: "Pending", accessibilityLabel: "Pending" },
  ];

  const filteredAudits = auditsData.filter((a) => {
    const matchesQuery = a.name.toLowerCase().includes(queryValue.toLowerCase());
    if (selectedTab === 1) return matchesQuery && a.status === "In Progress";
    if (selectedTab === 2) return matchesQuery && a.status === "Pending";
    return matchesQuery;
  });

  const rows = filteredAudits.map((a) => [
    <BlockStack gap="100">
      <Text as="p" variant="bodyMd" fontWeight="semibold">{a.name}</Text>
      <Text as="p" variant="bodySm" tone="subdued">{a.location}</Text>
    </BlockStack>,
    <Badge tone={statusTone[a.status]}>{a.status}</Badge>,
    <BlockStack gap="100">
      <Text as="p" variant="bodySm">{a.progress}% ({a.scanned}/{a.items} items)</Text>
      <ProgressBar progress={a.progress} size="small" tone={a.progress > 60 ? "success" : "primary"} />
    </BlockStack>,
    a.assignee,
    a.started,
    <InlineStack gap="200">
      <Button size="slim" variant="primary">Resume</Button>
      <Button size="slim">View</Button>
    </InlineStack>,
  ]);

  return (
    <Page
      title="Active Audits"
      subtitle="Monitor and manage your ongoing inventory audits"
      primaryAction={{ content: "Start New Audit", onAction: () => setModalOpen(true) }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: () => window.location.reload() }, { content: "Import Audit" }]}
    >
      <BlockStack gap="400">
        {/* Summary Cards */}
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Total Active</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">3</Text>
                <Badge tone="attention">In Progress</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Items Remaining</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">821</Text>
                <Badge tone="warning">Across all audits</Badge>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="bodySm" tone="subdued">Avg. Completion</Text>
                <Text as="p" variant="headingXl" fontWeight="bold">37%</Text>
                <ProgressBar progress={37} size="small" tone="primary" />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Audits Table with Tabs */}
        <Card>
          <BlockStack gap="400">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
            <Filters
              queryValue={queryValue}
              filters={[]}
              onQueryChange={setQueryValue}
              onQueryClear={() => setQueryValue("")}
              onClearAll={() => setQueryValue("")}
              queryPlaceholder="Search audits..."
            />
            {rows.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text", "text"]}
                headings={["Audit Name", "Status", "Progress", "Assignee", "Started", "Actions"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No audits found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text as="p" variant="bodyMd">
                  No audits match your current filter. Try adjusting your search or start a new audit.
                </Text>
              </EmptyState>
            )}
          </BlockStack>
        </Card>
      </BlockStack>

      {/* New Audit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Start New Audit"
        primaryAction={{ content: "Create Audit", onAction: () => setModalOpen(false) }}
        secondaryActions={[{ content: "Cancel", onAction: () => setModalOpen(false) }]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <TextField
              label="Audit Name"
              value={newAuditName}
              onChange={setNewAuditName}
              placeholder="e.g. Warehouse B - Full Count"
              autoComplete="off"
            />
            <TextField
              label="Location"
              value={newAuditLocation}
              onChange={setNewAuditLocation}
              placeholder="e.g. Warehouse B"
              autoComplete="off"
            />
            <TextField
              label="Assignee"
              value={newAuditAssignee}
              onChange={setNewAuditAssignee}
              placeholder="e.g. John D."
              autoComplete="off"
            />
            <Select
              label="Audit Type"
              options={[
                { label: "Full Inventory Count", value: "full" },
                { label: "Cycle Count", value: "cycle" },
                { label: "Spot Check", value: "spot" },
              ]}
              onChange={() => { }}
              value="full"
            />
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
