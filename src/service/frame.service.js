import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const user = JSON?.parse(localStorage.getItem("user")) || [];
// const base_url = "https://backend.foodify.uz";
const base_url = "https://bvtrj1n0-8081.euw.devtunnels.ms";

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
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
    "transaction",
    "transaction-group",
    "cashbox",
    "cashbox-report",
    "cashbox-transaction",
    "table",
    "navigation",
    "rejects",
    "supplier",
    "add-order",
    "inventory",
  ],
  endpoints: (builder) => ({}),
});
