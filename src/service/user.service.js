import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // path for add product
    loginUser: builder.mutation({
      query: (value) => ({
        url: "login/admin",
        method: "POST",
        headers: {},
        body: value,
      }),
    }),

    // path for update product info by id
    checkDep: builder.mutation({
      query: (id) => ({
        url: `get/department/${user.user.id}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
           },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useCheckDepMutation } = userApi;
