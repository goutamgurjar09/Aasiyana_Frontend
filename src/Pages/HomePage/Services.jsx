import React, { useState } from "react";
import rental from "../../../src/assets/Image/rental.jpg";
import PG from "../../../src/assets/Image/PG.jpg";
import House from "../../../src/assets/Image/House.jpg";
import Hostel from "../../../src/assets/Image/Hostel.jpg";
import plot from "../../../src/assets/Image/plot.jpg";
import { motion } from "framer-motion";

const mustard = "#F4C430"; // Mustard Gold
const black = "#111"; // Black
const gray = "#e5e7eb"; // Light Gray

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
    // <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
    //   {/* Heading */}
    //   <h2 className="text-4xl font-bold text-center text-black font-serif uppercase mb-4 mt-12">
    //     Explore Our Categories
    //   </h2>
    //   <span
    //     className="block w-48 h-[4px] mx-auto rounded-full"
    //     style={{ background: mustard }}
    //   ></span>

    //   <p className="text-center mt-4 text-pink-700">
    //     Choose your perfect living or commercial space with style.
    //   </p>

    //   <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mt-12">
    //     {/* Left Cards */}
    //     <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-[60%] mt-4">
    //       {services.map((service) => {
    //         const isSelected = service.title === selected;
    //         return (
    //           <motion.div
    //             key={service.title}
    //             onClick={() => setSelected(service.title)}
    //             className={`cursor-pointer flex flex-col items-center justify-center rounded-xl p-6 text-center shadow-lg border transition-all duration-300`}
    //             style={{
    //               background: isSelected ? mustard : "#fff",
    //               color: isSelected ? black : "#333",
    //               borderColor: isSelected ? mustard : gray,
    //               transform: isSelected ? "scale(1.06)" : "scale(1)",
    //             }}
    //             whileHover={{
    //               scale: 1.08,
    //               boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    //             }}
    //           >
    //             <div className="mb-3">{service.icon}</div>
    //             <span className="text-lg font-semibold">{service.title}</span>
    //           </motion.div>
    //         );
    //       })}
    //     </div>

    //     {/* Right Preview */}
    //     <div className="w-full lg:w-[40%] relative mt-6 lg:mt-0">
    //       {selectedService && (
    //         <motion.div
    //           key={selectedService.title}
    //           className="p-6 rounded-xl shadow-xl relative z-10"
    //           style={{ color: "#df0202ff" }}
    //           initial={{ opacity: 0, scale: 0.9 }}
    //           animate={{ opacity: 1, scale: 1 }}
    //           transition={{ duration: 0.6 }}
    //         >
    //           <motion.img
    //             src={selectedService.image}
    //             alt={selectedService.title}
    //             className="w-full max-h-64 object-cover rounded-xl mb-6 shadow-lg"
    //             initial={{ opacity: 0, scale: 0.95 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             whileHover={{
    //               scale: 1.05,
    //               boxShadow: "0px 25px 50px rgba(0,0,0,0.5)",
    //             }}
    //           />

    //           <h3 className="text-3xl font-bold text-center mb-2">
    //             {selectedService.title}
    //           </h3>

    //           <p className="text-gray-900 text-center">
    //             Discover premium features in our{" "}
    //             <span className="text-black font-semibold">
    //               {selectedService.title}
    //             </span>{" "}
    //             category.
    //           </p>

    //           {/* floating mustard circle */}
    //           <motion.div
    //             className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full opacity-30"
    //             style={{ background: mustard }}
    //             animate={{ rotate: 360 }}
    //             transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    //           />
    //         </motion.div>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black font-serif uppercase mb-4 mt-12">
        Explore Our Categories
      </h2>

      <span
        className="block w-32 sm:w-40 lg:w-48 h-1 mx-auto rounded-full"
        style={{ background: mustard }}
      ></span>

      <p className="text-center mt-4 text-pink-700 text-sm sm:text-base">
        Choose your perfect living or commercial space with style.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mt-12">
        {/* Left Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 w-full lg:w-[60%] mt-4">
          {services.map((service) => {
            const isSelected = service.title === selected;
            return (
              <motion.div
                key={service.title}
                onClick={() => setSelected(service.title)}
                className="cursor-pointer flex flex-col items-center justify-center rounded-xl p-4 sm:p-6 text-center shadow-lg border transition-all duration-300 w-full"
                style={{
                  background: isSelected ? mustard : "#fff",
                  color: isSelected ? black : "#333",
                  borderColor: isSelected ? mustard : gray,
                  transform: isSelected ? "scale(1.04)" : "scale(1)",
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="mb-3">{service.icon}</div>
                <span className="text-base sm:text-lg font-semibold">
                  {service.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Right Preview */}
        <div className="w-full lg:w-[40%] relative mt-6 lg:mt-0">
          {selectedService && (
            <motion.div
              key={selectedService.title}
              className="p-4 sm:p-6 rounded-xl shadow-xl relative z-10"
              style={{ color: "#df0202ff" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full max-h-52 sm:max-h-64 object-cover rounded-xl mb-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 25px 50px rgba(0,0,0,0.5)",
                }}
              />

              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                {selectedService.title}
              </h3>

              <p className="text-gray-900 text-center text-sm sm:text-base">
                Discover premium features in our{" "}
                <span className="text-black font-semibold">
                  {selectedService.title}
                </span>{" "}
                category.
              </p>

              {/* floating mustard circle */}
              
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;



