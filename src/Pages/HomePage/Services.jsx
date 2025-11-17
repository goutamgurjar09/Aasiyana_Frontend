import React, { useState } from "react";
import rental from "../../../src/assets/Image/rental.jpg";
import PG from "../../../src/assets/Image/PG.jpg";
import House from "../../../src/assets/Image/House.jpg";
import Hostel from "../../../src/assets/Image/Hostel.jpg";
import plot from "../../../src/assets/Image/plot.jpg";
import { motion } from "framer-motion";

const services = [
  {
    title: "Commercial",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    image: House,
  },
  {
    title: "Rental",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M3 7h18M6 7v10m12-10v10M9 17v4h6v-4" />
      </svg>
    ),
    image: rental,
  },
  {
    title: "PG",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M4 10h16M4 14h16M10 6v12" />
      </svg>
    ),
    image: PG,
  },
  {
    title: "Hostel",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    image: Hostel,
  },
  {
    title: "House",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M4 12l8-8 8 8M4 12v8h16v-8" />
      </svg>
    ),
    image: House,
  },
  {
    title: "Plot",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="8" width="18" height="10" rx="2" />
        <path d="M7 8V6h10v2" />
      </svg>
    ),
    image: plot,
  },
];

const Services = () => {
  const [selected, setSelected] = useState("Rental");
  const selectedService = services.find(
    (service) => service.title === selected
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 bg-white">
      <h2 className="text-4xl font-bold text-center text-[#005555] font-serif uppercase mb-5 mt-12">
        Explore Our Categories
      </h2>
      <span className="block w-96 h-[3px] bg-[#005555] mt-2 mx-auto"></span>
      <p className="text-center mt-4">
        Find the perfect space from our wide range of handpicked property
        categories designed to suit every lifestyle and budget.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mt-12">
        {/* Left: Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-[60%] mt-8">
          {services.map((service) => {
            const isSelected = service.title === selected;
            return (
              <div
                key={service.title}
                onClick={() => setSelected(service.title)}
                className={`cursor-pointer flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all duration-300 border transform hover:scale-105 ${
                  isSelected
                    ? "bg-[#005555] text-white border-[#005555] "
                    : "bg-white text-[#005555] hover:shadow-lg"
                }`}
              >
                <div className="mb-3 transition-transform duration-200 hover:scale-110">
                  {service.icon}
                </div>
                <span className="text-lg font-semibold">{service.title}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Preview */}
        <div className="w-full lg:w-[40%] relative mt-8 lg:mt-0">
          {selectedService && (
            <motion.div
              key={selectedService.title}
              className="bg-white p-6 rounded-xl shadow-2xl overflow-hidden relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full max-h-64 object-cover rounded-xl mb-6 shadow-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 20px 50px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              <motion.h3
                className="text-2xl font-bold text-[#004444] mb-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {selectedService.title}
              </motion.h3>

              <motion.p
                className="text-black text-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover top features and offerings for our{" "}
                <strong>{selectedService.title}</strong> spaces.
              </motion.p>

              <motion.div
                className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-[#e0f7f7] rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;



