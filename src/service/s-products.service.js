import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const s_productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStProduct: builder.query({
      query: () => ({
        url: `get/foods/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["s-products"],
    }),

    addStProduct: builder.mutation({
      query: (value) => ({
        url: "add/food",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["s-products"],
    }),

    updateStProduct: builder.mutation({
      query: (value) => ({
        url: `update/foods/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["s-products"],
    }),

    deleteStProduct: builder.mutation({
      query: (id) => ({
        url: `delete/foods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["s-products"],
    }),
  }),
});

export const {
  useAddStProductMutation,
  useUpdateStProductMutation,
  useGetStProductQuery,
  useDeleteStProductMutation,
} = s_productApi;
