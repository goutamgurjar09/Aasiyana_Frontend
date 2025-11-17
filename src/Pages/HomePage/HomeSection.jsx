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

    // Reset dependent dropdowns when parent changes
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cityId" ? { locality: "" } : {}),
      ...(name === "listingType" ? { propertyType: "" } : {}), // ✅ reset property type when listingType changes
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
    <section className="relative h-[80vh] flex flex-col justify-center items-center text-center font-sans bg-gradient-to-b from-[#003333] via-[#004444] to-[#006666] text-white px-4">
  <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
    Find Your Dream Property
  </h1>

 {/* ⚙️ Modern Filter Bar */}
<div className="relative mt-10 w-full max-w-5xl mx-auto">
  {/* 🏷 Listing Type Tabs */}
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
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
          className={`relative px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-[#00AAAA] to-[#00CCCC] text-white shadow-[0_0_10px_#00CCCC]/70 scale-105"
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
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 mt-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* City */}
      <div className="flex flex-col">
        <label className="text-xs text-white/70 mb-1 pl-1">City</label>
        <select
          name="cityId"
          value={filters.cityId}
          onChange={handleFilterChange}
          className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none"
        >
          <option value="">Select City</option>
          {cityLoading ? (
            <option disabled>Loading...</option>
          ) : (
            cities.map((city) => (
              <option key={city._id} value={city._id} className="text-black">
                {city.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Locality */}
      <div className="flex flex-col">
        <label className="text-xs text-white/70 mb-1 pl-1">Locality</label>
        <select
          name="locality"
          value={filters.locality}
          onChange={handleFilterChange}
          disabled={!filters.cityId}
          className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none disabled:opacity-40"
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
              <option key={loc.name} value={loc.name} className="text-black">
                {loc.name}
              </option>
            ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="flex flex-col">
        <label className="text-xs text-white/70 mb-1 pl-1">Property Type</label>
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
          disabled={!filters.listingType}
          className="p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#00CCCC] outline-none disabled:opacity-40"
        >
          <option value="">
            {filters.listingType
              ? "Select Property Type"
              : "Select Listing Type First"}
          </option>
          {propertyOptions.map((type) => (
            <option key={type.value} value={type.value} className="text-black">
              {type.label}
            </option>
          ))}
        </select>
      </div>
      {/* Search Button */}
      <div className="flex items-end">
        <button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-[#00AAAA] to-[#00CCCC] hover:from-[#00CCCC] hover:to-[#00EEEE] text-white px-6 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_15px_#00CCCC]/50"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  </div>
</div>

</section>
  );
}

export default HomeSection;



// import React, { useState } from "react";
// import { ChevronDown, Search } from "lucide-react";

// const HomeSection = () => {
//   const [filters, setFilters] = useState({
//     keyword: "",
//     listingType: "",
//     propertyType: "",
//     city: "",
//     // minPrice: "",
//     // maxPrice: "",
//     amenities: [],
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     console.log("Filters Applied:", filters);
//     // call your RTK Query endpoint here, example:
//     // getProperties({ ...filters })
//   };

//   return (
//     <section className="relative h-[80vh] flex flex-col justify-center items-center text-center font-cursive bg-gradient-to-b from-[#003333] via-[#004444] to-[#006666] text-white">
//       <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//         Find Your Dream Property
//       </h1>

//       {/* 🔍 Main Search */}
//       <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 w-full max-w-3xl shadow-xl backdrop-blur-md border border-white/20">
//         <input
//           type="text"
//           name="keyword"
//           placeholder="Search by city, locality, or property name..."
//           value={filters.keyword}
//           onChange={handleFilterChange}
//           className="flex-1 p-3 rounded-xl bg-transparent outline-none text-white placeholder-gray-300"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-[#00AAAA] hover:bg-[#00CCCC] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300"
//         >
//           <Search size={20} /> Search
//         </button>
//       </div>

//       {/* ⚙️ Filters Section */}
//       <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 w-full max-w-5xl text-white border border-white/10 shadow-lg">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {/* Listing Type */}
//           <select
//             name="listingType"
//             value={filters.listingType}
//             onChange={handleFilterChange}
//             className="p-2 rounded-lg bg-transparent border border-white/30 text-white"
//           >
//             <option value="">Listing Type</option>
//             <option value="Sale">For Sale</option>
//             <option value="Rent">For Rent</option>
//           </select>

//           {/* Property Type */}
//           <select
//             name="propertyType"
//             value={filters.propertyType}
//             onChange={handleFilterChange}
//             className="p-2 rounded-lg bg-transparent border border-white/30 text-white"
//           >
//             <option value="">Property Type</option>
//             <option value="Apartment">Apartment</option>
//             <option value="House">House</option>
//             <option value="Villa">Villa</option>
//             <option value="Farm House">Farm House</option>
//             <option value="Commercial">Commercial</option>
//           </select>

//           {/* City */}
//           <input
//             type="text"
//             name="city"
//             placeholder="Enter City"
//             value={filters.city}
//             onChange={handleFilterChange}
//             className="p-2 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300"
//           />

//           {/* Price Range */}
//           {/* <div className="flex items-center justify-between gap-2">
//             <input
//               type="number"
//               name="minPrice"
//               placeholder="Min ₹"
//               value={filters.minPrice}
//               onChange={handleFilterChange}
//               className="w-1/2 p-2 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300"
//             />
//             <input
//               type="number"
//               name="maxPrice"
//               placeholder="Max ₹"
//               value={filters.maxPrice}
//               onChange={handleFilterChange}
//               className="w-1/2 p-2 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300"
//             />
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeSection;
