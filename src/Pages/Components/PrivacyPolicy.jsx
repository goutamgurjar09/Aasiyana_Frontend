import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100  py-10 mt-10 mb-2 px-4 sm:px-8 lg:px-24 font-sans">
      <div className="p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl uppercase font-bold text-center text-black mb-4">
          Privacy Policy
        </h1>
        <div className="w-64 h-1 bg-amber-400 mx-auto mb-8"></div>

        <p className="text-pink-700 text-base leading-relaxed mb-6 text-center max-w-3xl mx-auto font-bold">
          At
          <strong className="text-amber-500"> OurRealEstateWebsite</strong>, we
          are committed to protecting your privacy.
          <br />
          This Privacy Policy outlines how we collect, use, and safeguard your
          information when you interact with our website or services.
        </p>

        <Section
          title="1. Information We Collect"
          items={[
            "Personal Information: name, email, phone number, address.",
            "Property preferences, location, and budget interests.",
            "Technical data such as IP address, browser type, and device information.",
          ]}
        />

        <Section
          title="2. How We Use Your Information"
          items={[
            "To help you find suitable properties and connect with agents.",
            "To respond to your queries and schedule property visits.",
            "To improve website performance and user experience.",
            "To send updates, offers, and newsletters (only if opted in).",
          ]}
        />

        <Section
          title="3. Sharing Your Data"
          description="We do not sell or rent your personal data. However, we may share information with:"
          items={[
            "Verified real estate agents or builders you interact with.",
            "Trusted third-party service providers for operations (e.g., hosting, analytics).",
            "Legal authorities when required by law.",
          ]}
        />

        <TextSection
          title="4. Data Security"
          text="We implement industry-standard security practices to safeguard your data. However, no system is 100% secure, and we advise you to protect your login credentials and activity."
        />

        <TextSection
          title="5. Cookies & Tracking"
          text="Our website uses cookies to enhance your browsing experience and understand usage patterns. You can choose to disable cookies through your browser settings."
        />

        <TextSection
          title="6. Your Rights"
          text="You have the right to access, update, or delete your personal data stored with us. To make such requests, please contact us at "
          highlight="support@yourrealestatewebsite.com"
        />

        <TextSection
          title="7. Updates to This Policy"
          text="We may update this policy from time to time. Changes will be posted on this page with the revised date."
        />

        <TextSection
          title="Contact Us"
          text="If you have any questions about this Privacy Policy, please email us at "
          highlight="privacy@yourrealestatewebsite.com"
        />
      </div>
    </div>
  );
};

const Section = ({ title, items, description }) => (
  <div className="mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-3">{title}</h2>
    {description && <p className="text-black mb-2">{description}</p>}
    <ul className="list-disc pl-5 space-y-1 text-black text-base">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

const TextSection = ({ title, text, highlight }) => (
  <div className="mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-3">{title}</h2>
    <p className="text-black text-base leading-relaxed">
      {text}
      {highlight && <strong className="text-pink-700">{highlight}</strong>}
    </p>
  </div>
);

export default PrivacyPolicy;
