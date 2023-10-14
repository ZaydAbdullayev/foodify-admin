import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
// const base_url = "https://lncxlmks-8081.inc1.devtunnels.ms/";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const universalAPi = createApi({
  reducerPath: "universalApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // path for get all products
    getAllProduct: builder.query({
      query: () => ({
        url: `get/products/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["product"],
    }),

    // path for add product
    addProduct: builder.mutation({
      query: (value) => ({
        url: "add/product",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
        body: value,
      }),
      invalidatesTags: ["product"],
    }),

    // path for update product info by id
    updatePbyId: builder.mutation({
      query: (product) => ({
        url: `update/product/${product.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: product,
      }),
      invalidatesTags: ["product"],
    }),

    // path for update product img by id
    updatePimgById: builder.mutation({
      query: (product) => ({
        url: `update/productImg/${product.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
        body: {
          img: product?.img,
          deleteImg: product.deleteImg,
        },
      }),
      invalidatesTags: ["product"],
    }),

    // path  for delete product by id
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `delete/product/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["product"],
    }),

    // path for get departments for add products
    getDepartments: builder.query({
      query: (id) => ({
        url: `get/departments/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["product"],
    }),

    getByDate: builder.query({
      query: (point) => ({
        url: `get/departmentSales/${user?.user?.id}/${point?.fdate}/${point?.tdate}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // /get/departmentProfit/:resId/:department/:start/:end
    getDepProducts: builder.query({
      query: (point) => ({
        url: `get/departmentProfit/${user?.user?.id}/${point?.dep}/${point?.start}/${point?.end}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useAddProductMutation,
  useUpdatePbyIdMutation,
  useUpdatePimgByIdMutation,
  useDeleteProductMutation,
  useGetDepartmentsQuery,
  useGetByDateQuery,
  useGetDepProductsQuery,
} = universalAPi;
