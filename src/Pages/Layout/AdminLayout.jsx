import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-72" : "md:ml-0"
        } bg-white min-h-screen`}
      >
        {/* Mobile toggle button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="fixed top-4 left-4 z-50 p-2 bg-[#005555] text-white rounded-md shadow-md"
          >
            ☰
          </button>
        )}

        <main className="p-4">
          <Outlet /> {/* This renders the nested route */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
