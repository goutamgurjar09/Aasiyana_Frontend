import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/auth",
    credentials: "include",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.accessToken) {
        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },

  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
    }),
    generateOtp: builder.mutation({
      query: (formData) => ({
        url: "/generate-otp",
        method: "POST",
        body: formData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: "/reset-password",
        method: "POST",
        body: formData,
      }),
    }),
    googleAuth: builder.mutation({
      query: (formData) => ({
        url: "/google-login",
        method: "POST",
        body: formData,
      }),
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "", role = "" }) =>
        `/users?page=${page}&limit=${limit}&search=${search}&role=${role}`,
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    googleLogin: builder.mutation({
      query: ({ data }) => ({
        url: `google-login`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    updateUserRole: builder.mutation({
      query: (formData) => ({
        url: "/update/user-role",
        method: "PATCH",
        body: formData,
      }),
    }),
    updateUser: builder.mutation({
    query: ({id, formData}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGenerateOtpMutation,
  useResetPasswordMutation,
  useGoogleAuthMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGoogleLoginMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useLogoutUserMutation
} = authApi;
