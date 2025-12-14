// frontend/src/pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("No reset token provided");
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      setMessage(res.data.message);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="app-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Reset Password</h1>
          <p>Enter your new password below.</p>
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
            <br />
            Redirecting to login...
          </div>
        )}

        <div className="field">
          <label className="field-label">New Password</label>
          <input
            className="input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>

        <div className="field">
          <label className="field-label">Confirm Password</label>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Reset Password
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

export default ResetPassword;
