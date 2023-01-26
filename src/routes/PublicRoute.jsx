import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Login from "../Pages/Auth/Login";
import { userAtom } from "../store/user-atom";
import jwt_decode from "jwt-decode";
import Index from "../Pages/Home/Index";

export default function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<GuestProtected component={Login} />} />
    </Routes>
  );
}

function GuestProtected({ component: Component }) {
  const navigate = useNavigate();
  let [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (cookies.token) {
      try {
        let payload = jwt_decode(cookies.token);
        setUser(payload);
      } catch (error) {
        setUser(null);
      }
    }
  }, [cookies]);
  if (user) navigate("/dashboard", { replace: true });
  return <Component />;
}
