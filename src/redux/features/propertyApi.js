import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/properties",
    credentials: "include",
     prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.accessToken) {
        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Property"],

  endpoints: (builder) => ({
    // Add Property
    addProperty: builder.mutation({
      query: (formData) => ({
        url: "/create-property",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Property"]
    }),

    // Update Property
    updateProperty: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-property/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Property"]
    }),
    // getAllProperties
    getAllProperties: builder.query({
      query: (params) => {
        const { cityId, locality, propertyType, listingType, page = 1, limit = 10 } = params || {};
        const queryParams = new URLSearchParams();

        if (cityId) queryParams.append("cityId", cityId);
        if (locality) queryParams.append("locality", locality);
        if (propertyType) queryParams.append("propertyType", propertyType);
        if (listingType) queryParams.append("listingType", listingType);

        queryParams.append("page", page);
        queryParams.append("limit", limit);

        return {
          url: `/properties?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Property"],
    }),

    // ✅ Get Single Property
    getPropertyById: builder.query({
      query: (id) => ({
        url: `/get-property/${id}`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),
    // ✅ Delete Property
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/delete-property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),

    // ✅ Update Approval Status
    updateApprovalStatus: builder.mutation({
      query: ({ id, approvalStatus }) => ({
        url: `/update-propertyStatus/${id}`,
        method: "PATCH",
        body: { approvalStatus },
      }),
      invalidatesTags: ["Property"],
    }),
    getLocalitiesByCity: builder.query({
      query: (cityId) => ({
        url: `/property-locations/${cityId}`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),
    getPropertyByCityLocality: builder.query({
      query: ({ city, locality, page, limit }) => ({
        url: `/get-properties?city=${city}&locality=${locality}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),
    getAllCities: builder.query({
      query: () => ({
        url: `/cities`,
        providesTags: ["Property"],
      }),
    }),
  }),
});

export const {
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useDeletePropertyMutation,
  useUpdateApprovalStatusMutation,
  useGetLocalitiesByCityQuery,
  useGetAllCitiesQuery,
  useGetPropertyByCityLocalityQuery
} = propertyApi;