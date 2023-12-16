import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const damaged_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStDamaged: builder.query({
      query: () => ({
        url: `get/damagedGoods/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["damaged"],
    }),

    addStDamaged: builder.mutation({
      query: (value) => ({
        url: "add/damagedGoods",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["damaged"],
    }),

    updateStDamaged: builder.mutation({
      query: (value) => ({
        url: `update/damagedGoods/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["damaged"],
    }),

    deleteStDamaged: builder.mutation({
      query: (id) => ({
        url: `delete/damagedGoods/${id}`,
        method: "DELETE",
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
