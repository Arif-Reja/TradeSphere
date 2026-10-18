
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3002/auth/signup",
        {
          fullName,
          email,
          password,
        }
      );

      setMessage(response.data.message);

     
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row align-items-center">
        {/* Left Image - Existing Design */}
        <div className="col-md-6 col-12 text-center">
          <img
            src="media/images/signup.png"
            alt="Signup"
            style={{ width: "80%" }}
          />
        </div>

        {/* Right Section - Real Signup Form */}
        <div className="col-md-6 col-12 p-md-5 py-4">
          <h1 className="fs-2 mb-4">Sign up</h1>

          <p className="text-muted">
            Create your account to access your trading dashboard.
          </p>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
              <small className="text-muted">
                Password must contain at least 8 characters.
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary p-2 px-4 mt-3"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {message && (
            <p className="text-success mt-3">{message}</p>
          )}

          {error && (
            <p className="text-danger mt-3">{error}</p>
          )}

          <p className="text-muted small mt-4">
            By proceeding, you agree to the terms and conditions.
          </p>

          <p className="mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;