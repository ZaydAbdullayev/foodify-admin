import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const CategoryApi = createApi({
  reducerPath: "CategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getStCategory: builder.query({
      query: () => ({
        url: `get/storage/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["category"],
    }),

    addStCategory: builder.mutation({
      query: (value) => ({
        url: "add/storage",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }),
      invalidatesTags: ["category"],
    }),

    updateStCategory: builder.mutation({
      query: (value) => ({
        url: `update/storage/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddStCategoryMutation,
  useUpdateStCategoryMutation,
  useGetStCategoryQuery,
} = CategoryApi;
