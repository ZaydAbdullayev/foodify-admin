import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["ingredient"],
  endpoints: (builder) => ({
    getStIngredients: builder.query({
      query: () => ({
        url: `get/ingredients/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["ingredient"],
    }),

    addStIngredients: builder.mutation({
      query: (value) => ({
        url: "add/ingredient",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["ingredient"],
    }),

    updateStIngredients: builder.mutation({
      query: (value) => ({
        url: `update/ingredient/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: {
          res_id: value.res_id,
          name: value.name,
          unit: value.unit,
          group: value.group,
        },
      }),
      invalidatesTags: ["ingredient"],
    }),

    deleteStIngredients: builder.mutation({
      query: (id) => ({
        url: `delete/ingredient/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ingredient"],
    }),
  }),
});

export const {
  useAddStIngredientsMutation,
  useUpdateStIngredientsMutation,
  useGetStIngredientsQuery,
  useDeleteStIngredientsMutation,
} = ingredientApi;