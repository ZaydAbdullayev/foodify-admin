import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => ({
        url: `/get/tlocations/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["table"],
    }),
    getTables: builder.query({
      query: (location) => ({
        url: `/get/tables/${user?.user?.id}/${location}`,
        method: "GET",
      }),
      providesTags: ["table"],
    }),
    getTable: builder.query({
      query: (id) => ({
        url: `/get/table/${id}`,
        method: "GET",
      }),
      providesTags: ["table"],
    }),

    addTable: builder.mutation({
      query: (value) => ({
        url: `add/table`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["table"],
    }),

    updateStSuplier: builder.mutation({
      query: (value) => ({
        url: `update/suppliers/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["table"],
    }),

    deleteStSuplier: builder.mutation({
      query: (id) => ({
        url: `delete/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["table"],
    }),
  }),
});

export const {
  useAddTableMutation,
  useGetTableQuery,
  useGetTablesQuery,
  useUpdateStSuplierMutation,
  useGetLocationQuery,
  useDeleteStSuplierMutation,
} = tableApi;
