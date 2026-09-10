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
  Spinner,
} from "@shopify/polaris";
import { useApi } from "../hooks/useApi";
import ThresholdConfig from "../components/settings/ThresholdConfig";
import { RefreshIcon, ViewIcon, HideIcon } from "@shopify/polaris-icons";
import AppDrawer from "../components/common/AppDrawer";

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
  const [memberLoginOpen, setMemberLoginOpen] = useState(false);
  const [memberLoginMember, setMemberLoginMember] = useState(null);
  const [memberLoginMode, setMemberLoginMode] = useState("login");
  const [memberLoginStep, setMemberLoginStep] = useState("credentials");
  const [memberLoginPassword, setMemberLoginPassword] = useState("");
  const [memberLoginConfirmPassword, setMemberLoginConfirmPassword] = useState("");
  const [showMemberLoginPassword, setShowMemberLoginPassword] = useState(false);
  const [showMemberLoginConfirmPassword, setShowMemberLoginConfirmPassword] = useState(false);
  const [memberLoginOtp, setMemberLoginOtp] = useState("");
  const [memberLoginDevOtp, setMemberLoginDevOtp] = useState("");
  const [editMember, setEditMember] = useState(null);
  const [editCurrentPassword, setEditCurrentPassword] = useState("");
  const [editNewPassword, setEditNewPassword] = useState("");
  const [editResetOtp, setEditResetOtp] = useState("");
  const [editResetDevOtp, setEditResetDevOtp] = useState("");
  const [editRoleOtp, setEditRoleOtp] = useState("");
  const [editRoleManagerId, setEditRoleManagerId] = useState("");
  const [editRoleDevOtp, setEditRoleDevOtp] = useState("");
  const [editForgotPassword, setEditForgotPassword] = useState(false);
  const [showEditCurrentPassword, setShowEditCurrentPassword] = useState(false);
  const [showEditNewPassword, setShowEditNewPassword] = useState(false);
  const [pendingRemoveMember, setPendingRemoveMember] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deleteOtpDevValue, setDeleteOtpDevValue] = useState("");
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

  const openMemberLogin = () => {
    const firstMember = members[0] || null;
    setMemberLoginMember(firstMember);
    setMemberLoginMode(firstMember?.status === "INVITED" ? "activate" : "login");
    setMemberLoginStep("credentials");
    setMemberLoginPassword("");
    setMemberLoginConfirmPassword("");
    setShowMemberLoginPassword(false);
    setShowMemberLoginConfirmPassword(false);
    setMemberLoginOtp("");
    setMemberLoginDevOtp("");
    setMemberLoginOpen(true);
  };

  const resetMemberLogin = (member) => {
    setMemberLoginMember(member);
    setMemberLoginMode(member?.status === "INVITED" ? "activate" : "login");
    setMemberLoginStep("credentials");
    setMemberLoginPassword("");
    setMemberLoginConfirmPassword("");
    setShowMemberLoginPassword(false);
    setShowMemberLoginConfirmPassword(false);
    setMemberLoginOtp("");
    setMemberLoginDevOtp("");
  };

  const submitMemberLoginCredentials = async () => {
    if (!memberLoginMember) return;
    if (memberLoginPassword.length < 8) {
      setMemberActionError("Password must be at least 8 characters long.");
      return;
    }
    if (memberLoginMode === "activate" && memberLoginPassword !== memberLoginConfirmPassword) {
      setMemberActionError("Passwords do not match.");
      return;
    }
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      const endpoint = memberLoginMode === "activate" ? "/users/activate" : "/users/login";
      const response = await request((api) => api.post(endpoint, {
        email: memberLoginMember.email,
        password: memberLoginPassword,
      }));
      setMemberLoginDevOtp(response.devOtp || "");
      setMemberLoginStep("otp");
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const verifyMemberLoginOtp = async () => {
    if (!memberLoginMember || memberLoginOtp.trim().length !== 6) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      const endpoint = memberLoginMode === "activate" ? "/users/activate/verify-otp" : "/users/login/verify-otp";
      const response = await request((api) => api.post(endpoint, {
        email: memberLoginMember.email,
        otp: memberLoginOtp.trim(),
      }));
      localStorage.setItem("stockproof_member_token", response.token);
      setMemberLoginStep("complete");
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
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
    setMemberName(member.name || "");
    setEditCurrentPassword("");
    setEditNewPassword("");
    setEditResetOtp("");
    setEditResetDevOtp("");
    setEditRoleOtp("");
    setEditRoleManagerId("");
    setEditRoleDevOtp("");
    setEditForgotPassword(false);
    setShowEditCurrentPassword(false);
    setShowEditNewPassword(false);
  };

  const requestMemberPasswordOtp = async () => {
    if (!editMember?._id) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      const response = await request((api) => api.post(`/users/${editMember._id}/password-otp`, {}));
      setEditForgotPassword(true);
      setEditResetOtp("");
      setEditResetDevOtp(response.devOtp || "");
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const updateMemberProfile = async () => {
    if (!editMember?._id) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      const roleChanged = memberRole !== editMember.role;
      if (roleChanged && editRoleOtp.trim().length !== 6) {
        const response = await request((api) => api.post(`/users/${editMember._id}/role-otp`, {}));
        setEditRoleDevOtp(response.devOtp || "");
        setEditRoleManagerId(response.managerId || "");
        setMemberActionError(`Manager OTP sent to ${response.email || "the manager email"}. Enter it, then save the profile again.`);
        return;
      }
      const payload = { name: memberName.trim(), role: memberRole };
      if (editNewPassword) {
        payload.newPassword = editNewPassword;
        if (editForgotPassword) {
          payload.resetOtp = editResetOtp.trim();
        } else {
          payload.currentPassword = editCurrentPassword;
        }
      }
      if (roleChanged) {
        payload.roleOtp = editRoleOtp.trim();
        payload.managerId = editRoleManagerId;
      }
      await request((api) => api.patch(`/users/${editMember._id}`, payload));
      setEditMember(null);
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const removeMember = (member) => {
    setMemberActionError(null);
    setPendingRemoveMember(member);
  };

  const confirmRemoveMember = async () => {
    const member = pendingRemoveMember;
    if (!member) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      setPendingRemoveMember(null);
      if (member.role === "MANAGER" || member.role === "ADMIN") {
        const response = await request((api) => api.post(`/users/${member._id}/delete-otp`, {}));
        setDeleteMember(member);
        setDeleteOtp("");
        setDeleteOtpDevValue(response.devOtp || "");
        return;
      }
      await request((api) => api.post(`/users/${member._id}/logout`, {}));
      await request((api) => api.delete(`/users/${member._id}`));
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const deleteManager = async () => {
    if (!deleteMember || deleteOtp.trim().length !== 6) return;
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      await request((api) => api.delete(`/users/${deleteMember._id}`, {
        body: JSON.stringify({ otp: deleteOtp.trim() }),
      }));
      setDeleteMember(null);
      setDeleteOtp("");
      setDeleteOtpDevValue("");
      await fetchMembers();
    } catch (actionError) {
      setMemberActionError(actionError.message);
    } finally {
      setMemberActionLoading(false);
    }
  };

  const logoutMember = async (member) => {
    setMemberActionLoading(true);
    try {
      setMemberActionError(null);
      await request((api) => api.post(`/users/${member._id}/logout`, {}));
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
                <InlineStack gap="200">
                  <Button onClick={openMemberLogin} disabled={members.length === 0}>Member Login</Button>
                  <Button variant="primary" onClick={openInvite}>Invite Member</Button>
                </InlineStack>
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
                      <Badge tone={m.status === "ACTIVE" ? "success" : "attention"}>
                        {m.status === "ACTIVE" ? "Active" : "Invited"}
                      </Badge>
                      <Badge tone={m.role === "MANAGER" || m.role === "ADMIN" ? "info" : "subdued"}>
                        {m.role === "STAFF" ? "Auditor" : m.role}
                      </Badge>
                      <Button size="slim" onClick={() => logoutMember(m)} disabled={memberActionLoading || m.status !== "ACTIVE"}>Log out</Button>
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

      <AppDrawer
        open={memberLoginOpen}
        onClose={() => {
          if (!memberActionLoading) setMemberLoginOpen(false);
        }}
        title="Member login"
        primaryAction={memberLoginStep === "credentials"
          ? { content: memberLoginMode === "activate" ? "Send activation OTP" : "Send login OTP", onAction: submitMemberLoginCredentials, loading: memberActionLoading, disabled: !memberLoginMember || !memberLoginPassword }
          : memberLoginStep === "otp"
            ? { content: memberLoginMode === "activate" ? "Activate member" : "Verify OTP", onAction: verifyMemberLoginOtp, loading: memberActionLoading, disabled: memberLoginOtp.trim().length !== 6 }
            : undefined}
        secondaryActions={memberLoginStep === "complete"
          ? [{ content: "Close", onAction: () => setMemberLoginOpen(false) }]
          : [{ content: "Cancel", onAction: () => setMemberLoginOpen(false), disabled: memberActionLoading }]}
      >
        <FormLayout>
          {memberActionError && <Banner tone="critical" title="Member login failed" onDismiss={() => setMemberActionError(null)}><p>{memberActionError}</p></Banner>}
          <Select
            label="Member"
            options={members.map((member) => ({ label: member.name, value: member._id }))}
            value={memberLoginMember?._id || ""}
            onChange={(value) => resetMemberLogin(members.find((member) => member._id === value))}
            disabled={memberLoginStep !== "credentials" || memberActionLoading}
          />
          {memberLoginMember && memberLoginStep === "credentials" && (
            <>
              <TextField label="Email" value={memberLoginMember.email} disabled autoComplete="email" />
              <TextField
                label={memberLoginMode === "activate" ? "Create password" : "Password"}
                type={showMemberLoginPassword ? "text" : "password"}
                value={memberLoginPassword}
                onChange={setMemberLoginPassword}
                minLength={8}
                autoComplete="new-password"
                suffix={<Button icon={showMemberLoginPassword ? HideIcon : ViewIcon} variant="tertiary" accessibilityLabel={showMemberLoginPassword ? "Hide password" : "Show password"} onClick={() => setShowMemberLoginPassword((visible) => !visible)} />}
              />
              {memberLoginMode === "activate" && (
                <TextField
                  label="Confirm password"
                  type={showMemberLoginConfirmPassword ? "text" : "password"}
                  value={memberLoginConfirmPassword}
                  onChange={setMemberLoginConfirmPassword}
                  minLength={8}
                  autoComplete="new-password"
                  suffix={<Button icon={showMemberLoginConfirmPassword ? HideIcon : ViewIcon} variant="tertiary" accessibilityLabel={showMemberLoginConfirmPassword ? "Hide password" : "Show password"} onClick={() => setShowMemberLoginConfirmPassword((visible) => !visible)} />}
                />
              )}
            </>
          )}
          {memberLoginStep === "otp" && (
            <>
              <Text as="p">OTP sent to {memberLoginMember?.email}.</Text>
              {memberLoginDevOtp && <Banner tone="warning"><p>Development OTP: {memberLoginDevOtp}</p></Banner>}
              <TextField label="Six-digit OTP" value={memberLoginOtp} onChange={setMemberLoginOtp} inputMode="numeric" maxLength={6} autoComplete="one-time-code" />
            </>
          )}
          {memberLoginStep === "complete" && (
            <Banner tone="success">
              <p>{memberLoginMode === "activate" ? "Member activated and logged in successfully." : "Member logged in successfully."}</p>
            </Banner>
          )}
        </FormLayout>
      </AppDrawer>

      {/* Invite Member Drawer */}
      <AppDrawer
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite team member"
        primaryAction={{ content: memberActionLoading ? "Inviting..." : "Invite member", onAction: inviteMember, loading: memberActionLoading, disabled: !memberName.trim() || !memberEmail.trim() }}
        secondaryActions={[{ content: "Cancel", onAction: () => setInviteModalOpen(false), disabled: memberActionLoading }]}
      >
        <FormLayout>
          {memberActionError && <Banner tone="critical" title="Unable to invite member"><p>{memberActionError}</p></Banner>}
          <TextField label="Name" value={memberName} onChange={setMemberName} autoComplete="name" />
          <TextField label="Email" type="email" value={memberEmail} onChange={setMemberEmail} autoComplete="email" />
          <Select label="Role" options={roleOptions} value={memberRole} onChange={setMemberRole} />
        </FormLayout>
      </AppDrawer>

      {/* Edit Member Drawer */}
      <AppDrawer
        open={Boolean(editMember)}
        onClose={() => {
          if (!memberActionLoading) setEditMember(null);
        }}
        title={`Edit ${editMember?.name || "team member"}`}
        primaryAction={{ content: "Save profile", onAction: updateMemberProfile, loading: memberActionLoading }}
        secondaryActions={[{ content: "Cancel", onAction: () => setEditMember(null), disabled: memberActionLoading }]}
      >
        <FormLayout>
          {memberActionError && <Banner tone="critical" title="Unable to update member" onDismiss={() => setMemberActionError(null)}><p>{memberActionError}</p></Banner>}
          <TextField label="Name" value={memberName} onChange={setMemberName} autoComplete="name" />
          <Select label="Role" options={roleOptions} value={memberRole} onChange={setMemberRole} />
          {memberRole !== editMember?.role && (
            <>
              <Text as="p" tone="subdued">A manager OTP will be sent to the store manager email before changing this role.</Text>
              {editRoleDevOtp && <Banner tone="warning"><p>Development OTP: {editRoleDevOtp}</p></Banner>}
              <TextField label="Manager role-change OTP" value={editRoleOtp} onChange={setEditRoleOtp} inputMode="numeric" maxLength={6} autoComplete="one-time-code" />
            </>
          )}
          <TextField
            label="Current password"
            type={showEditCurrentPassword ? "text" : "password"}
            value={editCurrentPassword}
            onChange={setEditCurrentPassword}
            disabled={editForgotPassword}
            autoComplete="current-password"
            suffix={<Button icon={showEditCurrentPassword ? HideIcon : ViewIcon} variant="tertiary" accessibilityLabel={showEditCurrentPassword ? "Hide password" : "Show password"} onClick={() => setShowEditCurrentPassword((visible) => !visible)} />}
          />
          <TextField
            label="New password"
            type={showEditNewPassword ? "text" : "password"}
            value={editNewPassword}
            onChange={setEditNewPassword}
            autoComplete="new-password"
            suffix={<Button icon={showEditNewPassword ? HideIcon : ViewIcon} variant="tertiary" accessibilityLabel={showEditNewPassword ? "Hide password" : "Show password"} onClick={() => setShowEditNewPassword((visible) => !visible)} />}
          />
          {!editForgotPassword ? (
            <Button variant="plain" onClick={requestMemberPasswordOtp} loading={memberActionLoading}>Forgot current password?</Button>
          ) : (
            <>
              <Text as="p" tone="subdued">A password reset OTP was sent to {editMember?.email}.</Text>
              {editResetDevOtp && <Banner tone="warning"><p>Development OTP: {editResetDevOtp}</p></Banner>}
              <TextField label="Password reset OTP" value={editResetOtp} onChange={setEditResetOtp} inputMode="numeric" maxLength={6} autoComplete="one-time-code" />
              <Button variant="plain" onClick={() => setEditForgotPassword(false)}>Use current password instead</Button>
            </>
          )}
        </FormLayout>
      </AppDrawer>

      <AppDrawer
        open={Boolean(pendingRemoveMember)}
        onClose={() => {
          if (!memberActionLoading) setPendingRemoveMember(null);
        }}
        title="Remove team member"
        primaryAction={{ content: "Continue", onAction: confirmRemoveMember, loading: memberActionLoading }}
        secondaryActions={[{ content: "Cancel", onAction: () => setPendingRemoveMember(null), disabled: memberActionLoading }]}
      >
        <BlockStack gap="300">
          <Text as="p">Remove {pendingRemoveMember?.name} from this store?</Text>
          <Text as="p" tone="subdued">
            {pendingRemoveMember?.role === "MANAGER" || pendingRemoveMember?.role === "ADMIN"
              ? "A verification OTP will be sent to this manager before permanent deletion."
              : "This member will be logged out and permanently deleted."}
          </Text>
        </BlockStack>
      </AppDrawer>

      <AppDrawer
        open={Boolean(deleteMember)}
        onClose={() => {
          if (!memberActionLoading) {
            setDeleteMember(null);
            setDeleteOtp("");
            setDeleteOtpDevValue("");
          }
        }}
        title={`Delete ${deleteMember?.name || "manager"}`}
        primaryAction={{ content: "Verify OTP and delete", onAction: deleteManager, loading: memberActionLoading, disabled: deleteOtp.trim().length !== 6 }}
        secondaryActions={[{ content: "Cancel", onAction: () => setDeleteMember(null), disabled: memberActionLoading }]}
      >
        <FormLayout>
          <Text as="p">A verification OTP was sent to {deleteMember?.email}. This account will be permanently deleted after verification.</Text>
          {deleteOtpDevValue && <Banner tone="warning"><p>Development OTP: {deleteOtpDevValue}</p></Banner>}
          <TextField label="Manager deletion OTP" value={deleteOtp} onChange={setDeleteOtp} inputMode="numeric" maxLength={6} autoComplete="one-time-code" />
        </FormLayout>
      </AppDrawer>
    </Page>
  );
}
