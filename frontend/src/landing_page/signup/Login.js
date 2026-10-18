
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://trade-sphere-gwxh.vercel.app/auth/login",
        { email, password }
      );

      const { token, user } = response.data;

      if (!token) {
        throw new Error(
          "Login succeeded but no authentication token was returned."
        );
      }

     
      window.location.href =
        `https://trade-sphere-13d5.vercel.app/?token=${encodeURIComponent(token)}&user=${encodeURIComponent(
          JSON.stringify(user || {})
        )}`;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="fs-2 mb-4">Log in</h1>

          <p className="text-muted">
            Log in to access your trading dashboard.
          </p>

          <form onSubmit={handleLogin}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary p-2 px-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {error && (
            <p className="text-danger mt-3">{error}</p>
          )}

          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
