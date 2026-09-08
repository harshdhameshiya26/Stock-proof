import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  TextField,
  Select,
  Checkbox,
  Divider,
  Banner,
  Tabs,
  FormLayout,
  ChoiceList,
  CalloutCard,
  Modal,
  Spinner,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import ThresholdConfig from "../components/settings/ThresholdConfig";
import { RefreshIcon } from "@shopify/polaris-icons";

export default function Settings() {
  const { request, shopDomain } = useApi();
  const [selectedTab, setSelectedTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const [thresholdConfig, setThresholdConfig] = useState(null);
  const [thresholdSaving, setThresholdSaving] = useState(false);
  const storeId = shopDomain || (typeof window === "undefined"
    ? ""
    : new URLSearchParams(window.location.search).get("shop") || "");

  // General Settings
  const [storeName, setStoreName] = useState("My Shopify Store");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");

  // Audit Settings
  const [auditFrequency, setAuditFrequency] = useState("monthly");
  const [autoAssign, setAutoAssign] = useState(true);
  const [requirePhoto, setRequirePhoto] = useState(false);
  const [threshold, setThreshold] = useState("5");

  // Notification Settings
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [notifEmail, setNotifEmail] = useState("admin@store.com");
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [memberActionLoading, setMemberActionLoading] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("STAFF");
  const [settingsError, setSettingsError] = useState(null);
  const [teamError, setTeamError] = useState(null);
  const [memberActionError, setMemberActionError] = useState(null);

  useEffect(() => {
    if (!storeId) return;
    request((api) => api.get(`/settings/${encodeURIComponent(storeId)}`))
      .then((response) => setThresholdConfig(response.settings))
      .catch((requestError) => setSettingsError(requestError.message));
  }, [request, storeId]);

  const fetchMembers = async () => {
    if (!storeId) return;
    setMembersLoading(true);
    try {
      const response = await request((api) => api.get(`/users?shopId=${encodeURIComponent(storeId)}`));
      setMembers(response.users || []);
      setTeamError(null);
    } catch (fetchError) {
      console.error("Failed to load team members:", fetchError);
      setTeamError(fetchError.message);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [storeId]);

  const tabs = [
    { id: "general", content: "General" },
    { id: "audit", content: "Audit Preferences" },
    { id: "notifications", content: "Notifications" },
    { id: "team", content: "Team Members" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const saveThresholdConfig = async (config) => {
    if (!storeId) return;
    setThresholdSaving(true);
    try {
      const response = await request((api) => api.put(`/settings/${encodeURIComponent(storeId)}`, config));
      setThresholdConfig(response.settings);
      setSettingsError(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setThresholdSaving(false);
    }
  };

  const openInvite = () => {
    setMemberName("");
    setMemberEmail("");
    setMemberRole("STAFF");
    setInviteModalOpen(true);
  };

  const inviteMember = async () => {
    if (!storeId || !memberName.trim() || !memberEmail.trim()) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      await request((api) => api.post("/users", {
        name: memberName.trim(),
        email: memberEmail.trim(),
        role: memberRole,
        shopId: storeId,
      }));
      setInviteModalOpen(false);
      await fetchMembers();
      setSaved(true);
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const openEdit = (member) => {
    setEditMember(member);
    setMemberRole(member.role || "STAFF");
  };

  const updateMemberRole = async () => {
    if (!editMember?._id) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      await request((api) => api.patch(`/users/${editMember._id}`, { role: memberRole }));
      setEditMember(null);
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const removeMember = async (member) => {
    if (!window.confirm(`Remove ${member.name} from this store?`)) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      await request((api) => api.delete(`/users/${member._id}`));
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const timezoneOptions = [
    { label: "Asia/Kolkata (IST)", value: "Asia/Kolkata" },
    { label: "America/New_York (EST)", value: "America/New_York" },
    { label: "Europe/London (GMT)", value: "Europe/London" },
    { label: "Asia/Tokyo (JST)", value: "Asia/Tokyo" },
    { label: "Australia/Sydney (AEDT)", value: "Australia/Sydney" },
  ];

  const currencyOptions = [
    { label: "INR (₹)", value: "INR" },
    { label: "USD ($)", value: "USD" },
    { label: "EUR (€)", value: "EUR" },
    { label: "GBP (£)", value: "GBP" },
    { label: "AUD (A$)", value: "AUD" },
  ];

  const roleOptions = [
    { label: "Auditor", value: "STAFF" },
    { label: "Manager", value: "MANAGER" },
    { label: "Admin", value: "ADMIN" },
  ];

  return (
    <Page
      title="Settings"
      subtitle="Configure Stock-Proof for your store"
      primaryAction={{ content: "Save Settings", onAction: handleSave }}
      secondaryActions={[{ content: "Refresh", icon: RefreshIcon, onAction: () => window.location.reload() }, { content: "Reset to Defaults" }]}
    >
      <BlockStack gap="400">
        {saved && (
          <Banner tone="success" title="Settings saved successfully!" onDismiss={() => setSaved(false)} />
        )}
        {settingsError && <Banner tone="critical" title="Unable to load settings" onDismiss={() => setSettingsError(null)}><p>{settingsError}</p></Banner>}

        <Card>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
        </Card>

        {/* General Tab */}
        {selectedTab === 0 && (
          <Layout>
            <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">Store Information</Text>
                  <FormLayout>
                    <TextField
                      label="Store Name"
                      value={storeName}
                      onChange={setStoreName}
                      autoComplete="off"
                    />
                    <FormLayout.Group>
                      <Select
                        label="Timezone"
                        options={timezoneOptions}
                        value={timezone}
                        onChange={setTimezone}
                      />
                      <Select
                        label="Default Currency"
                        options={currencyOptions}
                        value={currency}
                        onChange={setCurrency}
                      />
                    </FormLayout.Group>
                  </FormLayout>
                </BlockStack>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <CalloutCard
                title="Upgrade to Pro"
                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{ content: "View Plans", url: "/app/subscription" }}
              >
                <Text as="p" variant="bodyMd">
                  Get unlimited audits, advanced analytics, and priority support.
                </Text>
              </CalloutCard>
            </Layout.Section>
          </Layout>
        )}

        {/* Audit Preferences Tab */}
        {selectedTab === 1 && (
          <BlockStack gap="400">
            <ThresholdConfig value={thresholdConfig || undefined} onSave={saveThresholdConfig} loading={thresholdSaving} />
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Audit Preferences</Text>
                <Divider />
                <FormLayout>
                  <ChoiceList title="Default Audit Frequency" choices={[{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }, { label: "Quarterly", value: "quarterly" }, { label: "Annual", value: "annual" }]} selected={[auditFrequency]} onChange={([val]) => setAuditFrequency(val)} />
                  <Divider />
                  <Checkbox label="Auto-assign audits to available team members" checked={autoAssign} onChange={setAutoAssign} />
                  <Checkbox label="Require photo evidence for discrepancies" checked={requirePhoto} onChange={setRequirePhoto} />
                  <TextField label="Discrepancy Alert Threshold (%)" value={threshold} onChange={setThreshold} type="number" suffix="%" helpText="Receive alerts when discrepancy exceeds this percentage of expected count." autoComplete="off" />
                </FormLayout>
              </BlockStack>
            </Card>
          </BlockStack>
        )}

        {/* Notifications Tab */}
        {selectedTab === 2 && (
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Notification Settings</Text>
              <Divider />
              <FormLayout>
                <Checkbox
                  label="Enable email notifications"
                  checked={emailNotif}
                  onChange={setEmailNotif}
                />
                {emailNotif && (
                  <TextField
                    label="Notification Email"
                    value={notifEmail}
                    onChange={setNotifEmail}
                    type="email"
                    autoComplete="email"
                    helpText="Receive audit updates, discrepancy alerts, and approval requests."
                  />
                )}
                <Divider />
                <Checkbox
                  label="Enable Slack notifications"
                  checked={slackNotif}
                  onChange={setSlackNotif}
                />
                {slackNotif && (
                  <TextField
                    label="Slack Webhook URL"
                    value={slackWebhook}
                    onChange={setSlackWebhook}
                    placeholder="https://hooks.slack.com/services/..."
                    autoComplete="off"
                    helpText="Post real-time notifications to a Slack channel."
                  />
                )}
              </FormLayout>
            </BlockStack>
          </Card>
        )}

        {/* Team Members Tab */}
        {selectedTab === 3 && (
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text as="h2" variant="headingMd">Team Members</Text>
                <Button variant="primary" onClick={openInvite}>Invite Member</Button>
              </InlineStack>
              <Divider />
              {teamError && <Banner tone="critical" title="Unable to load team members" onDismiss={() => setTeamError(null)}><p>{teamError}</p></Banner>}
              {memberActionError && <Banner tone="critical" title="Team member action failed" onDismiss={() => setMemberActionError(null)}><p>{memberActionError}</p></Banner>}
              {membersLoading ? (
                <InlineStack align="center"><Spinner size="small" /></InlineStack>
              ) : members.length === 0 ? (
                <Text as="p" tone="subdued">No team members found for this store.</Text>
              ) : members.map((m, i) => (
                <div key={m._id}>
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="100">
                      <Text as="p" variant="bodyMd" fontWeight="semibold">{m.name}</Text>
                      <Text as="p" variant="bodySm" tone="subdued">{m.email}</Text>
                    </BlockStack>
                    <InlineStack gap="300" blockAlign="center">
                      <Badge tone={m.role === "MANAGER" || m.role === "ADMIN" ? "info" : "subdued"}>
                        {m.role === "STAFF" ? "Auditor" : m.role}
                      </Badge>
                      <Button size="slim" onClick={() => openEdit(m)} disabled={memberActionLoading}>Edit</Button>
                      <Button size="slim" tone="critical" onClick={() => removeMember(m)} loading={memberActionLoading}>Remove</Button>
                    </InlineStack>
                  </InlineStack>
                  {i < members.length - 1 && <Divider />}
                </div>
              ))}
            </BlockStack>
          </Card>
        )}
      </BlockStack>

      <Modal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite team member"
        primaryAction={{ content: memberActionLoading ? "Inviting..." : "Invite member", onAction: inviteMember, loading: memberActionLoading, disabled: !memberName.trim() || !memberEmail.trim() }}
        secondaryActions={[{ content: "Cancel", onAction: () => setInviteModalOpen(false), disabled: memberActionLoading }]}
      >
        <Modal.Section>
          <FormLayout>
            {memberActionError && <Banner tone="critical" title="Unable to invite member"><p>{memberActionError}</p></Banner>}
            <TextField label="Name" value={memberName} onChange={setMemberName} autoComplete="name" />
            <TextField label="Email" type="email" value={memberEmail} onChange={setMemberEmail} autoComplete="email" />
            <Select label="Role" options={roleOptions} value={memberRole} onChange={setMemberRole} />
          </FormLayout>
        </Modal.Section>
      </Modal>

      <Modal
        open={Boolean(editMember)}
        onClose={() => setEditMember(null)}
        title={`Edit ${editMember?.name || "team member"}`}
        primaryAction={{ content: "Save role", onAction: updateMemberRole, loading: memberActionLoading }}
        secondaryActions={[{ content: "Cancel", onAction: () => setEditMember(null), disabled: memberActionLoading }]}
      >
        <Modal.Section>
          <Select label="Role" options={roleOptions} value={memberRole} onChange={setMemberRole} />
        </Modal.Section>
      </Modal>
    </Page>
  );
}
