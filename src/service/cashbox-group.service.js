import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashboxGr_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashboxGr: builder.query({
      query: () => ({
        url: `get/${user?.user?.id}/transactionGroups`,
        method: "GET",
      }),
      providesTags: ["tr-group"],
    }),

    addCashboxGr: builder.mutation({
      query: (value) => ({
        url: "add/transactionGroups",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["tr-group"],
    }),

    updateCashboxGr: builder.mutation({
      query: (value) => ({
        url: `update/transactionGroups/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["tr-group"],
    }),

    deleteCashboxGr: builder.mutation({
      query: (ids) => ({
        url: `delete/transactionGroups`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["tr-group"],
    }),
  }),
});

export const {
  useAddCashboxGrMutation,
  useUpdateCashboxGrMutation,
  useGetCashboxGrQuery,
  useDeleteCashboxGrMutation,
} = cashboxGr_Api;
