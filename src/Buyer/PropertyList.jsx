// import React, { useEffect, useState } from "react";
// import Pagination from "../CommonComponent/Pagination";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   useGetAllCitiesQuery,
//   useGetLocalitiesByCityQuery,
//   useGetAllPropertiesQuery,
// } from "../redux/features/propertyApi";
// import { MapPin, Building2 } from "lucide-react";
// import Loader from "../CommonComponent/Loader";
// import { useNavigate } from "react-router-dom";
// import Modal from "../CommonComponent/Modal";
// import AddCustomer from "../Pages/Components/AddCustomer";

// // ---------- Constants ----------
// const LISTING_TYPES = [
//   { value: "Sale", label: "For Sale" },
//   { value: "Rent", label: "For Rent" },
// ];

// const PROPERTY_TYPES = {
//   Sale: [
//     { value: "Villa", label: "Villa" },
//     { value: "Farm House", label: "Farm House" },
//     { value: "House", label: "House" },
//     { value: "Apartment", label: "Apartment" },
//     { value: "Commercial", label: "Commercial" },
//   ],
//   Rent: [
//     { value: "House", label: "House" },
//     { value: "Apartment", label: "Apartment" },
//     { value: "Commercial", label: "Commercial" },
//   ],
// };

// // ---------- Main Component ----------
// const PropertyList = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const openCustomerModal = (propertyId) => {
//     setSelectedPropertyId(propertyId);
//     setIsModalOpen(true);
//   };


//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   // ---------- State ----------
//   const [filters, setFilters] = useState({
//     cityId: queryParams.get("cityId") || "",
//     locality: queryParams.get("locality") || "",
//     listingType: queryParams.get("listingType") || "",
//     propertyType: queryParams.get("propertyType") || "",
//     keyword: queryParams.get("keyword") || "",
//   });
//   const [page, setPage] = useState(1);
//   const limit = 9;

//   // ---------- Fetch Data ----------
//   const { data: citiesData } = useGetAllCitiesQuery();
//   const { data: localityData } = useGetLocalitiesByCityQuery(filters.cityId, {
//     skip: !filters.cityId,
//   });
//   const {
//     data: propertyData,
//     isLoading,
//     refetch,
//   } = useGetAllPropertiesQuery({
//     cityId: filters.cityId,
//     locality: filters.locality,
//     listingType: filters.listingType,
//     propertyType: filters.propertyType,
//     keyword: filters.keyword,
//     page,
//     limit,
//   });

//   const cities = citiesData?.data || [];
//   const localities = localityData?.data || [];
//   const properties = propertyData?.data?.properties || [];
//   const totalPages = propertyData?.data?.totalPages || 1;
//   const total = propertyData?.data?.totalProperties || 0;


//   const propertyOptions = filters.listingType
//     ? PROPERTY_TYPES[filters.listingType]
//     : [];

//   // ---------- Handlers ----------
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "cityId" ? { locality: "" } : {}),
//       ...(name === "listingType" ? { propertyType: "" } : {}),
//     }));
//   };

// const handleViewDetails = (propertyId) => {
//   const customerInfo = localStorage.getItem("customerInfo");

//   if (customerInfo) {
//     // ✅ User already submitted info once
//     navigate(`/propertyDetails/${propertyId}`);
//   } else {
//     // 📝 First time visitor → open the form modal
//     openCustomerModal(propertyId);
//   }
// };



//   useEffect(() => {
//     refetch();
//   }, [page]); // refetch on page change

//   // ---------- JSX ----------
//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-10 px-4 md:px-10">
//       <h2 className="text-3xl font-bold text-center text-[#004444] mb-8">
//         Explore Properties
//       </h2>

//       {/* 🧭 Filter Bar */}
//       <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl p-6 mb-12 transition-all duration-300 hover:shadow-3xl">
//         {/* Top Tabs - Listing Type */}
//         <div className="flex justify-start gap-3 mb-5">
//           {LISTING_TYPES.map((type) => (
//             <button
//               key={type.value}
//               onClick={() =>
//                 handleFilterChange({
//                   target: { name: "listingType", value: type.value },
//                 })
//               }
//               className={`px-6 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border ${
//                 filters.listingType === type.value
//                   ? "bg-amber-400 text-white border-pink-700 shadow-lg"
//                   : "bg-white text-black border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               {type.label}
//             </button>
//           ))}
//         </div>

//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {/* City */}
//           <div className="relative">
//             <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
//               City
//             </label>
//             <select
//               name="cityId"
//               value={filters.cityId}
//               onChange={handleFilterChange}
//               className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none"
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city._id} value={city._id}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Locality */}
//           <div className="relative">
//             <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
//               Locality
//             </label>
//             <select
//               name="locality"
//               value={filters.locality}
//               onChange={handleFilterChange}
//               disabled={!filters.cityId}
//               className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//             >
//               <option value="">
//                 {filters.cityId ? "Select Locality" : "Select City First"}
//               </option>
//               {localities?.map((loc) => (
//                 <option key={loc.name} value={loc.name}>
//                   {loc.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Property Type */}
//           <div className="relative">
//             <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
//               Property Type
//             </label>
//             <select
//               name="propertyType"
//               value={filters.propertyType}
//               onChange={handleFilterChange}
//               disabled={!filters.listingType}
//               className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//             >
//               <option value="">
//                 {filters.listingType
//                   ? "Select Property Type"
//                   : "Select Listing Type First"}
//               </option>
//               {propertyOptions.map((type) => (
//                 <option key={type.value} value={type.value}>
//                   {type.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* 🏠 Property Results */}
//       {isLoading ? (
//         <div className="text-center text-gray-500">
//           <Loader />
//         </div>
//       ) : total === 0 ? (
//         <div className="text-center text-gray-500">
//           No properties found. Try different filters.
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {properties.map((property, index) => (
//               <motion.div
//                 key={property._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: index * 0.08 }}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="relative">
//                   <img
//                     src={property.propertyImages?.[0]}
//                     alt={property.title}
//                     className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
//                   />
//                   <span className="absolute top-3 left-3 bg-[#00AAAA] text-white text-xs px-3 py-1 rounded-full shadow-md">
//                     {property.listingType}
//                   </span>
//                 </div>

//                 <div className="p-5 space-y-2">
//                   <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
//                     {property.title}
//                   </h3>

//                   <div className="flex items-center text-gray-600 text-sm">
//                     <MapPin size={16} className="mr-1 text-amber-500" />
//                     {property.locality}, {property.city}
//                   </div>

//                   <div className="flex items-center text-gray-600 text-sm">
//                     <Building2 size={16} className="mr-1 text-amber-500" />
//                     {property.propertyType}
//                   </div>

//                   <div className="flex items-center justify-between mt-3">
                   
//                     <button
//                       // onClick={() => openCustomerModal(property._id)}
//                       onClick={() => handleViewDetails(property._id)}
//                       className="bg-amber-400 hover:bg-amber-500 text-pink-700 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* ✅ Pagination Section */}
//           <Pagination
//             currentPage={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//             hasPrevPage={propertyData?.hasPrevPage}
//             hasNextPage={propertyData?.hasNextPage}
//           />
//           {/* 🧩 Modal */}
//           <Modal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             title="Get Price Details"
//             size="w-[400px]"
//             maxHeight="30vh"
//           >
//             <AddCustomer
//               propertyId={selectedPropertyId}
//               onClose={() => setIsModalOpen(false)}
//             />
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// };

// export default PropertyList;
























import React, { useEffect, useState } from "react";
import Pagination from "../CommonComponent/Pagination";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useGetAllCitiesQuery,
  useGetLocalitiesByCityQuery,
  useGetAllPropertiesQuery,
} from "../redux/features/propertyApi";
import { MapPin, Building2 } from "lucide-react";
import Loader from "../CommonComponent/Loader";
import { useNavigate } from "react-router-dom";
import Modal from "../CommonComponent/Modal";
import AddCustomer from "../Pages/Components/AddCustomer";

const LISTING_TYPES = [
  { value: "Sale", label: "For Sale" },
  { value: "Rent", label: "For Rent" },
];

const PROPERTY_TYPES = {
  Sale: [
    { value: "Villa", label: "Villa" },
    { value: "Farm House", label: "Farm House" },
    { value: "House", label: "House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Commercial", label: "Commercial" },
  ],
  Rent: [
    { value: "House", label: "House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Commercial", label: "Commercial" },
  ],
};

const PropertyList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const openCustomerModal = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    cityId: queryParams.get("cityId") || "",
    locality: queryParams.get("locality") || "",
    listingType: queryParams.get("listingType") || "",
    propertyType: queryParams.get("propertyType") || "",
    keyword: queryParams.get("keyword") || "",
  });
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data: citiesData } = useGetAllCitiesQuery();
  const { data: localityData } = useGetLocalitiesByCityQuery(filters.cityId, {
    skip: !filters.cityId,
  });
  const {
    data: propertyData,
    isLoading,
    refetch,
  } = useGetAllPropertiesQuery({
    cityId: filters.cityId,
    locality: filters.locality,
    listingType: filters.listingType,
    propertyType: filters.propertyType,
    keyword: filters.keyword,
    page,
    limit,
  });

  const cities = citiesData?.data || [];
  const localities = localityData?.data || []; // ← FIXED HERE
  const properties = propertyData?.data?.properties || [];
  const totalPages = propertyData?.data?.totalPages || 1;
  const total = propertyData?.data?.totalProperties || 0;

  const propertyOptions = filters.listingType
    ? PROPERTY_TYPES[filters.listingType]
    : [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cityId" ? { locality: "" } : {}),
      ...(name === "listingType" ? { propertyType: "" } : {}),
    }));
  };

  const handleViewDetails = (propertyId) => {
    const customerInfo = localStorage.getItem("customerInfo");

    if (customerInfo) {
      navigate(`/propertyDetails/${propertyId}`);
    } else {
      openCustomerModal(propertyId);
    }
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-[#004444] mb-8">
        Explore Properties
      </h2>

      <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl p-6 mb-12 transition-all duration-300 hover:shadow-3xl">
        <div className="flex justify-start gap-3 mb-5">
          {LISTING_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                handleFilterChange({
                  target: { name: "listingType", value: type.value },
                })
              }
              className={`px-6 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border ${
                filters.listingType === type.value
                  ? "bg-amber-400 text-white border-pink-700 shadow-lg"
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
              City
            </label>
            <select
              name="cityId"
              value={filters.cityId}
              onChange={handleFilterChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
              Locality
            </label>
            <select
              name="locality"
              value={filters.locality}
              onChange={handleFilterChange}
              disabled={!filters.cityId}
              className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {filters.cityId ? "Select Locality" : "Select City First"}
              </option>
              {localities?.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 text-xs bg-white px-1 text-gray-500">
              Property Type
            </label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              disabled={!filters.listingType}
              className="w-full p-3 rounded-xl border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-[#00AAAA] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {filters.listingType
                  ? "Select Property Type"
                  : "Select Listing Type First"}
              </option>
              {propertyOptions.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">
          <Loader />
        </div>
      ) : total === 0 ? (
        <div className="text-center text-gray-600">
          No properties found. Try different filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative">
                  <img
                    src={property.propertyImages?.[0]}
                    alt={property.title}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-pink-700 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {property.listingType}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-1 text-amber-500" />
                    {property.locality}, {property.city}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Building2 size={16} className="mr-1 text-amber-500" />
                    {property.propertyType}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => handleViewDetails(property._id)}
                      className="bg-amber-400 hover:bg-amber-500 text-pink-700 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            hasPrevPage={propertyData?.hasPrevPage}
            hasNextPage={propertyData?.hasNextPage}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Get Price Details"
            size="w-[400px]"
            maxHeight="30vh"
          >
            <AddCustomer
              propertyId={selectedPropertyId}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default PropertyList;
