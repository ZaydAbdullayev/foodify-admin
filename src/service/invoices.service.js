import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const invoices_Api = createApi({
  reducerPath: "invoices_Api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["invoices"],
  endpoints: (builder) => ({
    getStInvoice: builder.query({
      query: () => ({
        url: `get/receivedGoods/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["invoices"],
    }),

    addStInvoice: builder.mutation({
      query: (value) => ({
        url: "add/receivedGoods",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["invoices"],
    }),

    updateStInvoice: builder.mutation({
      query: (value) => ({
        url: `update/receivedGoods/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: {
          res_id: value.res_id,
          name: value.name,
          department: value.department,
        },
      }),
      invalidatesTags: ["invoices"],
    }),

    deleteStInvoice: builder.mutation({
      query: (id) => ({
        url: `delete/receivedGoods/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["invoices"],
    }),

    getStorageItems: builder.query({
      query: (id) => ({
        url: `get/storageItems/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["invoices"],
    }),
  }),
});

export const {
  useAddStInvoiceMutation,
  useUpdateStInvoiceMutation,
  useGetStInvoiceQuery,
  useDeleteStInvoiceMutation,
  useGetStorageItemsQuery,
} = invoices_Api;
