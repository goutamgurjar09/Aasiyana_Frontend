import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Get role + real name from localStorage
  const role = localStorage.getItem("role") || "admin";
  const name = localStorage.getItem("name") || "User";

  // Role-based Title
  const panelTitle =
    role === "superadmin" ? "Super Admin Panel" : "Admin Panel";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-2xl font-bold text-gray-700 md:hidden"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold text-black ml-10">{panelTitle}</h1>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
          <span className="font-semibold">{name}</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 border">
            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Setting
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
