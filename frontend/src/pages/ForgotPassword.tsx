// frontend/src/pages/ForgotPassword.tsx
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    setResetToken("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email,
      });

      setMessage(res.data.message);
      
      // For testing only - remove in production
      if (res.data.resetToken) {
        setResetToken(res.data.resetToken);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="app-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Forgot Password</h1>
          <p>Enter your email to receive a password reset link.</p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              color: "#ef4444",
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              color: "#22c55e",
            }}
          >
            {message}
          </div>
        )}

        {resetToken && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "8px",
              color: "#3b82f6",
              fontSize: "14px",
            }}
          >
            <strong>Testing Mode:</strong> Your reset token is:<br />
            <code style={{ wordBreak: "break-all" }}>{resetToken}</code>
            <br />
            <Link
              to={`/reset-password?token=${resetToken}`}
              style={{ color: "#3b82f6", textDecoration: "underline" }}
            >
              Click here to reset password
            </Link>
          </div>
        )}

        <div className="field">
          <label className="field-label">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Send Reset Link
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "rgba(148, 163, 184, 0.8)",
          }}
        >
          Remember your password?{" "}
          <Link
            to="/login"
            style={{
              color: "#f97316",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
