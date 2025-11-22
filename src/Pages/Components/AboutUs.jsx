import React from "react";
import about from "../../assets/video/aboutUs.mp4";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserTie,
  FaShieldAlt,
  FaHandshake,
  FaMapMarkedAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function AboutUs() {
  return (
    <div className="bg-white mt-12  font-serif">
      <div className="bg-white mt-6 font-serif">
        <div className=" bg-gray-50 rounded-3xl shadow-xl p-8 sm:p-16">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl mt-4 font-serif font-bold text-center text-black mb-6 sm:mb-8 relative">
            About Us
            <span className="block w-20 sm:w-32 md:w-40 h-1 bg-amber-400 mt-3 sm:mt-4 mx-auto rounded-full"></span>
          </h2>

          {/* Intro Text */}
          <p className="text-center text-pink-700 text-base sm:text-lg mb-6 sm:mb-10 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto px-4">
            We are a dedicated real estate company committed to providing
            seamless property experiences. Whether you're buying, selling, or
            renting, we connect you with the best options that suit your needs,
            budget, and aspirations.
          </p>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-2 items-center gap-12 mb-16">
            {/* Text */}
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <FaHome className="text-4xl text-green-500 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-amber-500">
                    Premium Properties
                  </h3>
                  <p className="text-black mt-2">
                    From modern apartments to luxury villas, we list properties
                    located in top neighborhoods across the region.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <FaUserTie className="text-4xl text-blue-500 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-amber-500">
                    Expert Agents
                  </h3>
                  <p className="text-black mt-2">
                    Our team of licensed professionals has years of experience
                    and in-depth market knowledge.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <FaShieldAlt className="text-4xl text-red-400 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-amber-500">
                    Secure & Transparent Deals
                  </h3>
                  <p className="text-black mt-2">
                    We ensure legally vetted documentation and secure payment
                    methods for your peace of mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <video
              src={about}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-96 object-cover rounded-xl shadow-xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Mission & Vision */}
          <div className="p-8 rounded-xl shadow-inner mb-16">
            <h3 className="text-3xl font-semibold text-black mb-6">
              Our Mission & Vision
            </h3>
            <p className="text-black text-md leading-loose">
              Our mission is to simplify property transactions with
              professionalism, transparency, and value. We envision becoming the
              most trusted platform for real estate in the region — empowering
              people to find homes and investments they love.
            </p>
          </div>

          {/* How We Work */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-black mb-10 text-center  ">
              How We Work
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-[#e7e7e7] rounded-xl shadow-md hover:shadow-lg transition-all">
                <FaMapMarkedAlt className="text-4xl text-amber-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Discover Properties</h4>
                <p className="text-black">
                  Browse listings with detailed insights, photos, and amenities
                  in just a few clicks.
                </p>
              </div>
              <div className="p-6 bg-[#e7e7e7] rounded-xl shadow-md hover:shadow-lg transition-all">
                <FaHandshake className="text-4xl text-amber-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Schedule a Visit</h4>
                <p className="text-black">
                  Book site visits with our agents and explore properties before
                  making a decision.
                </p>
              </div>
              <div className="p-6 bg-[#e7e7e7] rounded-xl shadow-md hover:shadow-lg transition-all">
                <FaPhoneAlt className="text-4xl text-amber-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Get Expert Advice</h4>
                <p className="text-black">
                  Consult with our team for legal help, valuation, and deal
                  closure assistance.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <h3 className="text-3xl font-semibold mb-4 text-black">
              Ready to find your dream property?
            </h3>
            <Link
              to="/contact"
              className="inline-block mt-4 bg-amber-400 hover:bg-amber-500 text-pink-700 font-bold px-8 py-3  transition"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
