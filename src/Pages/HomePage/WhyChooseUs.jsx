// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaHome,
//   FaHandshake,
//   FaUsersCog,
//   FaHeadset,
//   FaChartLine,
// } from "react-icons/fa";

// const mustard = "#F4C430"; // Mustard gold
// const dark = "#111"; // Black
// const gray = "#f1f1f1"; // Soft gray

// const features = [
//   {
//     icon: <FaHome />,
//     title: "Wide Property Options",
//     desc: "Choose from thousands of verified properties for sale and rent across premium locations.",
//     position: "left",
//   },
//   {
//     icon: <FaHandshake />,
//     title: "Trusted Deals",
//     desc: "We ensure transparency and trust in every deal with zero hidden charges or false listings.",
//     position: "right",
//   },
//   {
//     icon: <FaUsersCog />,
//     title: "Expert Guidance",
//     desc: "Our real estate experts guide you throughout the buying or renting process hassle-free.",
//     position: "left",
//   },
//   {
//     icon: <FaHeadset />,
//     title: "24/7 Support",
//     desc: "Our customer support team is always available to answer your questions and provide instant help.",
//     position: "right",
//   },
//   {
//     icon: <FaChartLine />,
//     title: "Smart Investment Insights",
//     desc: "Get real-time property trends and insights to make profitable investment decisions.",
//     position: "left",
//   },
// ];

// const WhyChooseUs = () => {
//   return (
//     <div className="py-16 px-6 md:px-16 mt-4" style={{ background: gray }}>
//       {/* Title */}
//       <h2 className="text-4xl font-bold text-center font-serif uppercase mb-6 text-black">
//         Why Choose Us
//       </h2>
//       <span
//         className="block w-56 h-1 mx-auto rounded-full mb-10"
//         style={{ background: mustard }}
//       ></span>

//       <div className="flex flex-col gap-8 mt-5">
//         {features.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{
//               opacity: 0,
//               x: item.position === "right" ? 120 : -120,
//             }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className={`relative overflow-hidden w-full max-w-3xl flex flex-col md:flex-row items-center p-6 rounded-[14px] shadow-lg transition-all duration-500 bg-white text-black group hover:-translate-y-2 border
//             ${item.position === "right" ? "md:self-end" : "md:self-start"}
//             `}
//             style={{ borderColor: "#d1d1d1" }}
//           >
//             {/* Mustard Hover Layer */}
//             <div
//               className="absolute inset-0 z-0 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 rounded-[14px]"
//               style={{ background: mustard }}
//             ></div>

//             {/* Icon Circle */}
//             <div className="z-20 mb-4 md:mb-0 md:mr-6 relative">
//               <div
//                 className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md"
//                 style={{ background: dark, color: "white" }}
//               >
//                 {item.icon}
//               </div>
//             </div>

//             {/* Text Section */}
//             <div className="text-center md:text-left z-20 group-hover:text-white transition-colors duration-300">
//               <h5 className="text-xl font-bold mb-1">{item.title}</h5>
//               <p className="text-sm leading-relaxed">{item.desc}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;










import React from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHandshake,
  FaUsersCog,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";

const mustard = "#F4C430";
const dark = "#111";
const gray = "#f1f1f1";

const features = [
  {
    icon: <FaHome />,
    title: "Wide Property Options",
    desc: "Choose from thousands of verified properties for sale and rent across premium locations.",
    position: "left",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Deals",
    desc: "We ensure transparency and trust in every deal with zero hidden charges or false listings.",
    position: "right",
  },
  {
    icon: <FaUsersCog />,
    title: "Expert Guidance",
    desc: "Our real estate experts guide you throughout the buying or renting process hassle-free.",
    position: "left",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Our customer support team is always available to answer your questions and provide instant help.",
    position: "right",
  },
  {
    icon: <FaChartLine />,
    title: "Smart Investment Insights",
    desc: "Get real-time property trends and insights to make profitable investment decisions.",
    position: "left",
  },
];

const WhyChooseUs = () => {
  return (
    <div
      className="py-16 px-6 sm:px-10 md:px-16 mt-4 w-full"
      style={{ background: gray }}
    >
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center font-serif uppercase mb-4 text-black">
        Why Choose Us
      </h2>
      <span
        className="block w-40 sm:w-56 h-1 mx-auto rounded-full mb-10"
        style={{ background: mustard }}
      ></span>

      <div className="flex flex-col gap-8 mt-5 items-center">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: item.position === "right" ? 120 : -120,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex flex-col md:flex-row items-center p-6 rounded-[14px] shadow-lg bg-white text-black group hover:-translate-y-2 border transition-all duration-500
            ${item.position === "right" ? "md:self-end" : "md:self-start"}
            `}
            style={{ borderColor: "#d1d1d1" }}
          >
            {/* Mustard Hover Layer */}
            <div
              className="absolute inset-0 z-0 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 rounded-[14px]"
              style={{ background: mustard }}
            ></div>

            {/* Icon */}
            <div className="z-20 mb-4 md:mb-0 md:mr-6 relative">
              <div
                className="w-14 h-14 rounded-full flex items-center bg-pink-700 text-white justify-center text-2xl shadow-md"
               
              >
                {item.icon}
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left z-20 group-hover:text-white transition-colors duration-300">
              <h5 className="text-xl font-bold mb-1">{item.title}</h5>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
