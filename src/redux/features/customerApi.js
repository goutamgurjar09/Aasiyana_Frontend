import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/customers", // change to your backend URL if deployed
    credentials: "include",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.accessToken) {
        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },

  }),
  tagTypes: ["Customer"],

  endpoints: (builder) => ({
    // ✅ Create Customer
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),

    // ✅ Get All Customers
    getAllCustomers: builder.query({
      query: () => "/customers",
      providesTags: ["Customer"],
    }),

    // ✅ Get Single Customer by ID
    getCustomerById: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ["Customer"],
    }),

    // ✅ Delete Customer
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    // ✅ (Optional) Update Customer
    updateCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
