import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inquiryApi = createApi({
  reducerPath: "inquiryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/inquiries",
    credentials: "include",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.accessToken) {
        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Inquiry"],
  endpoints: (builder) => ({
    // ✅ Create Enquiry
    createInquiry: builder.mutation({
      query: (formData) => ({
        url: "/inquiry",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Inquiry"],
    }),

    // ✅ Get All Enquiries
    getAllInquiries: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/inquiries?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Inquiry"],
    }),

    // ✅ Delete Enquiry
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/inquiry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useCreateInquiryMutation,
  useGetAllInquiriesQuery,
  useDeleteInquiryMutation,
} = inquiryApi;
