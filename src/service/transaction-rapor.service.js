import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const transactionRapor_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionRapor: builder.query({
      query: () => ({
        url: `get/transactions/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),
    getTransactionIncome: builder.query({
      query: (date) => ({
        url: `get/incomeTransactions/${user?.user?.id}/${date?.start}/${date?.end}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),
    getTransactionExpense: builder.query({
      query: (date) => ({
        url: `get/expenseTransactions/${user?.user?.id}/${date?.start}/${date?.end}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),
    getTransaction: builder.query({
      query: (date) => ({
        url: `get/transactionsTable/${user?.user?.id}/${date.start}/${date.end}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),
    getBalance: builder.query({
      query: (date) => ({
        url: `get/balance/${user?.user?.id}/${date?.start}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),
    addTransactionRapor: builder.mutation({
      query: (value) => ({
        url: "add/transactionTable",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateTransactionRapor: builder.mutation({
      query: (value) => ({
        url: `update/transactionTable/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteTransactionRapor: builder.mutation({
      query: (id) => ({
        url: `delete/transaction/${id}`,
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
  useGetTransactionExpenseQuery,
  useGetTransactionIncomeQuery,
  useGetTransactionQuery,
  useGetBalanceQuery,
} = transactionRapor_Api;
