import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashTransaction_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashTransaction: builder.query({
      query: () => ({
        url: `get/transactions/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),

    addCashTransaction: builder.mutation({
      query: (value) => ({
        url: "add/transaction",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateCashTransaction: builder.mutation({
      query: (value) => ({
        url: `update/transaction/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteCashTransaction: builder.mutation({
      query: (id) => ({
        url: `delete/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenditure"],
    }),
  }),
});

export const {
  useAddCashTransactionMutation,
  useUpdateCashTransactionMutation,
  useGetCashTransactionQuery,
  useDeleteCashTransactionMutation,
} = cashTransaction_Api;
