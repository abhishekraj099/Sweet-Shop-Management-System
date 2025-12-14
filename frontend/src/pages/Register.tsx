// frontend/src/pages/Register.tsx
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role: "user",
      });
      
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="app-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Join Sweet Shop to explore delicious sweets.</p>
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
          <label className="field-label">Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

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

        <div className="field">
          <label className="field-label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button className="btn btn-primary" onClick={handleRegister}>
          Create Account
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "rgba(148, 163, 184, 0.8)",
          }}
        >
          Already have an account?{" "}
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

export default Register;
