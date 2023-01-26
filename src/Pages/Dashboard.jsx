import React, { useEffect } from "react";
import LayoutDashboard from "../Components/layoutDashboard";

export default function Dashboard() {

  useEffect(() => {
    document.title = 'Dashboard - Macca Education';
  }, []);
  return(
    <LayoutDashboard>
    </LayoutDashboard>
  );
}
