import { useState } from "react";

export default function ContactBtn({ phone, name }) {

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hi ${name}, I'm interested in your property.`
  )}`;

  return (
    <div className="relative inline-block">
      <button
            onClick={() => window.open(whatsappUrl, "_blank")}
        className="px-3 py-2 border rounded text-white bg-[#005555]"
      >
        Contact Now
      </button>
    </div>
  );
}
