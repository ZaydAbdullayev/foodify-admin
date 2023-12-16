import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const transactionRapor_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionRapor: builder.query({
      query: () => ({
        url: `get/cashbox-trans/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),

    addTransactionRapor: builder.mutation({
      query: (value) => ({
        url: "add/cashbox-trans",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateTransactionRapor: builder.mutation({
      query: (value) => ({
        url: `update/cashbox-trans/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteTransactionRapor: builder.mutation({
      query: (id) => ({
        url: `delete/cashbox-trans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenditure"],
    }),
  }),
});

export const {
  useAddTransactionRaporMutation,
  useUpdateTransactionRaporMutation,
  useGetTransactionRaporQuery,
  useDeleteTransactionRaporMutation,
} = transactionRapor_Api;
