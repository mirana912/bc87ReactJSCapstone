import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

import ClientPage from "./pages/client/index";
import AdminPage from "./pages/admin/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/client/*" element={<ClientPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
);
