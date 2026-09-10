import { useEffect, useRef } from "react";
import { Button, Text, InlineStack } from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";

/**
 * AppDrawer — A right-side slide-in drawer that replaces Polaris Modal.
 *
 * Props:
 *  open          {boolean}   — controls visibility
 *  onClose       {function}  — called when the user closes the drawer
 *  title         {string}    — drawer header title
 *  primaryAction {object}    — { content, onAction, disabled, loading, tone }
 *  secondaryActions {array}  — [{ content, onAction, disabled }]
 *  children      {node}      — drawer body content
 *  width         {string}    — CSS width, default "480px"
 */
export default function AppDrawer({
  open,
  onClose,
  title,
  primaryAction,
  secondaryActions = [],
  children,
  width = "480px",
}) {
  const drawerRef = useRef(null);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Overlay ─────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 519,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.25s ease",
        }}
        aria-hidden="true"
      />

      {/* ── Drawer panel ────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width,
          maxWidth: "100vw",
          background: "#fff",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
          zIndex: 520,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "12px 0 0 12px",
        }}
      >
        {/* ── Header ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #e1e3e5",
            flexShrink: 0,
            background: "#fafbfb",
            borderRadius: "12px 0 0 0",
          }}
        >
          <Text as="h2" variant="headingMd" fontWeight="bold">
            {title}
          </Text>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6d7175",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f2f3")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            {/* X icon rendered as SVG inline to avoid Polaris Icon wrapper sizing issues */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10z" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
          }}
        >
          {children}
        </div>

        {/* ── Footer actions ──────────────────────────── */}
        {(primaryAction || secondaryActions.length > 0) && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e1e3e5",
              background: "#fafbfb",
              flexShrink: 0,
              borderRadius: "0 0 0 12px",
            }}
          >
            <InlineStack gap="300" align="end">
              {secondaryActions.map((action, idx) => (
                <Button
                  key={idx}
                  onClick={action.onAction}
                  disabled={action.disabled}
                >
                  {action.content}
                </Button>
              ))}
              {primaryAction && (
                <Button
                  variant="primary"
                  tone={primaryAction.tone}
                  onClick={primaryAction.onAction}
                  disabled={primaryAction.disabled}
                  loading={primaryAction.loading}
                >
                  {primaryAction.content}
                </Button>
              )}
            </InlineStack>
          </div>
        )}
      </div>
    </>
  );
}
