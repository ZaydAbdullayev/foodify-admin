import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const invoicegr_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStInvoiceGroup: builder.query({
      query: () => ({
        url: `get/InvoiceGroups/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["invoice-group"],
    }),

    addStInvoiceGroup: builder.mutation({
      query: (value) => ({
        url: "add/invoiceGroup",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["invoice-group"],
    }),

    updateStInvoiceGroup: builder.mutation({
      query: (value) => ({
        url: `update/invoiceGroup/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["invoice-group"],
    }),

    deleteStInvoiceGroup: builder.mutation({
      query: (id) => ({
        url: `delete/invoiceGroup/${id}`,
        method: "DELETE",
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
