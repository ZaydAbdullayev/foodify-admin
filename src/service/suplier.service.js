import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const suplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStSuplier: builder.query({
      query: () => ({
        url: `get/suppliers/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["suplier"],
    }),

    addStSuplier: builder.mutation({
      query: (value) => ({
        url: `add/supplier`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["suplier"],
    }),

    updateStSuplier: builder.mutation({
      query: (value) => ({
        url: `update/suppliers/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["suplier"],
    }),

    deleteStSuplier: builder.mutation({
      query: (id) => ({
        url: `delete/suppliers/${id}`,
        method: "DELETE",
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
