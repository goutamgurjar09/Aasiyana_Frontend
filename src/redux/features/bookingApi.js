import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/bookings",
    credentials: "include",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.accessToken) {
        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },

  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/create-booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookings: builder.query({
      query: ({ page = 1, limit = 10, status = "", name = "" }) =>
        `/get-bookings?page=${page}&limit=${limit}&status=${status}&name=${name}`,
      providesTags: ["Booking"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/delete-booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-status`,
        method: "PATCH",
        body: { id, status },
      }),
      invalidatesTags: ["Booking"],
    }),
    getTotalRevenue: builder.query({
      query: () => "/total-revenue",
      providesTags: ["Booking"],
    }),
    getTotalBookingStatusCount: builder.query({
      query: () => "/total-booking-status-count",
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  useGetTotalRevenueQuery,
  useGetTotalBookingStatusCountQuery,
} = bookingApi;
