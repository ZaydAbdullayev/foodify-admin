import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStore: builder.query({
      query: () => ({
        url: `get/storage/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["store"],
    }),

    addStore: builder.mutation({
      query: (value) => ({
        url: "add/storage",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["store"],
    }),

    updateStore: builder.mutation({
      query: (value) => ({
        url: `update/storage/${value.id}`,
        method: "PATCH",
        body: { res_id: value.res_id, name: value.name },
      }),
      invalidatesTags: ["store"],
    }),

    updateStItems: builder.mutation({
      query: (value) => ({
        url: "update/storageItems",
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["inventory"],
    }),

    updateItems: builder.mutation({
      query: (value) => ({
        url: `update/storageItems/${value.id}`,
        method: "PATCH",
        body: { ingredients: value?.ing },
      }),
      invalidatesTags: ["inventory"],
    }),

    deleteStore: builder.mutation({
      query: (value) => ({
        url: `delete/storage/${value}`,
        method: "DELETE",
      }),
      invalidatesTags: ["store"],
    }),
  }),
});

export const {
  useAddStoreMutation,
  useUpdateStoreMutation,
  useGetStoreQuery,
  useUpdateStItemsMutation,
  useDeleteStoreMutation,
  useUpdateItemsMutation,
} = storeApi;
