import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const transactionRapor_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionRapor: builder.query({
      query: () => ({
        url: `get/transactions/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["transaction-report"],
    }),
    getTransactionIncome: builder.query({
      query: (date) => ({
        url: `get/incomeTransactions/${user?.user?.id}/${date?.start}/${date?.end}`,
        method: "GET",
      }),
      providesTags: ["transaction-report"],
    }),
    getTransactionExpense: builder.query({
      query: (date) => ({
        url: `get/expenseTransactions/${user?.user?.id}/${date?.start}/${date?.end}`,
        method: "GET",
      }),
      providesTags: ["transaction-report"],
    }),
    getTransaction: builder.query({
      query: (date) => ({
        url: `get/transactionsTable/${user?.user?.id}/${date.start}/${date.end}`,
        method: "GET",
      }),
      providesTags: ["transaction-report"],
    }),
    getBalance: builder.query({
      query: (date) => ({
        url: `get/balance/${user?.user?.id}/${date?.start}`,
        method: "GET",
      }),
      providesTags: ["transaction-report"],
    }),
    addTransactionRapor: builder.mutation({
      query: (value) => ({
        url: "add/transactionTable",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["transaction-report"],
    }),

    updateTransactionRapor: builder.mutation({
      query: (value) => ({
        url: `update/transactionTable/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["transaction-report"],
    }),

    deleteTransactionRapor: builder.mutation({
      query: (ids) => ({
        url: `delete/transaction`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["transaction-report"],
    }),
  }),
});

export const {
  useAddTransactionRaporMutation,
  useUpdateTransactionRaporMutation,
  useGetTransactionRaporQuery,
  useDeleteTransactionRaporMutation,
  useGetTransactionExpenseQuery,
  useGetTransactionIncomeQuery,
  useGetTransactionQuery,
  useGetBalanceQuery,
} = transactionRapor_Api;
