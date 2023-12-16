import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const ingredientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStIngredients: builder.query({
      query: () => ({
        url: `get/ingredients/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["ingredient"],
    }),

    addStIngredients: builder.mutation({
      query: (value) => ({
        url: "add/ingredient",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["ingredient"],
    }),

    updateStIngredients: builder.mutation({
      query: (value) => ({
        url: `update/ingredient/${value.id}`,
        method: "PATCH",
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
