import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const suplierApi = createApi({
  reducerPath: "suplierApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["suplier"],
  endpoints: (builder) => ({
    getStSuplier: builder.query({
      query: () => ({
        url: `get/suppliers/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["suplier"],
    }),

    addStSuplier: builder.mutation({
      query: (value) => ({
        url: `add/supplier`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["suplier"],
    }),

    updateStSuplier: builder.mutation({
      query: (value) => ({
        url: `update/suppliers/${value.id}`,
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
      invalidatesTags: ["suplier"],
    }),

    deleteStSuplier: builder.mutation({
      query: (id) => ({
        url: `delete/suppliers/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["suplier"],
    }),
  }),
});

export const {
  useAddStSuplierMutation,
  useUpdateStSuplierMutation,
  useGetStSuplierQuery,
  useDeleteStSuplierMutation,
} = suplierApi;
