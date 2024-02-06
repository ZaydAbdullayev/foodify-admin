import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashbox_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashbox: builder.query({
      query: () => ({
        url: `get/cashbox/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["cashbox"],
    }),

    addCashbox: builder.mutation({
      query: (value) => ({
        url: "add/cashbox",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["cashbox"],
    }),

    updateCashbox: builder.mutation({
      query: (value) => ({
        url: `update/cashbox/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["cashbox"],
    }),

    deleteCashbox: builder.mutation({
      query: (ids) => ({
        url: `delete/cashbox`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["cashbox"],
    }),
  }),
});

export const {
  useAddCashboxMutation,
  useUpdateCashboxMutation,
  useGetCashboxQuery,
  useDeleteCashboxMutation,
} = cashbox_Api;
