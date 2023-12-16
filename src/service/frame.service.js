import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const user = JSON?.parse(localStorage.getItem("user")) || [];

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vsxmzbb6-8081.euw.devtunnels.ms",
  prepareHeaders: (headers, { getState }) => {
    if (user?.token) {
      headers.set("Authorization", `Bearer ${user?.token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    window.location.assign("/login");
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "ingredient",
    "groups",
    "carry-up",
    "category",
    "cutting",
    "damaged",
    "department",
    "expenditure",
    "invoice-group",
    "invoices",
    "makingFood",
    "product",
    "s-products",
    "store",
    "suplier",
    "user",
    "order",
    "worker",
    "pre-order",
  ],
  endpoints: (builder) => ({}),
});
