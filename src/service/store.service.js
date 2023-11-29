import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["store"],
  endpoints: (builder) => ({
    getStore: builder.query({
      query: () => ({
        url: `get/storage/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["store"],
    }),

    addStore: builder.mutation({
      query: (value) => ({
        url: "add/storage",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }),
      invalidatesTags: ["store"],
    }),

    updateStore: builder.mutation({
      query: (value) => ({
        url: `update/storage/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["store"],
    }),

    updateStItems: builder.mutation({
      query: (value) => ({
        url: `update/storageItems/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: { ingredients: JSON.stringify(value.ingredients) },
      }),
    }),

    deleteStore: builder.mutation({
      query: (value) => ({
        url: `delete/storage/${value}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      invalidatesTags: ["store"],
    }),
  }),
});

export const {
  useAddStoreMutation,
  useUpdateStoreMutation,
  useGetStoreQuery,
  useUpdateStItemsMutation,
  useDeleteStoreMutation,
} = storeApi;
