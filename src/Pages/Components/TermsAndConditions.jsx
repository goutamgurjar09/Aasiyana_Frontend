import React from "react";

const TermsAndConditions = () => {
  return (
<div className="bg-gray-100 py-10 mt-18 mb-2 px-4 sm:px-8 lg:px-24 font-sans">
      <div className="p-6 sm:p-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#005555] mb-14">
          Terms & Conditions
        </h1>

        <Section
          text="Welcome to "
          highlight="OurRealEstateWebsite"
          end="By using our website, you agree to the following terms and conditions. Please read them carefully before using our services."
        />

        <SubSection
          title="1. Use of the Website"
          text="You must be at least 18 years old to use our website. You agree not to misuse this platform for fraudulent, harmful, or illegal activities. All information you provide must be accurate and up to date."
        />

        <SubSection
          title="2. Property Listings & Content"
          text="We strive to keep all property information accurate and updated. However, we do not guarantee the accuracy, completeness, or availability of listings. Users are responsible for independently verifying all property details before making decisions."
        />

        <SubSection
          title="3. User Accounts"
          text="When you register or submit enquiries, you agree to maintain the confidentiality of your login details and are responsible for all activities under your account."
        />

        <SubSection
          title="4. Intellectual Property"
          text="All content, including images, text, logos, and design, is the intellectual property of "
          highlight="YourRealEstateWebsite"
          end="You may not reuse or reproduce it without written permission."
        />

        <SubSection
          title="5. Third-Party Links"
          text="Our website may include links to third-party websites. We are not responsible for their content, services, or privacy practices. Visiting such sites is at your own risk."
        />

        <SubSection
          title="6. Limitation of Liability"
          text="We are not liable for any direct, indirect, or consequential damages arising from your use of our website or services. This includes, but is not limited to, loss of data, income, or property investment."
        />

        <SubSection
          title="7. Termination"
          text="We reserve the right to suspend or terminate your access to the website at any time if you breach our terms or engage in harmful conduct."
        />

        <SubSection
          title="8. Updates to Terms"
          text="We may update these Terms & Conditions at any time without prior notice. It is your responsibility to review this page regularly."
        />

        <SubSection
          title="9. Contact Us"
          text="If you have any questions or concerns about these Terms & Conditions, please contact us at "
          highlight="legal@yourrealestatewebsite.com"
        />
      </div>
    </div>
  );
};

const Section = ({ text, highlight, end }) => (
  <p className="text-gray-700 text-base leading-relaxed mb-6">
    {text}
    <strong className="text-[#005555]">{highlight}</strong>
    {end && " " + end}
  </p>
);

const SubSection = ({ title, text, highlight, end }) => (
  <div className="mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-[#005555] mb-3">{title}</h2>
    <p className="text-gray-700 text-base leading-relaxed">
      {text}
      {highlight && (
        <>
          <strong className="text-[#005555]">{highlight}</strong>
          {end && " " + end}
        </>
      )}
    </p>
  </div>
);

export default TermsAndConditions;
