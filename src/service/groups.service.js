import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const GroupsApi = createApi({
  reducerPath: "GroupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["groups"],
  endpoints: (builder) => ({
    getStGroups: builder.query({
      query: () => ({
        url: `get/storage/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["groups"],
    }),

    addStGroups: builder.mutation({
      query: (value) => ({
        url: "add/storage",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }),
      invalidatesTags: ["groups"],
    }),

    updateStGroups: builder.mutation({
      query: (value) => ({
        url: `update/storage/${value.id}`,
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
} = GroupsApi;
