import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useLogoutUserMutation, useGetUserByIdQuery } from "../redux/features/authApi";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  // Get logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  // Fetch fresh user data using RTK Query
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("user"); // Clear localStorage
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const goToProfile = () => {
    setOpen(false);
    navigate(user?.role === "buyer" ? "/buyer-profile" : "/admin/profile");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <span
        onClick={toggleMenu}
        className="flex items-center gap-2 text-gray-800 font-medium hover:text-black cursor-pointer"
      >
        <span className="text-black font-bold">Welcome,</span>
        <span>{user?.fullname ? `${user.fullname.charAt(0).toUpperCase() + user.fullname.slice(1)}` : "User"}</span>
        {user?.profileImg ? (
          <img src={user.profileImg} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
            {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <FaChevronDown className="text-xs" />
      </span>

      {open && (
        <div className="absolute right-0 mt-4 border-gray-500 w-40 bg-white rounded shadow-lg z-50">
          <button
            onClick={goToProfile}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left text-sm"
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left text-sm text-pink-600"
            disabled={logoutLoading}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
