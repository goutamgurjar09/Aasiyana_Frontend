import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../../CommonComponent/ProfileMenu";
import Logo from "../../assets/Image/logo1.jpg";
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



 const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();
const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      showError("Logout failed. Please try again.");
    }
  };
  return (
    <nav
      // className={`fixed top-0 left-0 right-0 z-50 w-full font-serif font-bold px-4 sm:px-8 py-4 transition-all duration-700 ${
      className={`fixed top-0 left-0 right-0 z-50 w-full font-serif font-bold px-4 sm:px-8 py-2 transition-all duration-700 bg-white text-[#005555] shadow-lg ${
        isScrolled
          ? "bg-white shadow-lg text-gray-800"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex items-center justify-between">
        {!isDashboard ? (
          <>
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Company Logo"
                className="w-40 h-17 rounded"
              />
            </div>
            {/* Logo */}

            {/* Mobile Menu Button */}
            <span
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-3xl text-[#005555]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </span>

            {/* Navbar Links */}
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } text-xl no-underline hover:no-underline flex-col md:flex md:flex-row md:items-center absolute md:relative top-full left-20 w-full md:w-auto bg-white md:bg-transparent md:space-x-10 gap-6 md:gap-0 p-6 md:p-0 shadow-md md:shadow-none z-40 rounded-b-xl md:rounded-none`}
            >
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`transition no-underline hover:no-underline ${
                  isScrolled || isMenuOpen ? "text-[#005555]" : "text-[#005555]"
                }`}
              >
                Home
              </Link>

              <Link
                to="/About"
                onClick={() => setIsMenuOpen(false)}
                className={`transition no-underline hover:no-underline ${
                  isScrolled || isMenuOpen ? "text-[#005555]" : "text-[#005555]"
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`transition no-underline hover:no-underline ${
                  isScrolled || isMenuOpen ? "text-[#005555]" : "text-[#005555]"
                }`}
              >
                Contact Us
              </Link>

              {/* Auth Buttons for mobile */}
              <div className="flex flex-col md:hidden gap-3 mt-2">
                {token ? (
                  <ProfileMenu />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className=" bg-[#005555] hover:bg-[#007777] text-white px-3 w-25 py-1 text-sm rounded-md font-medium hover:text-white transition md:px-5 md:py-2 md:text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LogIn
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[#005555] hover:bg-[#007777] w-25 text-white px-3 py-1 text-sm rounded-md font-medium hover:text-white transition md:px-5 md:py-2 md:text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Auth Buttons for desktop */}
            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <ProfileMenu />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-white transition shadow-md hover:bg-[#007777]"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#005555] hover:bg-[#007777] text-white px-5 py-2 rounded-md font-medium hover:text-white transition shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-end w-full">
            <button
              onClick={handleLogout}
              className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition-colors duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
