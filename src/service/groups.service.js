import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStGroups: builder.query({
      query: () => ({
        url: `get/ingredientGroups/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["groups"],
    }),

    addStGroups: builder.mutation({
      query: (value) => ({
        url: "add/ingredientGroup",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["groups"],
    }),

    updateStGroups: builder.mutation({
      query: (value) => ({
        url: `update/ingredientGroup/${value.id}`,
        method: "PATCH",
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["groups"],
    }),

    deleteStGroups: builder.mutation({
      query: (value) => ({
        url: "delete/ingredientGroup",
        method: "DELETE",
        body: value,
      }),
      invalidatesTags: ["groups"],
    }),
  }),
});

export const {
  useAddStGroupsMutation,
  useUpdateStGroupsMutation,
  useGetStGroupsQuery,
  useDeleteStGroupsMutation,
} = groupsApi;
