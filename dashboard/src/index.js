
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

const params = new URLSearchParams(window.location.search);
const tokenFromUrl = params.get("token");
const userFromUrl = params.get("user");


if (tokenFromUrl) {
  localStorage.setItem("token", tokenFromUrl);
}

if (userFromUrl) {
  localStorage.setItem("user", userFromUrl);
}

if (tokenFromUrl || userFromUrl) {
  params.delete("token");
  params.delete("user");

  const remainingQuery = params.toString();

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname +
      (remainingQuery ? `?${remainingQuery}` : "") +
      window.location.hash
  );
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
