import { configureStore } from "@reduxjs/toolkit";
import { propertyApi } from "../features/propertyApi";
import { authApi } from "../features/authApi";
import { bookingApi } from "../features/bookingApi";
import { inquiryApi } from "../features/inquiryApi";
import { customerApi } from "../features/customerApi";


export const store = configureStore({
  reducer: {
    [propertyApi.reducerPath]: propertyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath] : bookingApi.reducer,
    [inquiryApi.reducerPath] : inquiryApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApi.middleware)
      .concat(authApi.middleware)
      .concat(bookingApi.middleware)
      .concat(inquiryApi.middleware)
      .concat(customerApi.middleware),
});
