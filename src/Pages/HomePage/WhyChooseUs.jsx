
import React from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHandshake,
  FaUsersCog,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";

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
    <div className="bg-gray-100 py-16 px-6 md:px-16 mt-4">
      <h2 className="text-4xl font-bold text-center text-[#005555] mb-10 relative font-serif uppercase">
        Why Choose Us
        <span className="block w-44 h-[3px] bg-[#005555] mt-2 mx-auto"></span>
      </h2>

      <div className="flex flex-col gap-6 items-center mt-5">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: item.position === "right" ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`relative overflow-hidden w-full max-w-2xl flex flex-col md:flex-row items-center p-6 rounded-[14px] shadow-lg transition-all duration-500 bg-[#f9fafb] text-[#0f2c53] group transform hover:-translate-y-2 ${
              item.position === "right"
                ? "md:self-end md:mr-10"
                : "md:self-start md:ml-10"
            }`}
          >
            {/* Hover background layer */}
            <div className="absolute inset-0 bg-[#005555] z-0 scale-x-0 origin-bottom-right group-hover:scale-x-100 transition-transform duration-500 ease-in-out rounded-[14px] group-hover:origin-bottom-left"></div>

            {/* Icon */}
            <div className="z-20 mb-4 md:mb-0 md:mr-6 relative">
              <div className="w-14 h-14 rounded-full bg-[#055555] flex items-center justify-center text-white text-2xl z-20 relative shadow-md">
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
