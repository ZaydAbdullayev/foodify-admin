import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const invoicegr_Api = createApi({
  reducerPath: "invoicegr_Api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["invoice-group"],
  endpoints: (builder) => ({
    getStInvoiceGroup: builder.query({
      query: () => ({
        url: `get/InvoiceGroups/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["invoice-group"],
    }),

    addStInvoiceGroup: builder.mutation({
      query: (value) => ({
        url: "add/invoiceGroup",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["invoice-group"],
    }),

    updateStInvoiceGroup: builder.mutation({
      query: (value) => ({
        url: `update/invoiceGroup/${value.id}`,
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
      invalidatesTags: ["invoice-group"],
    }),

    deleteStInvoiceGroup: builder.mutation({
      query: (id) => ({
        url: `delete/invoiceGroup/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["invoice-group"],
    }),
  }),
});

export const {
  useAddStInvoiceGroupMutation,
  useDeleteStInvoiceGroupMutation,
  useGetStInvoiceGroupQuery,
  useUpdateStInvoiceGroupMutation,
} = invoicegr_Api;
