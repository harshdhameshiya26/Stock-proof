import { useState } from "react";

const apiBaseUrl = () =>
  import.meta.env.VITE_API_BASE_URL || "/api";

async function request(endpoint, body) {
  const response = await fetch(`${apiBaseUrl()}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export default function MemberLogin() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitCredentials = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (mode === "activate" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await request(mode === "activate" ? "/users/activate" : "/users/login", {
        email,
        password,
      });
      setDevOtp(response.devOtp || "");
      setMessage(response.message);
      setStep("otp");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "activate" ? "/users/activate/verify-otp" : "/users/login/verify-otp";
      const response = await request(endpoint, { email, otp });
      localStorage.setItem("stockproof_member_token", response.token);
      setMessage(`${response.message} You can now return to StockProof.`);
      setStep("complete");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStep("credentials");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setMessage("");
    setError("");
    setDevOtp("");
  };

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <p style={styles.eyebrow}>StockProof team access</p>
        <h1 style={styles.heading}>{mode === "activate" ? "Activate your account" : "Member login"}</h1>
        <p style={styles.subheading}>
          {mode === "activate"
            ? "Set your password using the invitation sent by your store manager."
            : "Sign in with your email and password, then confirm the OTP sent to your email."}
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        {devOtp && <p style={styles.devOtp}>Development OTP: {devOtp}</p>}

        {step === "credentials" && (
          <form onSubmit={submitCredentials} style={styles.form}>
            <label style={styles.label}>
              Email address
              <input style={styles.input} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label style={styles.label}>
              {mode === "activate" ? "Create password" : "Password"}
              <input style={styles.input} type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />
            </label>
            {mode === "activate" && (
              <label style={styles.label}>
                Confirm password
                <input style={styles.input} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} required />
              </label>
            )}
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Please wait..." : mode === "activate" ? "Send activation OTP" : "Send login OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={submitOtp} style={styles.form}>
            <label style={styles.label}>
              Six-digit OTP
              <input style={styles.input} inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value)} required />
            </label>
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button style={styles.secondaryButton} type="button" onClick={() => setStep("credentials")} disabled={loading}>
              Back
            </button>
          </form>
        )}

        {step === "complete" && (
          <button style={styles.button} type="button" onClick={() => switchMode("login")}>Continue</button>
        )}

        <div style={styles.switcher}>
          {mode === "activate" ? "Already activated?" : "Received an invitation?"}{" "}
          <button type="button" style={styles.link} onClick={() => switchMode(mode === "activate" ? "login" : "activate")}>
            {mode === "activate" ? "Log in" : "Activate account"}
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#f3f5f4", padding: "24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  panel: { width: "min(100%, 440px)", background: "#fff", border: "1px solid #d8dedb", borderRadius: "12px", padding: "32px", boxShadow: "0 12px 30px rgba(20, 55, 43, 0.08)" },
  eyebrow: { margin: "0 0 8px", color: "#087f5b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" },
  heading: { margin: "0", color: "#17352b", fontSize: "30px" },
  subheading: { color: "#61716b", lineHeight: 1.5, margin: "10px 0 24px" },
  form: { display: "grid", gap: "16px" },
  label: { display: "grid", gap: "7px", color: "#30443c", fontSize: "14px", fontWeight: 600 },
  input: { boxSizing: "border-box", width: "100%", border: "1px solid #aebbb5", borderRadius: "7px", padding: "11px 12px", fontSize: "16px" },
  button: { border: 0, borderRadius: "7px", padding: "12px 16px", background: "#087f5b", color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer" },
  secondaryButton: { border: "1px solid #aebbb5", borderRadius: "7px", padding: "11px 16px", background: "white", color: "#30443c", fontSize: "15px", cursor: "pointer" },
  switcher: { marginTop: "22px", color: "#61716b", fontSize: "14px", textAlign: "center" },
  link: { border: 0, background: "transparent", color: "#087f5b", cursor: "pointer", fontWeight: 700 },
  error: { background: "#fff0f0", color: "#a61b1b", borderRadius: "6px", padding: "10px 12px", fontSize: "14px" },
  success: { background: "#e7f7f0", color: "#126b4f", borderRadius: "6px", padding: "10px 12px", fontSize: "14px" },
  devOtp: { background: "#fff8e1", color: "#765b00", borderRadius: "6px", padding: "10px 12px", fontSize: "14px" },
};