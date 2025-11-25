import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../../SuperAdmin/SuperAdminNavbar";

const AdminLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (TOP + Always in front of navbar) */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Navbar (Behind sidebar) */}
      <div className="fixed top-0 left-0 w-full">
        <SuperAdminNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
     

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 bg-white min-h-screen py-16
          ${sidebarOpen ? "ml-72" : "ml-0"}
        `}
      >
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
