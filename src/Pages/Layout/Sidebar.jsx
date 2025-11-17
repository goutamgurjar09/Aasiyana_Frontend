import {
  FaHome,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/authApi";
import { showError } from "../../Alert";
import { useEffect, useState } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role) setRole(storedUser.role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    if (window.innerWidth <= 1024) setSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      showError("Logout failed. Please try again.");
      console.error(err);
    }
  };

  // 👇 Define role-based links
  const menuItems = {
    superAdmin: [
      { icon: <FaHome />, label: "Dashboard", path: "/super/dashboard" },
      { icon: <FaUser />, label: "User Management", path: "/super/users" },
      { icon: <FaChartBar />, label: "Property Management", path: "/super/properties" },
      { icon: <FaCalendarAlt />, label: "Bookings", path: "/super/bookings" },
      { icon: <FaEnvelope />, label: "Enquiries", path: "/super/enquiries" },
    ],
    admin: [
      { icon: <FaHome />, label: "Dashboard", path: "/admin/dashboard" },
      { icon: <FaChartBar />, label: "Property Management", path: "/admin/properties" },
      { icon: <FaCalendarAlt />, label: "Bookings", path: "/admin/bookings" },
      { icon: <FaEnvelope />, label: "Enquiries", path: "/admin/enquiries" },
    ],
    seller: [
      { icon: <FaHome />, label: "Dashboard", path: "/seller/dashboard" },
      { icon: <FaChartBar />, label: "My Properties", path: "/seller/properties" },
      { icon: <FaCalendarAlt />, label: "Bookings", path: "/seller/bookings" },
      { icon: <FaEnvelope />, label: "Enquiries", path: "/seller/enquiries" },
    ],
  };

  const links = menuItems[role] || [];

  return (
    <>
      {/* 🔘 Toggle Button (visible when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 bg-[#005555] text-white p-3 rounded-full shadow-md hover:bg-[#007777]"
        >
          <FaBars />
        </button>
      )}

      {/* 🧱 Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-2xl overflow-y-auto transition-all duration-300 z-40 ${
          sidebarOpen ? "w-72" : "w-0"
        }`}
      >
        {sidebarOpen && (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold">
                {role === "superAdmin"
                  ? "Super Admin"
                  : role === "admin"
                  ? "Admin"
                  : "Seller"}{" "}
                Panel
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-4 gap-1">
              {links.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={isActive(item.path)}
                  onClick={handleNav}
                />
              ))}

              {/* Logout Button */}
              <span
                onClick={handleLogout}
                className="flex items-center cursor-pointer gap-2 p-3 w-full bg-gray-200 rounded hover:bg-gray-300 text-left mt-4"
              >
                <FaSignOutAlt /> Logout
              </span>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

// ✅ Reusable nav item
const NavItem = ({ icon, label, path, isActive, onClick }) => (
  <span
    onClick={() => onClick(path)}
    className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left transition ${
      isActive ? "bg-[#005555] text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    {icon} {label}
  </span>
);

export default Sidebar;



// import { FaHome, FaUser, FaChartBar, FaSignOutAlt, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useLogoutUserMutation } from "../../redux/features/authApi";
// import {showError} from "../../Alert";
// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [logoutUser] = useLogoutUserMutation();

//   const isActive = (path) => location.pathname === path;

//   const handleNav = (path) => {
//     if (window.innerWidth <= 1024) setSidebarOpen(false); // close on mobile
//     navigate(path);
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       localStorage.clear();
//       navigate("/login");
//     } catch (err) {
//       showError("Logout failed. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-gray-100 shadow-2xl overflow-y-auto transition-all duration-300 ${
//         sidebarOpen ? "w-72" : "w-0"
//       }`}
//     >
//       <div className="flex justify-between items-center p-4 border-b">
//         <span className="text-xl font-bold">Admin Dashboard</span>
//       </div>

//       <nav className="flex flex-col p-4 gap-1">
//         <NavItem icon={<FaHome />} label="Dashboard" path="/dashboard" isActive={isActive("/dashboard")} onClick={handleNav} />
//         <NavItem icon={<FaUser />} label="User Management" path="/users" isActive={isActive("/users")} onClick={handleNav} />
//         <NavItem icon={<FaChartBar />} label="Property Management" path="/property-list" isActive={isActive("/property-list")} onClick={handleNav} />
//         <NavItem icon={<FaCalendarAlt />} label="Bookings" path="/bookings" isActive={isActive("/bookings")} onClick={handleNav} />
//         <NavItem icon={<FaEnvelope />} label="Enquiries" path="/enquiries" isActive={isActive("/enquiries")} onClick={handleNav} />

//         <span
//           onClick={handleLogout}
//           className="flex items-center cursor-pointer gap-2 p-3 w-full bg-gray-200 rounded hover:bg-gray-300 text-left mt-4"
//         >
//           <FaSignOutAlt /> Logout
//         </span>
//       </nav>
//     </div>
//   );
// };

// const NavItem = ({ icon, label, path, isActive, onClick }) => (
//   <span
//     onClick={() => onClick(path)}
//     className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left transition ${
//       isActive ? "bg-[#005555] text-white" : "bg-gray-200 hover:bg-gray-300"
//     }`}
//   >
//     {icon} {label}
//   </span>
// );

// export default Sidebar;
