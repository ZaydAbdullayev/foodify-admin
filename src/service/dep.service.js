import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const departmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreDep: builder.query({
      query: () => ({
        url: `get/${user?.user?.id}/departments`,
        method: "GET",
      }),
      providesTags: ["department"],
    }),

    addStoreDep: builder.mutation({
      query: (value) => ({
        url: "add/department",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["department"],
    }),

    updateDep: builder.mutation({
      query: (value) => ({
        url: `update/department/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["department"],
    }),

    deleteDep: builder.mutation({
      query: (ids) => ({
        url: `delete/department`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["department"],
    }),
  }),
});

export const {
  useAddStoreDepMutation,
  useUpdateDepMutation,
  useGetStoreDepQuery,
  useDeleteDepMutation,
} = departmentApi;
