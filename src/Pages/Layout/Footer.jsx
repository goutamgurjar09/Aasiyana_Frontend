
import { Link } from "react-router-dom";
import { FaFilm, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import logo from "../../assets/Image/logo.png";

const Footer = () => {
   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };
  return (
    <footer className="relative text-white bg-[#1d1d1d] py-10 px-4 sm:px-8 bg-cover ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl font-serif mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <div className="flex text-start mr-10 text-xl font-bold">
            <div className="backdrop-blur-md p-2 rounded-xl ml-[-42px]">
              <img
                src={logo}
                alt="logo"
                className="w-40 h-20 object-contain drop-shadow-md"
              />
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed">
            We are a platform providing high-quality content across various
            genres, helping you discover the best movies, shows, and more.
          </p>
          <button className="mt-4 bg-amber-400 hover:bg-amber-500 text-pink-700 font-bold px-4 py-2 rounded-lg transition cursor-pointer text-sm">
            Learn More
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/About" },
              { name: "Terms & Conditions", path: "/terms-conditions" },
              { name: "Privacy & Policy", path: "/privacy-policy" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.path}
                  className="text-white hover:text-white transition cursor-pointer relative inline-block"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Rent", path: "/" },
              { name: "Buyers", path: "/properties" },
              { name: "Tenants", path: "/properties" },
              { name: "Dealers", path: "/properties" },
              { name: "Owners", path: "/" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.path}
                  className="text-white hover:text-white transition cursor-pointer relative inline-block"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-white text-sm">info@example.com</p>
          <p className="text-white text-sm mt-1">
            123 Main St, City, Country <br /> +1 234 567 890
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-10 border-t border-gray-400 pt-5 text-center text-white text-xs sm:text-sm">
        <p>© 2025 PropertyDeal. All rights reserved.</p>
      </div>

      {/* 🔥 Left Bottom - Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 left-5 bg-amber-400 hover:bg-amber-500 text-pink-700 p-3 rounded-full shadow-lg transition z-50"
      >
        <FaArrowUp size={18} />
      </button>

      {/* 🔥 Right Bottom - WhatsApp Button */}
      {/* Right Bottom - WhatsApp Button (Icon + Yellow Text Below) */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center gap-2 z-50">
        {/* WhatsApp Icon (Green Circle) */}
        <a
          href="https://wa.me/918888888888"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
        >
          <FaWhatsapp size={25} />
        </a>

        {/* Chat With Us (Yellow Box) */}
        <a
          href="https://wa.me/918888888888"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold shadow-md"
        >
          Chat With Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
