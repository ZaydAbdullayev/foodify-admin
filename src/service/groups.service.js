import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["groups"],
  endpoints: (builder) => ({
    getStGroups: builder.query({
      query: () => ({
        url: `get/ingredientGroups/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["groups"],
    }),

    addStGroups: builder.mutation({
      query: (value) => ({
        url: "add/ingredientGroup",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["groups"],
    }),

    updateStGroups: builder.mutation({
      query: (value) => ({
        url: `update/ingredientGroup/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["groups"],
    }),
  }),
});

export const {
  useAddStGroupsMutation,
  useUpdateStGroupsMutation,
  useGetStGroupsQuery,
} = groupsApi;
