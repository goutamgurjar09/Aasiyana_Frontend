import React, { useMemo, useState } from "react";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingPage from "./BookingPage";
import Modal from "../../CommonComponent/Modal";
import Loader from "../../CommonComponent/Loader";
import { showError } from "../../Alert";
import { useGetPropertyByIdQuery } from "../../redux/features/propertyApi";
import ContactBtn from "./ContactBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { renderField } from "../../utils/display";

export default function PropertyDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetPropertyByIdQuery(id, { skip: !id });

  if (isLoading) return <Loader />;
  if (isError) return <div className="p-8 text-center text-red-500">{error?.data?.message || "Failed to load property."}</div>;
  if (!data) return null;

  const property = data?.data || data || {};

  const handleBooking = () => {
    if (property?.status === "Sold") {
      showError("This property is sold. Please book another property.");
      return;
    }
    setIsModalOpen(true);
  };


  const fmt = (v) => (typeof v === "number" ? v.toLocaleString("en-IN") : v || "—");
  const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "—");

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
        <Link
          to={"/properties"}
        >
          <button className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#005555] text-white rounded hover:bg-[#007777] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </Link>

        {/* Top: slider + basic info */}
        <div className="rounded-lg overflow-hidden mb-6 bg-white p-4 shadow">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                {/* Swiper Slider */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="rounded-2xl"
                >
                  {property?.propertyImages.length > 0 ? (
                    property.propertyImages.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="h-[420px] sm:h-[480px] md:h-[520px]">
                          <img
                            src={img}
                            alt={`${property.title || "Property"} ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="h-[420px] flex items-center justify-center bg-gray-100 text-gray-400">
                        No images available
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={24} />
                </button>

                <button className="swiper-button-next-custom absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <aside className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-extrabold text-black">₹{fmt(property.price)}</div>
              <div className="mt-2 text-sm text-black">{property.listingType} • {property.propertyType}</div>

              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <div><span className="font-medium">City:</span> {property.location?.cityId?.name ? `${property.location.cityId.name}, ${property.location.cityId.state}` : property.city || '—'}</div>
                <div><span className="font-medium">Locality:</span> {property.locality || property.location?.locality?.name || '—'}</div>
                <div><span className="font-medium">Status:</span> <span className={`${property.status === 'Available' ? 'text-green-600' : property.status === 'Sold' ? 'text-red-600' : ''}`}> {property.status || '—'}</span></div>
                <div><span className="font-medium">Posted by:</span> {property.owner?.name || property.createdBy?.email || '—'}</div>
                <div><span className="font-medium">Posted on:</span> {fmtDate(property.postedAt)}</div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={handleBooking} className="px-4 py-2 bg-[#005555] text-white rounded">Book Now</button>
              </div>
            </aside>
          </div>
        </div>

        {/* Two-column details */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{property.description || 'No description provided.'}</p>

            
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                {renderField("Which Type", property.details?.whichType)}
                {renderField("Villa Type", property.details?.villaType)}
                {renderField("Plot Size", property.details?.plotSize)}
                {renderField("Plot Number", property.details?.plotNumber)}
                {renderField("Total Area", property.details?.totalArea, fmt)}
                {renderField("Built Up Area", property.details?.builtUpArea, fmt)}
                {renderField("Carpet Area", property.details?.carpetArea, fmt)}
                {renderField("Price / SqFt", property.details?.pricePerSqFt, fmt)}
                {renderField("Workspaces", property.details?.workspaces)}
                {renderField("Meeting Rooms", property.details?.meetingRooms)}
                {renderField("Floors", property.details?.floors)}
              </div>
            </section>

          
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                {renderField("Parking", property.features?.parking ? "Yes" : null)}
                {renderField("Power Backup", property.features?.powerBackup ? "Yes" : null)}
                {renderField("Lift", property.features?.lift ? "Yes" : null)}
                {renderField("Security CCTV", property.features?.securityCCTV ? "Yes" : null)}
                {renderField("Flooring Type", property.features?.flooringType)}
                {renderField(
                  "Road Access",
                  property.features?.roadAccess?.available
                    ? `Yes (width ${fmt(property.features.roadAccess.widthFt)} ft)`
                    : null
                )}
                {renderField("Legal Status", property.features?.legalStatus)}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {(property.amenities || []).map((a, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{a}</span>
                ))}
                {(!property.amenities || property.amenities.length === 0) && <div className="text-sm text-gray-500">No amenities listed.</div>}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Administrative</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div><span className="font-medium">Approval Status:</span> {property.approvalStatus ?? '—'}</div>
                <div><span className="font-medium">Sale Out Date:</span> {fmtDate(property.saleOutDate)}</div>
                <div><span className="font-medium">Created At:</span> {fmtDate(property.createdAt)}</div>
                <div><span className="font-medium">Updated At:</span> {fmtDate(property.updatedAt)}</div>
              </div>
            </section>
          </div>

          <aside className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="text-gray-700"><span className="font-medium">Owner:</span> {property.owner?.name ?? '—'}</div>
            <div className="text-gray-700"><span className="font-medium">Created By:</span> {property.createdBy?.fullname ?? property.createdBy?._id ?? '—'}</div>
            <div className="text-gray-700"><span className="font-medium">City:</span> {property.location?.cityId?.name ? `${property.location.cityId.name}, ${property.location.cityId.state}` : property.city || '—'}</div>
            <div className="text-gray-700"><span className="font-medium">Locality:</span> {property.locality ?? property.location?.locality?.name ?? '—'}</div>
            <div className="text-sm text-gray-500">Posted on: {fmtDate(property.postedAt)}</div>
            <div className="flex gap-2">
              <ContactBtn
                phone={property.createdBy?.mobile}
                name={property.createdBy?.fullname}
              />
            </div>

          </aside>
        </div>



        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Property" size="w-full md:w-3/4 lg:w-1/2">
          <BookingPage propertyId={id} setIsModalOpen={setIsModalOpen} />
        </Modal>
      </div>
    </div>
  );
}
