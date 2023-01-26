import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import { CookiesProvider } from "react-cookie";
import DashboardRoute from "./routes/DashboardRoute";

export default function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://149.102.136.93:3001";
  return (
    <CookiesProvider>
      <PublicRoute />
      <DashboardRoute />
    </CookiesProvider>
  );
}
