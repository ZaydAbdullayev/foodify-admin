import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashboxGr_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashboxGr: builder.query({
      query: () => ({
        url: `get/${user?.user?.id}/transactionGroups`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),

    addCashboxGr: builder.mutation({
      query: (value) => ({
        url: "add/transactionGroups",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateCashboxGr: builder.mutation({
      query: (value) => ({
        url: `update/transactionGroups/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteCashboxGr: builder.mutation({
      query: (id) => ({
        url: `delete/transactionGroups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenditure"],
    }),
  }),
});

export const {
  useAddCashboxGrMutation,
  useUpdateCashboxGrMutation,
  useGetCashboxGrQuery,
  useDeleteCashboxGrMutation,
} = cashboxGr_Api;
