import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const universalAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // path for get all products
    getAllProduct: builder.query({
      query: () => ({
        url: `get/products/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    // path for add product
    addProduct: builder.mutation({
      query: (value) => ({
        url: "add/product",
        method: "POST",
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
      }),
      invalidatesTags: ["product"],
    }),

    // path for get departments for add products
    getDepartments: builder.query({
      query: (id) => ({
        url: `get/departments/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getByDate: builder.query({
      query: (point) => ({
        url: `get/departmentSales/${user?.user?.id}/${point?.fdate}/${point?.tdate}`,
        method: "GET",
      }),
    }),

    // /get/departmentProfit/:resId/:department/:start/:end
    getDepProducts: builder.query({
      query: (point) => ({
        url: `get/departmentProfit/${user?.user?.id}/${point?.dep}/${point?.start}/${point?.end}`,
        method: "GET",
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
