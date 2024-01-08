import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStCategory: builder.query({
      query: () => ({
        url: `get/${user?.user?.id}/categories`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    addStCategory: builder.mutation({
      query: (value) => ({
        url: "add/category",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["category"],
    }),

    updateStCategory: builder.mutation({
      query: (value) => ({
        url: `update/category/${value.id}`,
        method: "PATCH",
        body: {
          res_id: value.res_id,
          name: value.name,
          department: value.department,
        },
      }),
      invalidatesTags: ["category"],
    }),

    deleteStCategory: builder.mutation({
      query: (id) => ({
        url: `delete/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddStCategoryMutation,
  useUpdateStCategoryMutation,
  useGetStCategoryQuery,
  useDeleteStCategoryMutation,
} = categoryApi;
