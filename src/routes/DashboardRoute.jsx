import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Dashboard from "../Pages/Dashboard";
import { userAtom } from "../store/user-atom";
import jwt_decode from "jwt-decode";
import ErrorPage from "../Pages/errors/error-page";
import Users from "../Pages/Users";
import Classes from "../Pages/Classes";
import Questions from "../Pages/Questions";
import Courses from "../Pages/Courses";
import Schedulers from "../Pages/Schedulers";

export default function DashboardRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedRoute role="admin" component={Dashboard} />} />
      <Route path="/users" element={<ProtectedRoute role="admin" component={Users} />} />
      <Route path="/class" element={<ProtectedRoute role="admin" component={Classes} />} />
      <Route path="/courses" element={<ProtectedRoute role="admin" component={Courses} />} />
      <Route path="/questions" element={<ProtectedRoute role="admin" component={Questions} />} />
      <Route path="/schedulers" element={<ProtectedRoute role="admin" component={Schedulers} />} />
    </Routes>
  );
}

function ProtectedRoute({ component: Component, role = "admin" }) {
  let navigate = useNavigate();
  let [user, setUser] = useRecoilState(userAtom);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!cookies.token) navigate("/login", { replace: true });
    try {
      let payload = jwt_decode(cookies.token);
      setUser(payload);
    } catch (error) {
      removeCookie("token");
      setUser(null);
    }
    setLoading(false);
  }, [cookies]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!user) navigate("/login", { replace: true });

  if (role != user.role) return <ErrorPage code={403} message={`Maaf anda tidak di izinkan untuk role ${role}`} />;
  return <Component user={user} restOfProps />;
}
