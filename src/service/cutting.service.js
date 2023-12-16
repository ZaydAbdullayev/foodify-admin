import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const cutting_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStCutting: builder.query({
      query: () => ({
        url: `get/cutting/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["cutting"],
    }),

    addStCutting: builder.mutation({
      query: (value) => ({
        url: "add/cutting",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["cutting"],
    }),

    updateStCutting: builder.mutation({
      query: (value) => ({
        url: `update/cutting/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["cutting"],
    }),

    deleteStCutting: builder.mutation({
      query: (id) => ({
        url: `delete/cutting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cutting"],
    }),
  }),
});

export const {
  useAddStCuttingMutation,
  useUpdateStCuttingMutation,
  useGetStCuttingQuery,
  useDeleteStCuttingMutation,
} = cutting_Api;
