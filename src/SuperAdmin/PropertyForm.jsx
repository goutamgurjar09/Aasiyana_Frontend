import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useGetPropertyByIdQuery,
  useGetAllCitiesQuery
} from "../redux/features/propertyApi";
import { showError, showSuccess } from "../Alert";

// ---------- Constants ----------
const LISTING_TYPES = [
  { value: "Sale", label: "Sale" },
  { value: "Rent", label: "Rent" },
];

const PROPERTY_TYPES_MAP = {
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

const VILLA_TYPES = [
  { value: "Magenta", label: "Magenta" },
  { value: "Green", label: "Green" },
  { value: "Gray", label: "Gray" },
  { value: "Orange", label: "Orange" },
];

const FLOORING_OPTIONS = [
  { value: "Tiles", label: "Tiles" },
  { value: "Marble", label: "Marble" },
  { value: "Concrete", label: "Concrete" },
];

const AMENITIES_OPTIONS = [
  { value: "restrooms", label: "Restrooms/Washrooms" },
  { value: "storage", label: "Storage Space/Warehouse" },
  { value: "loadingFacility", label: "Loading/Unloading Facility" },
  { value: "fireSafety", label: "Fire Safety/Emergency Exits" },
  { value: "airConditioning", label: "Air Conditioning/HVAC" },
];

// ---------- Validation ----------
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  listingType: yup.string().oneOf(["Sale", "Rent"]).required(),
  propertyType: yup.string().required("Property type is required"),
  localityName: yup.string().required("Locality name is required"),
});

// ---------- Component ----------
const PropertyForm = ({ id, setIsModalOpen, onSuccess }) => {
  // RTK Query hooks for property
  const [addProperty, addResult] = useAddPropertyMutation();
  const [updateProperty, updateResult] = useUpdatePropertyMutation();
  const {
    data: existingProperty,
    isSuccess: gotProperty,
    isFetching: fetchingProperty,
  } = useGetPropertyByIdQuery(id ?? "", { skip: !id });

  const { data: citiesResponse, isLoading: citiesLoading } = useGetAllCitiesQuery();

  // Local state
  const [selectedCity, setSelectedCity] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // RHF
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      listingType: "Sale",
      propertyType: "",
      whichType: "",
      villaType: "",
      plotSize: "",
      plotNumber: "",
      totalArea: "",
      builtUpArea: "",
      carpetArea: "",
      pricePerSqFt: "",
      workspaces: "",
      meetingRooms: "",
      floors: "",
      parking: false,
      powerBackup: false,
      lift: false,
      securityCCTV: false,
      flooringType: "",
      roadAccess: false,
      roadWidth: "",
      legalStatus: "Clear",
      amenities: [],
      city: null,
      localityName: "",
      latitude: "",
      longitude: "",
      ownerName: "",
      saleOutDate: "",
      propertyId: "",
      category: "",
    },
  });

  const listingType = watch("listingType");
  const propertyType = watch("propertyType");

  // Format cities data
  const citiesOptions = useMemo(() => {
    return Array.isArray(citiesResponse?.data)
      ? citiesResponse.data.map((city) => ({
        value: city._id,
        label: city.name,
      }))
      : [];
  }, [citiesResponse]);

  // Populate form when editing
  useEffect(() => {
    if (!gotProperty || !existingProperty?.data) return;

    const p = existingProperty.data;
    setExistingImages(p.propertyImages || []);

    if (p.location?.cityId?._id) {
      const cityOption = citiesOptions.find(c => c.value === p.location.cityId._id);
      if (cityOption) {
        setSelectedCity(cityOption);
      }
    }

    reset({
      title: p.title || "",
      description: p.description || "",
      price: p.price ?? "",
      listingType: p.listingType || "Sale",
      propertyType: p.propertyType || "",
      whichType: p.details?.whichType || "",
      villaType: p.details?.villaType || "",
      plotSize: p.details?.plotSize || "",
      plotNumber: p.details?.plotNumber ?? "",
      totalArea: p.details?.totalArea ?? "",
      builtUpArea: p.details?.builtUpArea ?? "",
      carpetArea: p.details?.carpetArea ?? "",
      pricePerSqFt: p.details?.pricePerSqFt ?? "",
      workspaces: p.details?.workspaces ?? "",
      meetingRooms: p.details?.meetingRooms ?? "",
      floors: p.details?.floors ?? "",
      parking: p.features?.parking || false,
      powerBackup: p.features?.powerBackup || false,
      lift: p.features?.lift || false,
      securityCCTV: p.features?.securityCCTV || false,
      flooringType: p.features?.flooringType || "",
      roadAccess: p.features?.roadAccess?.available || false,
      roadWidth: p.features?.roadAccess?.widthFt ?? "",
      legalStatus: p.features?.legalStatus || "Clear",
      amenities: (p.amenities || []).map((a) => ({ value: a, label: a })),
      localityName: p.location?.locality?.name || "",
      latitude: p.location?.locality?.latitude || "",
      longitude: p.location?.locality?.longitude || "",
      ownerName: p.owner?.name || "",
      saleOutDate: p.saleOutDate ? p.saleOutDate.split("T")[0] : "",
      propertyId: p.propertyId || "",
      category: p.category || "",
    });
  }, [gotProperty, existingProperty, reset, citiesOptions]);

  // Handle file selection
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 20 * 1024 * 1024;

    if (files.length + existingImages.length > 5) {
      showError("Max 5 images total (existing + new).");
      return;
    }

    for (const f of files) {
      if (!allowed.includes(f.type)) {
        showError("Only JPEG/PNG/JPG allowed");
        return;
      }
      if (f.size > maxSize) {
        showError("Each image must be < 20MB");
        return;
      }
    }

    setPreviewFiles(files);
  };

  const removeExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit handler
  const onSubmit = async (formValues) => {
    try {
      if (!selectedCity) {
        showError("Please select a city");
        return;
      }

      // Build nested objects
      const features = {
        parking: !!formValues.parking,
        powerBackup: !!formValues.powerBackup,
        lift: !!formValues.lift,
        securityCCTV: !!formValues.securityCCTV,
        flooringType: formValues.flooringType || "",
        roadAccess: {
          available: !!formValues.roadAccess,
          widthFt: formValues.roadWidth ? Number(formValues.roadWidth) : 0
        },
        legalStatus: formValues.legalStatus || "Clear",
      };

      const details = {
        whichType: formValues.whichType || null,
        villaType: formValues.villaType || null,
        plotSize: formValues.plotSize || "",
        plotNumber: formValues.plotNumber ? Number(formValues.plotNumber) : 0,
        totalArea: formValues.totalArea ? Number(formValues.totalArea) : null,
        builtUpArea: formValues.builtUpArea ? Number(formValues.builtUpArea) : null,
        carpetArea: formValues.carpetArea ? Number(formValues.carpetArea) : null,
        pricePerSqFt: formValues.pricePerSqFt ? Number(formValues.pricePerSqFt) : null,
        workspaces: formValues.workspaces ? Number(formValues.workspaces) : null,
        meetingRooms: formValues.meetingRooms ? Number(formValues.meetingRooms) : null,
        floors: formValues.floors ? Number(formValues.floors) : null,
      };

      const amenities = (formValues.amenities || []).map((a) => a.value);

      const location = {
        cityId: selectedCity.value,
        locality: {
          name: formValues.localityName,
          latitude: formValues.latitude || "",
          longitude: formValues.longitude || "",
        }
      };

      const owner = {
        name: formValues.ownerName || "",
      };

      // Generate defaults if not provided
      const propertyId = formValues.propertyId || `PROP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const category = formValues.category || formValues.propertyType;

      // Create FormData
      const fd = new FormData();
      fd.append("title", formValues.title);
      fd.append("description", formValues.description || "");

      if (formValues.price !== undefined && formValues.price !== "") {
        fd.append("price", formValues.price);
      }

      fd.append("listingType", formValues.listingType);
      fd.append("propertyType", formValues.propertyType);
      fd.append("propertyId", propertyId);
      fd.append("category", category);

      // Append JSON stringified objects
      fd.append("details", JSON.stringify(details));
      fd.append("features", JSON.stringify(features));
      fd.append("amenities", JSON.stringify(amenities));
      fd.append("location", JSON.stringify(location));
      fd.append("owner", JSON.stringify(owner));

      if (formValues.saleOutDate) {
        fd.append("saleOutDate", formValues.saleOutDate);
      }

      // Existing images to keep
      (existingImages || []).forEach((img) => fd.append("existingImages", img));

      // New files
      (previewFiles || []).forEach((file) => fd.append("propertyImages", file));

      console.log("📤 Submitting FormData:");
      for (let [key, value] of fd.entries()) {
        console.log(key, ":", value);
      }

      let res;
      if (id) {
        res = await updateProperty({ id, formData: fd }).unwrap();
        showSuccess(res.message || "Property updated successfully");
      } else {
        res = await addProperty(fd).unwrap();
        showSuccess(res.message || "Property created successfully");
      }

      // Reset UI
      setPreviewFiles([]);
      setExistingImages([]);
      setSelectedCity(null);
      reset();
      if (setIsModalOpen) setIsModalOpen(false);
      if (onSuccess) onSuccess(res);

    } catch (err) {
      console.error("❌ Submit error:", err);

      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.message ||
        "Failed to save property";

      showError(errorMessage);
    }
  };

  // -------- Render ----------
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg  overflow-auto"
    >
      {/* Header */}
      {/* <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {id ? "Update Property" : "Create New Property"}
        </h2>
      </div> */}

      {/* Basic Information Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="listingType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={LISTING_TYPES}
                  onChange={(opt) => field.onChange(opt.value)}
                  value={LISTING_TYPES.find((o) => o.value === field.value) || null}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={PROPERTY_TYPES_MAP[listingType] || PROPERTY_TYPES_MAP.Sale}
                  onChange={(opt) => field.onChange(opt.value)}
                  value={(PROPERTY_TYPES_MAP[listingType] || []).find((o) => o.value === field.value) || null}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.propertyType && (
              <p className="text-red-500 text-xs mt-1">{errors.propertyType.message}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Name / Project Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Enter property title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Price & Owner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              {...register("price")}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner / Builder Name
            </label>
            <input
              {...register("ownerName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter owner/builder name"
            />
          </div>
          // In common fields section, after ownerName:
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property ID / Registration Number
            </label>
            <input
              {...register("propertyId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter property registration ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              {...register("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter category"
            />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Location Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <Select
              options={citiesOptions}
              value={selectedCity}
              onChange={(opt) => {
                setSelectedCity(opt);
                setValue("city", opt?.value || "");
              }}
              placeholder={citiesLoading ? "Loading cities..." : "Select City"}
              isClearable
              isLoading={citiesLoading}
              isDisabled={citiesLoading}
              className="react-select-container"
              classNamePrefix="react-select"
            />

          </div>

          {/* Locality Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locality / Area Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("localityName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter locality or area name (e.g., MR 10, Vijay Nagar)"
            />
            {errors.localityName && (
              <p className="text-red-500 text-xs mt-1">{errors.localityName.message}</p>
            )}
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              {...register("latitude")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 22.7196"
            />
            <p className="text-xs text-gray-500 mt-1">Optional: For map location</p>
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              {...register("longitude")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 75.8577"
            />
            <p className="text-xs text-gray-500 mt-1">Optional: For map location</p>
          </div>
        </div>
      </div>

      {/* Property Details Section - Conditional */}
      {(propertyType === "Villa" || propertyType === "Farm House") && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Villa / Farm House Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which Type
              </label>
              <Controller
                name="whichType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Plot", label: "Plot" },
                      { value: "Duplex", label: "Duplex" }
                    ]}
                    onChange={(o) => field.onChange(o?.value)}
                    value={[
                      { value: "Plot", label: "Plot" },
                      { value: "Duplex", label: "Duplex" }
                    ].find(o => o.value === field.value) || null}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Villa Type / Plot Symbol
              </label>
              <Controller
                name="villaType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={VILLA_TYPES}
                    onChange={(o) => field.onChange(o?.value)}
                    value={VILLA_TYPES.find(o => o.value === field.value) || null}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plot Size
              </label>
              <input
                {...register("plotSize")}
                placeholder="e.g., 50x40"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plot Number
              </label>
              <input
                {...register("plotNumber")}
                type="number"
                placeholder="Enter plot number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Area (sq.ft)
              </label>
              <input
                {...register("totalArea")}
                type="number"
                placeholder="Enter total area"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Built-up Area (sq.ft)
              </label>
              <input
                {...register("builtUpArea")}
                type="number"
                placeholder="Enter built-up area"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carpet Area (sq.ft)
              </label>
              <input
                {...register("carpetArea")}
                type="number"
                placeholder="Enter carpet area"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per sq.ft (₹)
              </label>
              <input
                {...register("pricePerSqFt")}
                type="number"
                placeholder="Enter price per sq.ft"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>
      )}

      {/* House / Apartment Details */}
      {(propertyType === "House" || propertyType === "Apartment") && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            {propertyType} Details
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Floors
            </label>
            <input
              {...register("floors")}
              type="number"
              placeholder="Enter number of floors"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
      )}

      {/* Commercial Details */}
      {propertyType === "Commercial" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Commercial Property Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Workspaces / Offices
              </label>
              <input
                {...register("workspaces")}
                type="number"
                placeholder="Enter workspaces count"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conference / Meeting Rooms
              </label>
              <input
                {...register("meetingRooms")}
                type="number"
                placeholder="Enter meeting rooms count"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Floors
              </label>
              <input
                {...register("floors")}
                type="number"
                placeholder="Enter number of floors"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Area (sq.ft)
              </label>
              <input
                {...register("totalArea")}
                type="number"
                placeholder="Enter total area"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per sq.ft (₹)
              </label>
              <input
                {...register("pricePerSqFt")}
                type="number"
                placeholder="Enter price per sq.ft"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Description
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Description
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Describe your property in detail..."
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Features & Amenities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              {...register("parking")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Parking</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              {...register("powerBackup")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Power Backup</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              {...register("lift")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Lift / Elevator</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              {...register("securityCCTV")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Security / CCTV</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              {...register("roadAccess")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Road Access</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flooring Type
            </label>
            <Controller
              name="flooringType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={FLOORING_OPTIONS}
                  onChange={(o) => field.onChange(o?.value)}
                  value={FLOORING_OPTIONS.find(o => o.value === field.value) || null}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable
                  placeholder="Select flooring type"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Road Width (ft)
            </label>
            <input
              {...register("roadWidth")}
              type="number"
              placeholder="Enter road width"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Status
            </label>
            <select
              {...register("legalStatus")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
            >
              <option value="Clear">Clear</option>
              <option value="Under Dispute">Under Dispute</option>
              <option value="Encumbrances">Encumbrances</option>
            </select>
          </div>
        </div>

        {/* Commercial Amenities */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Amenities / Facilities
          </label>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={AMENITIES_OPTIONS}
                onChange={(vals) => field.onChange(vals)}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select amenities"
              />
            )}
          />
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Property Images
        </h3>

        {/* Existing Images with Remove Button */}
        {existingImages?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {existingImages.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={typeof img === "string" ? img : img.url}
                  alt={`property-${i}`}
                  className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                />
                {/* Remove button (X icon) */}
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload new images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-600">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG up to 20MB (max 5 images)
                </p>
              </div>
            </label>
          </div>

          {/* Preview New Images with Remove Button */}
          {previewFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {previewFiles.map((f, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(f)}
                    alt={`preview-${i}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-blue-500"
                  />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewFiles((prev) => prev.filter((_, index) => index !== i))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition"
                    title="Remove preview"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Sale Out Date */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Additional Information
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sale Out Date (Optional)
          </label>
          <input
            type="date"
            {...register("saleOutDate")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-gray-500 mt-1">Expected date when property will be sold out</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t">
        {setIsModalOpen && (
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          disabled={addResult.isLoading || updateResult.isLoading || fetchingProperty}
        >
          {(addResult.isLoading || updateResult.isLoading || fetchingProperty) && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span>
            {id
              ? (updateResult.isLoading ? "Updating..." : "Update Property")
              : (addResult.isLoading ? "Creating..." : "Create Property")
            }
          </span>
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;