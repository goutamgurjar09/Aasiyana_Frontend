import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../../CommonComponent/ProfileMenu";
import Logo from "../../assets/Image/logo.png";
import { useLogoutUserMutation } from "../../redux/features/authApi";
import { showError } from "../../Alert";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const token = null;
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      showError("Logout failed. Please try again.");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6  transition-all duration-500 
  ${isScrolled ? "bg-[#111] shadow-lg" : "bg-[#111]"} 
  text-white`}
    >
      <div className="max-w-[95%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-30 rounded relative -top-1 drop-shadow-lg"
          />
        </div>
        </Link>

        {/* Mobile Menu Button */}
        <span
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-3xl cursor-pointer text-white"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </span>

        {/* Links Container */}
        {!isDashboard && (
          <div
            className={`${isMenuOpen ? "flex" : "hidden"} 
            md:flex flex-col md:flex-row items-center 
            absolute md:relative top-full md:top-0 left-0 md:left-0 w-full md:w-auto
            bg-[#111] md:bg-transparent p-6 md:p-0 rounded-b-xl md:rounded-none 
            gap-6 md:gap-12 text-lg font-medium`}
          >
            {/* Rounded navbar middle menu */}
            <div className="hidden md:flex bg-[#1d1d1d] px-12 py-3 rounded-full shadow-lg items-center gap-12">
              <Link
                to="/"
                className="text-[#f1f1f1] hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/About"
                className="text-[#f1f1f1] hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                className="text-[#f1f1f1] hover:text-amber-400"
                to="/"
                state={{ scrollTo: "FAQSection" }}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              <Link
                to="/contact"
                className="text-[#f1f1f1] hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
             
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col md:hidden gap-4">
              <Link
                className="text-[#f1f1f1] hover:text-amber-400"
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-[#f1f1f1] hover:text-amber-400"
                to="/About"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
             
              <Link
                className="text-[#f1f1f1] hover:text-amber-400"
                to="/"
                state={{ scrollTo: "FAQSection" }}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              <Link
                className="text-[#f1f1f1] hover:text-amber-400"
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {!token && (
                <>
                  <Link
                    to="/login"
                    className="bg-amber-400 hover:bg-amber-500 text-pink-700 text-center py-2 rounded-md transition font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LogIn
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-amber-400 hover:bg-amber-500 text-pink-700 text-center py-2 rounded-md transition font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Desktop Buttons */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-linear-to-r from-orange-500 to-yellow-500 text-black rounded-full font-semibold shadow-md hover:brightness-90 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-amber-400 text-pink-700 font-bold shadow-md 
                hover:bg-amber-500 transition" // 👈 Login hover dark
              >
                Login
              </Link>
            )}
          </div>
        )}

        {/* Dashboard Logout */}
        {isDashboard && (
          <button
            onClick={handleLogout}
            className="bg-amber-400  text-pink-700 px-5 py-2 rounded-md font-bold shadow-md hover:bg-amber-500 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
