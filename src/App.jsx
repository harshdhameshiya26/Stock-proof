import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Dashboard from "./pages/dashboard";
import ActiveAudit from "./pages/activeAudit";
import Discrepancies from "./pages/discrepancies";
import Approvals from "./pages/approvals";
import AuditHistory from "./pages/AuditHistory";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Dashboard />} />
                    <Route path="activeAudit" element={<ActiveAudit />} />
                    <Route path="discrepancies" element={<Discrepancies />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="auditHistory" element={<AuditHistory />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}