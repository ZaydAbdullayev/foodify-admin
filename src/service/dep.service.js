import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["department"],
  endpoints: (builder) => ({
    getStoreDep: builder.query({
      query: () => ({
        url: `get/${user?.user?.id}/departments`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["department"],
    }),

    addStoreDep: builder.mutation({
      query: (value) => ({
        url: "add/department",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["department"],
    }),

    updateDep: builder.mutation({
      query: (value) => ({
        url: `update/department/${value.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["department"],
    }),
  }),
});

export const {
  useAddStoreDepMutation,
  useUpdateDepMutation,
  useGetStoreDepQuery,
} = departmentApi;
