import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const damaged_Api = createApi({
  reducerPath: "damaged_Api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["damaged"],
  endpoints: (builder) => ({
    getStDamaged: builder.query({
      query: () => ({
        url: `get/cutting/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["damaged"],
    }),

    addStDamaged: builder.mutation({
      query: (value) => ({
        url: "add/cutting",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["damaged"],
    }),

    updateStDamaged: builder.mutation({
      query: (value) => ({
        url: `update/cutting/${value.id}`,
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
      invalidatesTags: ["damaged"],
    }),

    deleteStDamaged: builder.mutation({
      query: (id) => ({
        url: `delete/cutting/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["damaged"],
    }),
  }),
});

export const {
  useAddStDamagedMutation,
  useUpdateStDamagedMutation,
  useGetStDamagedQuery,
  useDeleteStDamagedMutation,
} = damaged_Api;
