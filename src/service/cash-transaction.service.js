import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashTransaction_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashTransaction: builder.query({
      query: () => ({
        url: `get/transactions/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["cashbox-transaction"],
    }),

    addCashTransaction: builder.mutation({
      query: (value) => ({
        url: "add/transaction",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["cashbox-transaction"],
    }),

    updateCashTransaction: builder.mutation({
      query: (value) => ({
        url: `update/transaction/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["cashbox-transaction"],
    }),

    deleteCashTransaction: builder.mutation({
      query: (ids) => ({
        url: `delete/transaction`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["cashbox-transaction"],
    }),
  }),
});

export const {
  useAddCashTransactionMutation,
  useUpdateCashTransactionMutation,
  useGetCashTransactionQuery,
  useDeleteCashTransactionMutation,
} = cashTransaction_Api;
