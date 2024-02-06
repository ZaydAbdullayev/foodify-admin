import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const preOrder_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreOrder: builder.query({
      query: () => ({
        url: `get/preOrders/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["pre-order"],
    }),

    addPreOrder: builder.mutation({
      query: (value) => ({
        url: "add/preOrders",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["pre-order"],
    }),

    updatePreOrder: builder.mutation({
      query: (value) => ({
        url: `update/preOrders/${value.id}`,
        method: "PATCH",
        body: {
          res_id: value.res_id,
          name: value.name,
          department: value.department,
        },
      }),
      invalidatesTags: ["pre-order"],
    }),

    deletePreOrder: builder.mutation({
      query: (ids) => ({
        url: `delete/preOrders`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["pre-order"],
    }),
  }),
});

export const {
  useAddPreOrderMutation,
  useDeletePreOrderMutation,
  useGetPreOrderQuery,
  useUpdatePreOrderMutation,
} = preOrder_Api;
