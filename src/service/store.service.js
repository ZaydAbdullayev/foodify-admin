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
        body: JSON.stringify(value),
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
    }),

    updateItems: builder.mutation({
      query: (value) => ({
        url: `update/storageItems/${value.id}`,
        method: "PATCH",
        body: { ingredients: value?.ing },
      }),
      invalidatesTags: ["store"],
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

// ingredients: '[{"id":"5d49b2","name":"hamir","unit":"kg","group":"chuchvaralar","res_id":"2899b5","price":1200,"type":"Ingredient","storage_id":"296142","amount":"1","old_quantity":0,"total_quantity":1},{"id":"777d2b","name":"sharbat","unit":"l","group":"ichimliklar","res_id":"2899b5","price":"1000","type":"Ingredient","storage_id":null,"amount":"1"},{"id":"8a7def","name":"Salat bargi","unit":"ta","group":"sabzavotlar","res_id":"2899b5","price":100,"type":"Ingredient","storage_id":null,"amount":"1"}]';
