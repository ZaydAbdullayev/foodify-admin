import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const s_productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStProduct: builder.query({
      query: () => ({
        url: `get/foods/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["s-products", "product"],
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
        url: `delete/food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["s-products"],
    }),

    deleteStProducts: builder.mutation({
      query: (ids) => ({
        url: `delete/foods`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["s-products"],
    }),

    updateStProductImage: builder.mutation({
      query: (value) => ({
        url: `update/productImg/${value.id}`,
        method: "PATCH",
        body: {
          img: value?.image,
          deleteImg: value.deleteImg,
        },
        formData: true,
      }),
      invalidatesTags: ["s-products"],
    }),

    getStProductById: builder.query({
      query: (id) => ({
        url: `get/oneFood/${id}`,
        method: "GET",
      }),
      providesTags: ["s-products", "product"],
    }),
  }),
});

export const {
  useAddStProductMutation,
  useUpdateStProductMutation,
  useGetStProductQuery,
  useDeleteStProductMutation,
  useUpdateStProductImageMutation,
  useGetStProductByIdQuery,
  useDeleteStProductsMutation,
} = s_productApi;
