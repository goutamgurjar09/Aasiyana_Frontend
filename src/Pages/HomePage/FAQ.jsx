import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo) {
    const element = document.getElementById(location.state.scrollTo);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // small delay for UI to load
    }
  }
}, [location]);
  
  const faqs = [
    {
      question: "What are the key features of this property?",
      answer:
        "Our properties offer modern amenities, spacious layouts, prime locations, and high-end security features.",
      bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
    },
    {
      question: "Is financing available for property purchases?",
      answer:
        "Yes, we offer financing options through our partnered banks with flexible payment plans.",
      bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
    },
    {
      question: "Are there any maintenance charges for the property?",
      answer:
        "Yes, maintenance charges apply based on property size and facilities. Please check with our support team for exact details.",
      bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
    },
    {
      question: "Can I schedule a site visit before making a purchase?",
      answer:
        "Absolutely! You can book a site visit at your convenience. Our team will guide you through the property tour.",
      bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
    },
    {
      question: "What documents are required for property registration?",
      answer:
        "You'll need identity proof, address proof, PAN card, and bank details for a smooth registration process.",
      bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-12 px-6 sm:px-12"
    id="FAQSection">
      <div className="max-w-7xl mx-auto w-full uppercase">
       
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold text-center text-black font-serif mb-12 relative">
            Frequently Asked Questions
            <span className="block w-96 h-1 bg-amber-400 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`shadow-md rounded-xl overflow-hidden transition-all duration-300 ${faq.bgColor}`}
            >
              <div
                className="w-full text-left p-6  bg-[white]  text-black font-semibold focus:outline-none transition-colors duration-300"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {activeIndex === index && (
                <div className="p-6 text-black bg-white border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
