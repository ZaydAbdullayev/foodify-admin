import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const expenditures_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStExpenditure: builder.query({
      query: () => ({
        url: `get/usedGoods/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),

    addStExpenditure: builder.mutation({
      query: (value) => ({
        url: "add/usedGoods",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateStExpenditure: builder.mutation({
      query: (value) => ({
        url: `update/usedGoods/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteStExpenditure: builder.mutation({
      query: (ids) => ({
        url: `delete/usedGoods`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["expenditure"],
    }),
  }),
});

export const {
  useAddStExpenditureMutation,
  useUpdateStExpenditureMutation,
  useGetStExpenditureQuery,
  useDeleteStExpenditureMutation,
} = expenditures_Api;
