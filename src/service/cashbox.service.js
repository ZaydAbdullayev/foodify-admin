import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cashbox_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashbox: builder.query({
      query: () => ({
        url: `get/cashbox/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["expenditure"],
    }),

    addCashbox: builder.mutation({
      query: (value) => ({
        url: "add/cashbox",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    updateCashbox: builder.mutation({
      query: (value) => ({
        url: `update/cashbox/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["expenditure"],
    }),

    deleteCashbox: builder.mutation({
      query: (id) => ({
        url: `delete/cashbox/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenditure"],
    }),
  }),
});

export const {
  useAddCashboxMutation,
  useUpdateCashboxMutation,
  useGetCashboxQuery,
  useDeleteCashboxMutation,
} = cashbox_Api;
