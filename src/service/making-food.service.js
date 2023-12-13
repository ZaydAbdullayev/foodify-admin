import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const makingFood_api = createApi({
  reducerPath: "makingFood_api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["makingFood"],
  endpoints: (builder) => ({
    getMakedFood: builder.query({
      query: () => ({
        url: `get/preparedFoods/${user?.user.id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["makingFood"],
    }),

    addMakingFood: builder.mutation({
      query: (value) => ({
        url: "make/food",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["makingFood"],
    }),

    updateMakedFood: builder.mutation({
      query: (value) => ({
        url: `update/preparedFoods/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["makingFood"],
    }),

    deleteMakedFood: builder.mutation({
      query: (id) => ({
        url: `delete/preparedFoods/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useAddMakingFoodMutation,
  useDeleteMakedFoodMutation,
  useGetMakedFoodQuery,
  useUpdateMakedFoodMutation,
} = makingFood_api;
