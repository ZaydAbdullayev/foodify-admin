import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const makingFood_api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMakedFood: builder.query({
      query: () => ({
        url: `get/preparedFoods/${user?.user.id}`,
        method: "GET",
      }),
      providesTags: ["makingFood"],
    }),

    addMakingFood: builder.mutation({
      query: (value) => ({
        url: "make/food",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["makingFood"],
    }),

    updateMakedFood: builder.mutation({
      query: (value) => ({
        url: `update/preparedFoods/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["makingFood"],
    }),

    deleteMakedFood: builder.mutation({
      query: (id) => ({
        url: `delete/preparedFoods/${id}`,
        method: "DELETE",
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
