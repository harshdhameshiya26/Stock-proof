const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For basic inventory checks and small teams.",
    badge: "Current",
    featured: false,
    features: [
      "Up to 3 active audits",
      "Basic discrepancy alerts",
      "Email support",
      "1 workspace",
    ],
  },
  {
    name: "Starter",
    price: "$29",
    description: "For growing stores that need more visibility.",
    badge: "Most popular",
    featured: true,
    features: [
      "Unlimited audits",
      "Priority discrepancy tracking",
      "Advanced approval workflows",
      "Unlimited workspaces",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    description: "For operations teams managing multiple stores.",
    badge: "Scale",
    featured: false,
    features: [
      "Everything in Starter",
      "Multi-store reporting",
      "Custom audit schedules",
      "Dedicated onboarding support",
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div style={{ padding: "32px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#5c6b7a", margin: 0 }}>
            Pricing
          </p>
          <h1 style={{ margin: "8px 0 12px", fontSize: "2.25rem" }}>Choose the plan that fits your workflow</h1>
          <p style={{ margin: 0, color: "#4d5967", maxWidth: "720px" }}>
            Start free, upgrade when you need richer audits, approvals, and reporting for your Shopify operations.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                border: plan.featured ? "2px solid #2e6cff" : "1px solid #dfe3e8",
                borderRadius: "18px",
                background: plan.featured ? "#f4f7ff" : "#fff",
                boxShadow: plan.featured ? "0 10px 25px rgba(46,108,255,0.12)" : "0 4px 12px rgba(15,23,42,0.04)",
                padding: "24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: plan.featured ? "#2e6cff" : "#eef2f7",
                  color: plan.featured ? "#fff" : "#374151",
                  borderRadius: "999px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {plan.badge}
              </div>

              <p style={{ margin: "0 0 12px", color: "#4b5563", fontWeight: 700 }}>{plan.name}</p>
              <div style={{ marginBottom: "12px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>{plan.price}</span>
                <span style={{ color: "#6b7280" }}>{plan.name === "Free" ? "/ forever" : "/ month"}</span>
              </div>
              <p style={{ margin: "0 0 18px", color: "#4d5967", minHeight: "48px" }}>{plan.description}</p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: "10px" }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1f2937" }}>
                    <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "10px",
                  background: plan.featured ? "#2e6cff" : "#111827",
                  color: "#fff",
                  padding: "12px 16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {plan.name === "Free" ? "Get started" : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
