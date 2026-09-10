import { useState, useCallback, useEffect } from "react";
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
  ProgressBar,
  TextField,
  Select,
  EmptyState,
  Filters,
  Divider,
  Box,
  Tabs,
  Spinner,
  Banner,
  Modal,
  Icon,
} from "@shopify/polaris";
import { ClipboardIcon, ClockIcon, RefreshIcon, ListBulletedIcon } from "@shopify/polaris-icons";
import AppDrawer from "../components/common/AppDrawer";
import { useApi } from "../hooks/useApi";

const statusTone = {
  IN_PROGRESS: "attention",
  PAUSED: "subdued",
  PENDING_APPROVAL: "warning",
  COMPLETED: "success",
  CANCELLED: "critical",
  // UI display labels
  "In Progress": "attention",
  Pending: "warning",
  Completed: "success",
  Paused: "subdued",
};

export default function ActiveAudit() {
  const { request, loading, shopDomain } = useApi();

  // ── List state ────────────────────────────────────────────
  const [auditsData, setAuditsData] = useState([]);
  const [listError, setListError] = useState(null);
  const [listLoading, setListLoading] = useState(false);

  // ── Tab / filter state ────────────────────────────────────
  const [selectedTab, setSelectedTab] = useState(0);
  const [queryValue, setQueryValue] = useState("");

  // ── Drawer / form state ───────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newAuditName, setNewAuditName] = useState("");
  const [newAuditLocation, setNewAuditLocation] = useState("");
  const [newAuditAssignee, setNewAuditAssignee] = useState("");
  const [newAuditType, setNewAuditType] = useState("full");
  const [newAuditNotes, setNewAuditNotes] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [startOtpModalOpen, setStartOtpModalOpen] = useState(false);
  const [startChallengeId, setStartChallengeId] = useState(null);
  const [startOtp, setStartOtp] = useState("");

  // ── View Report Drawer State ─────────────────────────────
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false);
  const [selectedAuditForReport, setSelectedAuditForReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  // ── Counting drawer state ───────────────────────────────
  const [countingDrawerOpen, setCountingDrawerOpen] = useState(false);
  const [selectedAuditForCounting, setSelectedAuditForCounting] = useState(null);
  const [countingItems, setCountingItems] = useState([]);
  const [countingLoading, setCountingLoading] = useState(false);
  const [countingError, setCountingError] = useState(null);
  const [savingItemId, setSavingItemId] = useState(null);
  const [submittingAudit, setSubmittingAudit] = useState(false);

  // ── Location choices loaded from Shopify ─────────────────
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  // ── Staff choices loaded from backend ────────────────────
  const [staffMembers, setStaffMembers] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);

  // ── Delete confirmation state ────────────────────────────
  const [deleteAuditId, setDeleteAuditId] = useState(null);

  // ── Action loading state (Pause/Resume) ────────────────
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const tabs = [
    { id: "all", content: "All Audits", accessibilityLabel: "All Audits" },
    { id: "in-progress", content: "In Progress", accessibilityLabel: "In Progress" },
    { id: "pending", content: "Pending Approval", accessibilityLabel: "Pending" },
  ];

  // ── Fetch active audits from backend ─────────────────────
  const fetchAudits = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await request((api) => api.get("/audits?status=IN_PROGRESS"));
      // Also fetch paused audits
      const resPaused = await request((api) => api.get("/audits?status=PAUSED"));
      const resPending = await request((api) => api.get("/audits?status=PENDING_APPROVAL"));
      const all = [
        ...(res?.data || []),
        ...(resPaused?.data || []),
        ...(resPending?.data || []),
      ];
      setAuditsData(all);
    } catch (err) {
      setListError(err.message || "Failed to load audits");
    } finally {
      setListLoading(false);
    }
  }, [request]);

  // ── Fetch Shopify locations for the dropdown ──────────────
  const fetchLocations = useCallback(async () => {
    setLocationsLoading(true);
    try {
      const res = await request((api) => api.get("/products/locations"));
      const locs = (res?.locations || []).map((l) => ({
        label: l.name,
        value: l.id,
      }));
      setLocations(locs);
      if (locs.length > 0) setNewAuditLocation(locs[0].value);
    } catch {
      // Locations not critical — allow manual entry fallback
      setLocations([]);
    } finally {
      setLocationsLoading(false);
    }
  }, [request]);

  // ── Fetch Staff for the assignee dropdown ─────────────────
  const fetchStaff = useCallback(async () => {
    if (!shopDomain) return;
    setStaffLoading(true);
    try {
      const res = await request((api) => api.get(`/users?shopId=${encodeURIComponent(shopDomain)}`));
      const staff = (res?.users || [])
        .filter((u) => u.role === "STAFF" && u.status === "ACTIVE" && u.isEmailVerified)
        .map((u) => ({
          label: u.name || u.email,
          value: u._id,
        }));
      setStaffMembers(staff);
      setNewAuditAssignee((currentAssignee) => currentAssignee || staff[0]?.value || "");
    } catch {
      setStaffMembers([]);
    } finally {
      setStaffLoading(false);
    }
  }, [request, shopDomain]);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  // ── Open drawer and load locations & staff ───────────────
  const openDrawer = () => {
    setCreateError(null);
    setNewAuditName("");
    setNewAuditAssignee("");
    setNewAuditType("full");
    setNewAuditNotes("");
    setDrawerOpen(true);
    fetchLocations();
    fetchStaff();
  };

  // ── Create Audit — calls POST /api/audits/start ───────────
  const handleCreateAudit = async () => {
    setCreateError(null);

    // Client-side validation
    if (!newAuditName.trim()) {
      setCreateError("Audit name is required.");
      return;
    }
    if (!newAuditLocation) {
      setCreateError("Please select a location.");
      return;
    }
    if (!newAuditAssignee.trim()) {
      setCreateError("Please select an auditor.");
      return;
    }

    setIsCreating(true);
    try {
      // Determine scopeType from audit type selection
      const scopeType = "location"; // always location-scoped from UI

      const response = await request((api) =>
        api.post("/audits/start", {
          shopId: shopDomain,
          locationId: newAuditLocation,
          staffId: newAuditAssignee.trim(),
          scopeType,
          name: newAuditName.trim(),
          notes: newAuditNotes.trim() || undefined,
        })
      );

      setStartChallengeId(response.challengeId);
      setStartOtp("");
      setStartOtpModalOpen(true);
    } catch (err) {
      setCreateError(err.message || "Failed to create audit. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleVerifyStartOtp = async () => {
    if (!startChallengeId || !/^\d{6}$/.test(startOtp.trim())) return;
    setIsCreating(true);
    setCreateError(null);
    try {
      await request((api) => api.post("/audits/start/verify-otp", {
        challengeId: startChallengeId,
        otp: startOtp.trim(),
        staffId: newAuditAssignee.trim(),
      }));
      setStartOtpModalOpen(false);
      setStartChallengeId(null);
      setStartOtp("");
      setDrawerOpen(false);
      await fetchAudits();
    } catch (err) {
      setCreateError(err.message || "Unable to verify manager approval OTP.");
    } finally {
      setIsCreating(false);
    }
  };

  // ── Pause / Resume audit ─────────────────────────────────
  const handlePause = async (auditId) => {
    setActionLoadingId(`pause-${auditId}`);
    try {
      await request((api) => api.patch(`/audits/${auditId}/pause`, {}));
      fetchAudits();
    } catch (err) {
      setListError(err.message || "Failed to pause audit");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleResume = async (auditId, currentStatus) => {
    if (currentStatus === "PAUSED") {
      setActionLoadingId(`resume-${auditId}`);
      try {
        await request((api) => api.patch(`/audits/${auditId}/resume`, {}));
        fetchAudits();
      } catch (err) {
        setListError(err.message || "Failed to resume audit");
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  // ── Delete / Cancel audit ────────────────────────────────
  const handleDeleteClick = (auditId) => {
    setDeleteAuditId(auditId);
  };

  const confirmDelete = async () => {
    if (!deleteAuditId) return;
    try {
      await request((api) => api.delete(`/audits/${deleteAuditId}/cancel`));
      setDeleteAuditId(null);
      fetchAudits();
    } catch (err) {
      setListError(err.message || "Failed to delete audit");
      setDeleteAuditId(null);
    }
  };

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

  const handleOpenCounting = async (audit) => {
    setSelectedAuditForCounting(audit);
    setCountingDrawerOpen(true);
    setCountingLoading(true);
    setCountingError(null);
    try {
      const res = await request((api) => api.get(`/audits/${audit._id}`));
      setCountingItems((res?.lineItems || []).map((item) => ({
        ...item,
        countInput: item.actualCount === null || item.actualCount === undefined
          ? ""
          : String(item.actualCount),
      })));
    } catch (err) {
      setCountingError(err.message || "Failed to load audit items.");
    } finally {
      setCountingLoading(false);
    }
  };

  const updateCountInput = (itemId, value) => {
    if (value !== "" && (!/^\d+(\.\d+)?$/.test(value) || Number(value) < 0)) return;
    setCountingItems((items) => items.map((item) => (
      item._id === itemId ? { ...item, countInput: value } : item
    )));
  };

  const saveItemCount = async (item) => {
    if (item.countInput === "") {
      setCountingError("Enter a count before saving.");
      return;
    }
    setSavingItemId(item._id);
    setCountingError(null);
    try {
      const res = await request((api) => api.patch(
        `/audits/${selectedAuditForCounting._id}/items/${item._id}`,
        { actualCount: Number(item.countInput) }
      ));
      const savedItem = res?.lineItem;
      setCountingItems((items) => items.map((current) => (
        current._id === item._id
          ? { ...current, ...savedItem, countInput: String(savedItem?.actualCount ?? item.countInput) }
          : current
      )));
      await fetchAudits();
    } catch (err) {
      setCountingError(err.message || "Failed to save count.");
    } finally {
      setSavingItemId(null);
    }
  };

  const submitAudit = async () => {
    if (!selectedAuditForCounting || countingItems.some((item) => item.countInput === "")) {
      setCountingError("Count every item before submitting the audit.");
      return;
    }

    setSubmittingAudit(true);
    setCountingError(null);
    try {
      await request((api) => api.post(`/audits/${selectedAuditForCounting._id}/submit`, {}));
      setCountingDrawerOpen(false);
      setSelectedAuditForCounting(null);
      setCountingItems([]);
      await fetchAudits();
    } catch (err) {
      setCountingError(err.message || "Failed to submit audit.");
    } finally {
      setSubmittingAudit(false);
    }
  };

  // ── Filter audits by tab + search ────────────────────────
  const filteredAudits = auditsData.filter((a) => {
    const matchesQuery =
      (a.name || "").toLowerCase().includes(queryValue.toLowerCase()) ||
      (a.locationId || "").toLowerCase().includes(queryValue.toLowerCase());
    if (selectedTab === 1) return matchesQuery && a.status === "IN_PROGRESS";
    if (selectedTab === 2) return matchesQuery && a.status === "PENDING_APPROVAL";
    return matchesQuery;
  });

  const rows = filteredAudits.map((a) => {
    const progress = a.totalItemsCounted
      ? Math.round((a.totalItemsCounted / Math.max(a.totalItemsCounted, 1)) * 100)
      : 0;
    const isPaused = a.status === "PAUSED";
    const isInProgress = a.status === "IN_PROGRESS";

    return [
      <BlockStack gap="100" key={a._id}>
        <Text as="p" variant="bodyMd" fontWeight="semibold">{a.name || `Audit #${a.auditNumber}`}</Text>
        <Text as="p" variant="bodySm" tone="subdued">{a.locationId || "—"}</Text>
      </BlockStack>,
      <Badge tone={statusTone[a.status] || "info"} key="status">
        {a.status?.replace(/_/g, " ") || "Unknown"}
      </Badge>,
      <BlockStack gap="100" key="progress">
        <Text as="p" variant="bodySm">{a.totalItemsCounted || 0} items counted</Text>
        <ProgressBar progress={progress} size="small" tone={progress > 60 ? "success" : "primary"} />
      </BlockStack>,
      <Text as="p" variant="bodySm" key="staff">
        {a.staffId?.name || a.staffId || "—"}
      </Text>,
      new Date(a.startedAt || a.createdAt).toLocaleDateString(),
      <InlineStack gap="200" key="actions">
        {isInProgress && (
          <>
            <Button size="slim" variant="primary" onClick={() => handleOpenCounting(a)}>
              Open
            </Button>
            <Button size="slim" onClick={() => handlePause(a._id)} loading={actionLoadingId === `pause-${a._id}`}>
              Pause
            </Button>
          </>
        )}
        {isPaused && (
          <>
            <Button size="slim" variant="primary" onClick={() => handleResume(a._id, a.status)} loading={actionLoadingId === `resume-${a._id}`}>
              Resume
            </Button>
            <Button size="slim" tone="critical" onClick={() => handleDeleteClick(a._id)}>
              Delete
            </Button>
          </>
        )}
        {!isInProgress && !isPaused && (
          <>
            <Button size="slim" variant="primary" onClick={() => handleView(a)}>
              View
            </Button>
            {a.status === "PENDING_APPROVAL" && (
              <Button size="slim" tone="critical" onClick={() => handleDeleteClick(a._id)}>
                Delete
              </Button>
            )}
          </>
        )}
      </InlineStack>,
    ];
  });

  // ── Summary counts ────────────────────────────────────────
  const inProgressCount = auditsData.filter((a) => a.status === "IN_PROGRESS").length;
  const pausedCount = auditsData.filter((a) => a.status === "PAUSED").length;
  const pendingCount = auditsData.filter((a) => a.status === "PENDING_APPROVAL").length;

  return (
    <Page
      title="Active Audits"
      subtitle="Monitor and manage your ongoing inventory audits"
      primaryAction={{ content: "Start New Audit", onAction: openDrawer }}
      secondaryActions={[
        { content: "Refresh", icon: RefreshIcon, onAction: fetchAudits, loading: listLoading },
        { content: "Import Audit" },
      ]}
    >
      <BlockStack gap="400">
        {/* Error banner */}
        {listError && (
          <Banner tone="critical" title="Error loading audits" onDismiss={() => setListError(null)}>
            <p>{listError}</p>
          </Banner>
        )}

        {/* Summary Cards */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">In Progress</Text>
                  <Text as="p" variant="headingXl" fontWeight="bold">{listLoading ? "—" : inProgressCount}</Text>
                  <Badge tone="attention">Active</Badge>
                </BlockStack>
                <Box background="bg-surface-info" padding="300" borderRadius="200"><Icon source={ClipboardIcon} tone="info" /></Box>
              </InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Paused</Text>
                  <Text as="p" variant="headingXl" fontWeight="bold">{listLoading ? "—" : pausedCount}</Text>
                  <Badge tone="subdued">On Hold</Badge>
                </BlockStack>
                <Box background="bg-surface-secondary" padding="300" borderRadius="200"><Icon source={ClockIcon} tone="subdued" /></Box>
              </InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Pending Approval</Text>
                  <Text as="p" variant="headingXl" fontWeight="bold">{listLoading ? "—" : pendingCount}</Text>
                  <Badge tone="warning">Needs Review</Badge>
                </BlockStack>
                <Box background="bg-surface-warning" padding="300" borderRadius="200"><Icon source={ClockIcon} tone="warning" /></Box>
              </InlineStack>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Card padding="500">
              <InlineStack align="space-between" blockAlign="start" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Total Active Audits</Text>
                  <Text as="p" variant="headingXl" fontWeight="bold">{listLoading ? "—" : inProgressCount + pausedCount + pendingCount}</Text>
                  <Text as="p" variant="bodySm" tone="subdued">Across all statuses</Text>
                </BlockStack>
                <Box background="bg-surface-secondary" padding="300" borderRadius="200"><Icon source={ListBulletedIcon} tone="base" /></Box>
              </InlineStack>
            </Card>
          </Grid.Cell>
        </Grid>

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
            {listLoading && auditsData.length === 0 ? (
              <Box padding="600">
                <BlockStack inlineAlign="center" gap="400">
                  <Spinner size="large" />
                  <Text as="p">Loading audits...</Text>
                </BlockStack>
              </Box>
            ) : rows.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text", "text"]}
                headings={["Audit Name", "Status", "Progress", "Assigned To", "Started", "Actions"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No audits found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                action={{ content: "Start New Audit", onAction: openDrawer }}
              >
                <Text as="p" variant="bodyMd">
                  {queryValue
                    ? "No audits match your search. Try a different term."
                    : "No active audits yet. Click 'Start New Audit' to begin."}
                </Text>
              </EmptyState>
            )}
          </BlockStack>
        </Card>
      </BlockStack>

      {/* ── Count Audit Drawer ── */}
      <AppDrawer
        open={countingDrawerOpen}
        onClose={() => setCountingDrawerOpen(false)}
        title={`Count Audit: ${selectedAuditForCounting?.name || ""}`}
        primaryAction={{
          content: submittingAudit ? "Submitting..." : "Submit Audit",
          onAction: submitAudit,
          loading: submittingAudit,
          disabled: countingLoading || submittingAudit || countingItems.length === 0 || countingItems.some((item) => item.countInput === ""),
        }}
        secondaryActions={[{ content: "Close", onAction: () => setCountingDrawerOpen(false), disabled: submittingAudit }]}
        width="720px"
      >
        <BlockStack gap="400">
          {countingError && (
            <Banner tone="critical" onDismiss={() => setCountingError(null)}>
              <p>{countingError}</p>
            </Banner>
          )}
          {countingLoading ? (
            <Box padding="600">
              <BlockStack inlineAlign="center" gap="400">
                <Spinner size="large" />
                <Text as="p">Loading audit items...</Text>
              </BlockStack>
            </Box>
          ) : countingItems.length === 0 ? (
            <Text as="p" tone="subdued">No inventory items were added to this audit.</Text>
          ) : (
            countingItems.map((item) => (
              <Card key={item._id}>
                <InlineStack align="space-between" blockAlign="center" gap="300" wrap={false}>
                  <BlockStack gap="100">
                    <Text as="p" fontWeight="semibold">{item.title}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      SKU: {item.sku || "—"} · Expected: {item.expectedCount}
                    </Text>
                    {item.status !== "uncounted" && (
                      <Badge tone={statusTone[item.status] || "info"}>{item.status}</Badge>
                    )}
                  </BlockStack>
                  <InlineStack gap="200" blockAlign="end" wrap={false}>
                    <TextField
                      label="Actual count"
                      labelHidden
                      type="number"
                      min={0}
                      value={item.countInput}
                      onChange={(value) => updateCountInput(item._id, value)}
                      autoComplete="off"
                    />
                    <Button
                      variant="primary"
                      size="slim"
                      onClick={() => saveItemCount(item)}
                      loading={savingItemId === item._id}
                      disabled={item.countInput === ""}
                    >
                      Save
                    </Button>
                  </InlineStack>
                </InlineStack>
              </Card>
            ))
          )}
        </BlockStack>
      </AppDrawer>

      {/* ── Start New Audit Drawer ── */}
      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Start New Audit"
        primaryAction={{
          content: isCreating ? "Creating..." : "Create Audit",
          onAction: handleCreateAudit,
          disabled: isCreating || !newAuditName.trim() || !newAuditLocation,
          loading: isCreating,
        }}
        secondaryActions={[{ content: "Cancel", onAction: () => setDrawerOpen(false), disabled: isCreating }]}
      >
        <BlockStack gap="400">
          {createError && (
            <Banner tone="critical" onDismiss={() => setCreateError(null)}>
              <p>{createError}</p>
            </Banner>
          )}

          {isCreating && (
            <Banner tone="info">
              <InlineStack gap="200" blockAlign="center">
                <Spinner size="small" />
                <Text as="span">Fetching live Shopify inventory before requesting approval...</Text>
              </InlineStack>
            </Banner>
          )}

          <TextField
            label="Audit Name"
            value={newAuditName}
            onChange={setNewAuditName}
            placeholder="e.g. Warehouse B - Full Count"
            autoComplete="off"
            requiredIndicator
          />

          {/* Location — dropdown if Shopify locations loaded, else text input */}
          {locationsLoading ? (
            <Box>
              <Text as="p" variant="bodySm" tone="subdued">Loading locations...</Text>
              <Spinner size="small" />
            </Box>
          ) : locations.length > 0 ? (
            <Select
              label="Location"
              options={locations}
              value={newAuditLocation}
              onChange={setNewAuditLocation}
              requiredIndicator
            />
          ) : (
            <TextField
              label="Location ID"
              value={newAuditLocation}
              onChange={setNewAuditLocation}
              placeholder="e.g. gid://shopify/Location/12345"
              helpText="Enter the Shopify Location ID (gid://shopify/Location/...)"
              autoComplete="off"
              requiredIndicator
            />
          )}

          {staffLoading ? (
            <Box>
              <Text as="p" variant="bodySm" tone="subdued">Loading staff...</Text>
              <Spinner size="small" />
            </Box>
          ) : (
            <Select
              label="Assignee (Auditor)"
              options={staffMembers}
              value={newAuditAssignee}
              onChange={setNewAuditAssignee}
              helpText="The auditor must be logged in. A logged-in branch manager must approve the start by OTP."
              requiredIndicator
            />
          )}

          <Select
            label="Audit Type"
            options={[
              { label: "Full Inventory Count (all products at location)", value: "full" },
              { label: "Cycle Count (location scope)", value: "cycle" },
              { label: "Spot Check (location scope)", value: "spot" },
            ]}
            onChange={setNewAuditType}
            value={newAuditType}
          />

          <TextField
            label="Notes (optional)"
            value={newAuditNotes}
            onChange={setNewAuditNotes}
            multiline={3}
            placeholder="Add any notes or instructions for auditors..."
            autoComplete="off"
          />

          <Divider />
          <Text as="p" variant="bodySm" tone="subdued">
            ℹ️ Creating an audit will take a live snapshot of your Shopify inventory at the selected location. This may take a few seconds.
          </Text>
        </BlockStack>
      </AppDrawer>

      <Modal
        open={startOtpModalOpen}
        onClose={() => !isCreating && setStartOtpModalOpen(false)}
        title="Manager approval required"
        primaryAction={{
          content: "Verify OTP",
          onAction: handleVerifyStartOtp,
          loading: isCreating,
          disabled: isCreating || !/^\d{6}$/.test(startOtp.trim()),
        }}
        secondaryActions={[{
          content: "Cancel",
          onAction: () => setStartOtpModalOpen(false),
          disabled: isCreating,
        }]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            {createError && <Banner tone="critical">{createError}</Banner>}
            <Text as="p">A manager approval code was sent to the branch manager email address. Enter it to start this audit.</Text>
            <TextField
              label="Manager approval OTP"
              value={startOtp}
              onChange={setStartOtp}
              maxLength={6}
              autoComplete="off"
              inputMode="numeric"
            />
          </BlockStack>
        </Modal.Section>
      </Modal>

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
                      <Text key={`${item._id}-variance`} as="span" tone={item.variance < 0 ? "critical" : item.variance > 0 ? "success" : "base"}>
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

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        open={!!deleteAuditId}
        onClose={() => setDeleteAuditId(null)}
        title="Delete Audit"
        primaryAction={{
          content: "Delete",
          onAction: confirmDelete,
          destructive: true,
          loading: loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setDeleteAuditId(null),
          },
        ]}
      >
        <Modal.Section>
          <Text as="p">
            Are you sure you want to delete this audit? It will be permanently cancelled and moved to your Audit History.
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
