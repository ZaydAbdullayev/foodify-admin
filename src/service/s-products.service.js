import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const s_productApi = createApi({
  reducerPath: "s_productApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getStProduct: builder.query({
      query: () => ({
        url: `get/foods/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["category"],
    }),

    addStProduct: builder.mutation({
      query: (value) => ({
        url: "add/food",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["category"],
    }),

    updateStProduct: builder.mutation({
      query: (value) => ({
        url: `update/foods/${value.id}`,
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
      invalidatesTags: ["category"],
    }),

    deleteStProduct: builder.mutation({
      query: (id) => ({
        url: `delete/foods/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddStProductMutation,
  useUpdateStProductMutation,
  useGetStProductQuery,
  useDeleteStProductMutation,
} = s_productApi;
