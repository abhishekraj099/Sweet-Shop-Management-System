// frontend/src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate, Link } from "react-router-dom";

interface LoginProps {
  onLogin: (token: string, user: any) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      onLogin(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="app-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Sweet Shop</h1>
          <p>Sign in to manage sweets, inventory and purchases.</p>
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

        <div className="field">
          <label className="field-label">Email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abhisraj099@gmail.com"
          />
        </div>

        <div className="field">
          <label className="field-label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "rgba(148, 163, 184, 0.8)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#f97316",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
