import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSync: builder.query({
      query: () => ({
        url: `/get/syncStorage/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["inventory"],
    }),

    addSync: builder.mutation({
      query: (value) => ({
        url: `/sync/storage`,
        method: "POST",
        body: value,
      }),
      providesTags: ["inventory"],
    }),
  }),
});

export const { useAddSyncMutation, useGetSyncQuery } = storeApi;
