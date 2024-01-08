import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // path for add product
    loginUser: builder.mutation({
      query: (value) => ({
        url: "/login/admin",
        method: "POST",
        headers: {},
        body: value,
      }),
    }),

    // path for update product info by id
    checkDep: builder.mutation({
      query: (pin) => ({
        url: `/check/worker/${user?.user?.id}/${pin}`,
        method: "POST",
      }),
    }),

    // path for  get  all department
    getDep: builder.query({
      query: (id) => ({
        url: `/get/dep/${id}`,
        method: "GET",
      }),
    }), //path for login department

    getDepW: builder.query({
      query: (id) => ({
        url: `/get/depW/${id}`,
        method: "GET",
      }),
    }),

    loginDep: builder.mutation({
      query: (value) => ({
        url: "/login/worker",
        method: "POST",
        body: value,
      }),
    }),

    permission: builder.mutation({
      query: (value) => ({
        url: `/add/loginInfo/${user?.user?.id}`,
        method: "PATCH",
        body: value,
      }),
    }),

    // /get/resOrders/:resId/:start/:end
    getPaymentOrder: builder.query({
      query: (date) => ({
        url: `/get/resOrders/${user?.user?.id}/${date.start}/${date.end}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    getpOrder: builder.query({
      query: (id) => ({
        url: `/get/oneOrder/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    paymentOrder: builder.mutation({
      query: (data) => ({
        url: `/update/payment/status/${data?.id}`,
        method: "PATCH",
        body: {
          payment_status: data?.status,
          payment_type: data?.payment_type,
          payment: data?.payment,
          role: data.role,
          cashier: data.cashier,
        },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCheckDepMutation,
  useLoginDepMutation,
  useGetDepQuery,
  usePermissionMutation,
  useGetPaymentOrderQuery,
  useGetpOrderQuery,
  useGetDepWQuery,
  usePaymentOrderMutation,
} = userApi;
