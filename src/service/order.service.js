import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // path fro get all product list by restaurant id
    getProduct: builder.query({
      query: () => ({
        url: `/get/products/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["add-order"],
    }),

    getOrder: builder.query({
      query: (id) => ({
        url: `/get/myOrders/${id}`,
        method: "GET",
      }),
      providesTags: ["add-order"],
    }),

    // path for resolve order item
    resolveItem: builder.mutation({
      query: (value) => ({
        url: `/cancel/item`,
        method: "POST",
        body: value,
      }),
    }),

    getOrderByWaiterId: builder.query({
      query: (value) => ({
        url: `/get/waiter/orders/${user?.user?.id}/${value.start}/${value.end}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetProductQuery,
  useResolveItemMutation,
  useGetOrderByWaiterIdQuery,
} = storeApi;
