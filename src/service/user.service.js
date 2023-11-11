import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["user"],
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
        url: `/check/worker/${pin}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // path for  get  all department
    getDep: builder.query({
      query: (id) => ({
        url: `/get/dep/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }), //path for login department

    loginDep: builder.mutation({
      query: (value) => ({
        url: "/login/worker",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
    }),

    permission: builder.mutation({
      query: (value) => ({
        url: `/add/loginInfo/${user?.user?.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
    }),

    // /get/resOrders/:resId/:start/:end
    getPaymentOrder: builder.query({
      query: (date) => ({
        url: `/get/resOrders/${user?.user?.id}/${date.start}/${date.end}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    getpOrder: builder.query({
      query: (id) => ({
        url: `/get/oneOrder/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
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
} = userApi;
