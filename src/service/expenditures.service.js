import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const expenditures_Api = createApi({
  reducerPath: "expenditures_Api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["expenditure"],
  endpoints: (builder) => ({
    getStExpenditure: builder.query({
      query: () => ({
        url: `get/usedGoods/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["expenditure"],
    }),

    addStExpenditure: builder.mutation({
      query: (value) => ({
        url: "add/usedGoods",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateStExpenditure: builder.mutation({
      query: (value) => ({
        url: `update/usedGoods/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: {
          res_id: value.res_id,
          name: value.name,
          department: value.department,
        },
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteStExpenditure: builder.mutation({
      query: (id) => ({
        url: `delete/usedGoods/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
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
