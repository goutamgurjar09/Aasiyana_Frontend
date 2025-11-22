// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search } from "lucide-react";
// import {
//   useGetAllCitiesQuery,
//   useGetLocalitiesByCityQuery,
// } from "../../redux/features/propertyApi";

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

// const HomeSection = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     keyword: "",
//     cityId: "",
//     locality: "",
//     listingType: "",
//     propertyType: "",
//   });

//   // Fetch data
//   const { data: citiesData, isLoading: cityLoading } = useGetAllCitiesQuery();
//   const { data: localityData, isLoading: localityLoading } =
//     useGetLocalitiesByCityQuery(filters.cityId, {
//       skip: !filters.cityId,
//     });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     // Reset dependent dropdowns when parent changes
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "cityId" ? { locality: "" } : {}),
//       ...(name === "listingType" ? { propertyType: "" } : {}), // ✅ reset property type when listingType changes
//     }));
//   };

//   const handleSearch = () => {
//     const query = new URLSearchParams(filters).toString();
//     navigate(`/properties?${query}`);
//   };

//   const cities = citiesData?.data || [];
//   const localities = localityData?.data || [];
//   const propertyOptions = filters.listingType
//     ? PROPERTY_TYPES[filters.listingType]
//     : [];

//   return (
//     //     <section className="relative h-[80vh] flex flex-col justify-center items-center text-center font-sans bg-gradient-to-b from-[#003333] via-[#004444] to-[#006666] text-white px-4">
//     //   <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//     //     Find Your Dream Property
//     //   </h1>

//     //  {/* ⚙️ Modern Filter Bar */}
//     // <div className="relative mt-10 w-full max-w-5xl mx-auto">
//     //   {/* 🏷 Listing Type Tabs */}
//     //   <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
//     //     {LISTING_TYPES.map((type) => {
//     //       const isActive = filters.listingType === type.value;
//     //       return (
//     //         <button
//     //           key={type.value}
//     //           onClick={() =>
//     //             handleFilterChange({
//     //               target: { name: "listingType", value: type.value },
//     //             })
//     //           }
//     //           className={`relative px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
//     //             ${
//     //               isActive
//     //                 ? "bg-gradient-to-r from-[#00AAAA] to-[#00CCCC] text-white shadow-[0_0_10px_#00CCCC]/70 scale-105"
//     //                 : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
//     //             }`}
//     //         >
//     //           {type.label}
//     //           {isActive && (
//     //             <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-full shadow-[0_0_6px_#00CCCC]" />
//     //           )}
//     //         </button>
//     //       );
//     //     })}
//     //   </div>

//     //   {/* 🌆 Filter Box */}
//     //   <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 mt-12">
//     //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//     //       {/* City */}
//     //       <div className="flex flex-col">
//     //         <label className="text-xs text-white/70 mb-1 pl-1">City</label>
//     //         <select
//     //           name="cityId"
//     //           value={filters.cityId}
//     //           onChange={handleFilterChange}
//     //           className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none"
//     //         >
//     //           <option value="">Select City</option>
//     //           {cityLoading ? (
//     //             <option disabled>Loading...</option>
//     //           ) : (
//     //             cities.map((city) => (
//     //               <option key={city._id} value={city._id} className="text-black">
//     //                 {city.name}
//     //               </option>
//     //             ))
//     //           )}
//     //         </select>
//     //       </div>

//     //       {/* Locality */}
//     //       <div className="flex flex-col">
//     //         <label className="text-xs text-white/70 mb-1 pl-1">Locality</label>
//     //         <select
//     //           name="locality"
//     //           value={filters.locality}
//     //           onChange={handleFilterChange}
//     //           disabled={!filters.cityId}
//     //           className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none disabled:opacity-40"
//     //         >
//     //           <option value="">
//     //             {filters.cityId
//     //               ? localityLoading
//     //                 ? "Loading..."
//     //                 : "Select Locality"
//     //               : "Select City First"}
//     //           </option>
//     //           {!localityLoading &&
//     //             localities?.map((loc) => (
//     //               <option key={loc.name} value={loc.name} className="text-black">
//     //                 {loc.name}
//     //               </option>
//     //             ))}
//     //         </select>
//     //       </div>

//     //       {/* Property Type */}
//     //       <div className="flex flex-col">
//     //         <label className="text-xs text-white/70 mb-1 pl-1">Property Type</label>
//     //         <select
//     //           name="propertyType"
//     //           value={filters.propertyType}
//     //           onChange={handleFilterChange}
//     //           disabled={!filters.listingType}
//     //           className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none disabled:opacity-40"
//     //         >
//     //           <option value="">
//     //             {filters.listingType
//     //               ? "Select Property Type"
//     //               : "Select Listing Type First"}
//     //           </option>
//     //           {propertyOptions.map((type) => (
//     //             <option key={type.value} value={type.value} className="text-black">
//     //               {type.label}
//     //             </option>
//     //           ))}
//     //         </select>
//     //       </div>
//     //       {/* Search Button */}
//     //       <div className="flex items-end">
//     //         <button
//     //           onClick={handleSearch}
//     //           className="w-full bg-gradient-to-r from-[#00AAAA] to-[#00CCCC] hover:from-[#00CCCC] hover:to-[#00EEEE] text-white px-6 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_15px_#00CCCC]/50"
//     //         >
//     //           <Search size={18} />
//     //           Search
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     // </section>

//     <section
//       className="relative h-[100vh] flex flex-col justify-center items-center text-center font-sans text-white px-4 bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "url('src/assets/Image/Hero.png')",
//       }}
//     >
//       {/* 🔥 Dark Overlay for opacity */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative z-10 flex flex-col justify-center items-center w-full">
//         <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//           Find Your Dream Property
//         </h1>

//         {/* ⚙️ Modern Filter Bar */}
//         <div className="relative mt-10 w-full max-w-5xl mx-auto">
//           {/* 🏷 Listing Type Tabs */}
//           <div
//             className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 
//         bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg"
//           >
//             {LISTING_TYPES.map((type) => {
//               const isActive = filters.listingType === type.value;
//               return (
//                 <button
//                   key={type.value}
//                   onClick={() =>
//                     handleFilterChange({
//                       target: { name: "listingType", value: type.value },
//                     })
//                   }
//                   className={`relative px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
//                 ${
//                   isActive
//                     ? "bg-amber-300 text-white shadow-[0_0_10px_#00CCCC]/70 scale-105"
//                     : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
//                 }`}
//                 >
//                   {type.label}
//                   {isActive && (
//                     <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-full shadow-[0_0_6px_#00CCCC]" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* 🌆 Filter Box - black */}
//           <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 mt-12">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//               {/* City */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-white/80 mb-1 pl-1">City</label>
//                 <select
//                   name="cityId"
//                   value={filters.cityId}
//                   onChange={handleFilterChange}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none"
//                 >
//                   <option value="">Select City</option>
//                   {cityLoading ? (
//                     <option disabled>Loading...</option>
//                   ) : (
//                     cities.map((city) => (
//                       <option
//                         key={city._id}
//                         value={city._id}
//                         className="text-black"
//                       >
//                         {city.name}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>

//               {/* Locality */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-white/80 mb-1 pl-1">
//                   Locality
//                 </label>
//                 <select
//                   name="locality"
//                   value={filters.locality}
//                   onChange={handleFilterChange}
//                   disabled={!filters.cityId}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
//                 >
//                   <option value="">
//                     {filters.cityId
//                       ? localityLoading
//                         ? "Loading..."
//                         : "Select Locality"
//                       : "Select City First"}
//                   </option>
//                   {!localityLoading &&
//                     localities?.map((loc) => (
//                       <option
//                         key={loc.name}
//                         value={loc.name}
//                         className="text-black"
//                       >
//                         {loc.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               {/* Property Type */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-white/80 mb-1 pl-1">
//                   Property Type
//                 </label>
//                 <select
//                   name="propertyType"
//                   value={filters.propertyType}
//                   onChange={handleFilterChange}
//                   disabled={!filters.listingType}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
//                 >
//                   <option value="">
//                     {filters.listingType
//                       ? "Select Property Type"
//                       : "Select Listing Type First"}
//                   </option>
//                   {propertyOptions.map((type) => (
//                     <option
//                       key={type.value}
//                       value={type.value}
//                       className="text-black"
//                     >
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Search Button - amber */}
//               <div className="flex items-end">
//                 <button
//                   onClick={handleSearch}
//                   className="w-full bg-amber-300 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold 
//               flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_12px_rgba(255,193,7,0.6)]"
//                 >
//                   <Search size={18} />
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HomeSection;











// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search } from "lucide-react";
// import {
//   useGetAllCitiesQuery,
//   useGetLocalitiesByCityQuery,
// } from "../../redux/features/propertyApi";

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

// const HomeSection = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     keyword: "",
//     cityId: "",
//     locality: "",
//     listingType: "",
//     propertyType: "",
//   });

//   // Fetch data
//   const { data: citiesData, isLoading: cityLoading } = useGetAllCitiesQuery();
//   const { data: localityData, isLoading: localityLoading } =
//     useGetLocalitiesByCityQuery(filters.cityId, {
//       skip: !filters.cityId,
//     });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     // Reset dependent dropdowns when parent changes
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "cityId" ? { locality: "" } : {}),
//       ...(name === "listingType" ? { propertyType: "" } : {}), // ✅ reset property type when listingType changes
//     }));
//   };

//   const handleSearch = () => {
//     const query = new URLSearchParams(filters).toString();
//     navigate(`/properties?${query}`);
//   };

//   const cities = citiesData?.data || [];
//   const localities = localityData?.data || [];
//   const propertyOptions = filters.listingType
//     ? PROPERTY_TYPES[filters.listingType]
//     : [];

//   return (
//     <section
//       className="relative min-h-screen md:h-[100vh] flex flex-col justify-center items-center text-center font-sans text-white px-4 bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "url('src/assets/Image/Hero.png')",
//       }}
//     >
//       {/* 🔥 Dark Overlay for opacity */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       <div className="relative z-10 flex flex-col justify-center items-center w-full">
//         <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//           Find Your Dream Property
//         </h1>

//         {/* ⚙️ Modern Filter Bar */}
//         <div className="relative mt-10 w-full max-w-5xl mx-auto">
//           {/* 🏷 Listing Type Tabs */}
//           <div
//             className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 
//         px-4 py-2 rounded-full bg-blue-950 border border-white/20 shadow-lg"
//           >
//             {LISTING_TYPES.map((type) => {
//               const isActive = filters.listingType === type.value;
//               return (
//                 <button
//                   key={type.value}
//                   onClick={() =>
//                     handleFilterChange({
//                       target: { name: "listingType", value: type.value },
//                     })
//                   }
//                   className={`relative px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
//                 ${
//                   isActive
//                     ? "bg-pink-700 text-white shadow-[0_0_10px_#00CCCC]/70 scale-105 hover:bg-pink-800"
//                     : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
//                 }`}
//                 >
//                   {type.label}
//                   {isActive && (
//                     <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-full shadow-[0_0_6px_#00CCCC]" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* 🌆 Filter Box - black */}
//           {/* <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 mt-12"> */}

//           <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 mt-12 overflow-visible">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//               {/* City */}

//               {/* <div className="flex flex-col order-3 md:order-1"> */}
//               <div className="flex flex-col order-3 md:order-1 relative z-[9999] overflow-visible">
//                 <label className="text-xs text-white/80 mb-1 pl-1">City</label>
//                 <select
//                   name="cityId"
//                   value={filters.cityId}
//                   onChange={handleFilterChange}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none"
//                 >
//                   <option value="">Select City</option>
//                   {cityLoading ? (
//                     <option disabled>Loading...</option>
//                   ) : (
//                     cities.map((city) => (
//                       <option
//                         key={city._id}
//                         value={city._id}
//                         className="text-black"
//                       >
//                         {city.name}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>

            
       
//               {/* Locality */}
//               {/* <div className="flex flex-col"> */}
//               <div className="flex flex-col order-4 md:order-2">
//                 <label className="text-xs text-white/80 mb-1 pl-1">
//                   Locality
//                 </label>
//                 <select
//                   name="locality"
//                   value={filters.locality}
//                   onChange={handleFilterChange}
//                   disabled={!filters.cityId}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
//                 >
//                   <option value="">
//                     {filters.cityId
//                       ? localityLoading
//                         ? "Loading..."
//                         : "Select Locality"
//                       : "Select City First"}
//                   </option>
//                   {!localityLoading &&
//                     localities?.map((loc) => (
//                       <option
//                         key={loc.name}
//                         value={loc.name}
//                         className="text-black"
//                       >
//                         {loc.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               {/* Property Type */}
//               {/* <div className="flex flex-col"> */}
//               <div className="flex flex-col order-5 md:order-3">
//                 <label className="text-xs text-white/80 mb-1 pl-1">
//                   Property Type
//                 </label>
//                 <select
//                   name="propertyType"
//                   value={filters.propertyType}
//                   onChange={handleFilterChange}
//                   disabled={!filters.listingType}
//                   className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
//                 >
//                   <option value="">
//                     {filters.listingType
//                       ? "Select Property Type"
//                       : "Select Listing Type First"}
//                   </option>
//                   {propertyOptions.map((type) => (
//                     <option
//                       key={type.value}
//                       value={type.value}
//                       className="text-black"
//                     >
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Search Button - amber */}
//               {/* <div className="flex items-end"> */}
//               <div className="flex items-end order-6 md:order-4">
//                 <button
//                   onClick={handleSearch}
//                   className="w-full bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold 
//               flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_12px_rgba(255,193,7,0.6)]"
//                 >
//                   <Search size={18} />
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeSection;













import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  useGetAllCitiesQuery,
  useGetLocalitiesByCityQuery,
} from "../../redux/features/propertyApi";

// ---------- Constants ----------
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

const HomeSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keyword: "",
    cityId: "",
    locality: "",
    listingType: "",
    propertyType: "",
  });

  // Fetch data
  const { data: citiesData, isLoading: cityLoading } = useGetAllCitiesQuery();
  const { data: localityData, isLoading: localityLoading } =
    useGetLocalitiesByCityQuery(filters.cityId, {
      skip: !filters.cityId,
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cityId" ? { locality: "" } : {}),
      ...(name === "listingType" ? { propertyType: "" } : {}),
    }));
  };

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString();
    navigate(`/properties?${query}`);
  };

  const cities = citiesData?.data || [];
  const localities = localityData?.data || [];
  const propertyOptions = filters.listingType
    ? PROPERTY_TYPES[filters.listingType]
    : [];

  return (
    <section
      className="relative min-h-screen md:h-screen flex flex-col justify-center items-center text-center font-sans text-white px-4 sm:px-6 md:px-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/Image/Hero.png')",
      }}
    >
      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6">
          Find Your Dream Property
        </h1>

        {/* ⚙️ Modern Filter Bar */}
        <div className="relative mt-10 w-full max-w-5xl mx-auto">
          {/* 🏷 Listing Type Tabs */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-blue-950 border border-white/20 shadow-lg">
            {LISTING_TYPES.map((type) => {
              const isActive = filters.listingType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "listingType", value: type.value },
                    })
                  }
                  className={`relative px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
                ${
                  isActive
                    ? "bg-pink-700 text-white shadow-[0_0_10px_#00CCCC]/70 scale-105 hover:bg-pink-800"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                }`}
                >
                  {type.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-full shadow-[0_0_6px_#00CCCC]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 🌆 Filter Box */}
          <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 mt-16 overflow-visible">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {/* City */}
              <div className="flex flex-col order-3 md:order-1 relative z-9999 overflow-visible">
                <label className="text-xs text-white/80 mb-1 pl-1">City</label>
                <select
                  name="cityId"
                  value={filters.cityId}
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none"
                >
                  <option value="">Select City</option>
                  {cityLoading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    cities.map((city) => (
                      <option
                        key={city._id}
                        value={city._id}
                        className="text-black"
                      >
                        {city.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Locality */}
              <div className="flex flex-col order-4 md:order-2">
                <label className="text-xs text-white/80 mb-1 pl-1">
                  Locality
                </label>
                <select
                  name="locality"
                  value={filters.locality}
                  onChange={handleFilterChange}
                  disabled={!filters.cityId}
                  className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
                >
                  <option value="">
                    {filters.cityId
                      ? localityLoading
                        ? "Loading..."
                        : "Select Locality"
                      : "Select City First"}
                  </option>
                  {!localityLoading &&
                    localities?.map((loc) => (
                      <option
                        key={loc.name}
                        value={loc.name}
                        className="text-black"
                      >
                        {loc.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="flex flex-col order-5 md:order-3">
                <label className="text-xs text-white/80 mb-1 pl-1">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  disabled={!filters.listingType}
                  className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-amber-300 outline-none disabled:opacity-40"
                >
                  <option value="">
                    {filters.listingType
                      ? "Select Property Type"
                      : "Select Listing Type First"}
                  </option>
                  {propertyOptions.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="text-black"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end order-6 md:order-4">
                <button
                  onClick={handleSearch}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-pink-700 px-6 py-3  font-bold 
              flex justify-center items-center gap-2 transition-all duration-300 "
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;


