import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const carryUp_Api = createApi({
  reducerPath: "carryUp_Api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["carry-up"],
  endpoints: (builder) => ({
    getStCarryUp: builder.query({
      query: () => ({
        url: `get/carry-up/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["carry-up"],
    }),

    addStCarryUp: builder.mutation({
      query: (value) => ({
        url: "add/carry-up",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["carry-up"],
    }),

    updateStCarryUp: builder.mutation({
      query: (value) => ({
        url: `update/carry-up/${value.id}`,
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
      invalidatesTags: ["carry-up"],
    }),

    deleteStCarryUp: builder.mutation({
      query: (id) => ({
        url: `delete/carry-up/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["carry-up"],
    }),
  }),
});

export const {
  useAddStCarryUpMutation,
  useUpdateStCarryUpMutation,
  useGetStCarryUpQuery,
  useDeleteStCarryUpMutation,
} = carryUp_Api;
