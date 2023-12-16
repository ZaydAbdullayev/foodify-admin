import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const invoices_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStInvoice: builder.query({
      query: () => ({
        url: `get/receivedGoods/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),

    addStInvoice: builder.mutation({
      query: (value) => ({
        url: "add/receivedGoods",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["invoices"],
    }),

    updateStInvoice: builder.mutation({
      query: (value) => ({
        url: `update/receivedGoods/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["invoices"],
    }),

    deleteStInvoice: builder.mutation({
      query: (id) => ({
        url: `delete/receivedGoods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),

    getStorageItems: builder.query({
      query: (id) => ({
        url: `get/storageItems/${user?.user?.id}/${id}`,
        method: "GET",
      }),
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
