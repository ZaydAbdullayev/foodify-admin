import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const carryUp_Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStCarryUp: builder.query({
      query: () => ({
        url: `get/moved/goods`,
        method: "GET",
      }),
      providesTags: ["carry-up"],
    }),

    addStCarryUp: builder.mutation({
      query: (value) => ({
        url: "move/goods",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["carry-up"],
    }),

    updateStCarryUp: builder.mutation({
      query: (value) => ({
        url: `update/carry-up/${value.id}`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["carry-up"],
    }),

    deleteStCarryUp: builder.mutation({
      query: (id) => ({
        url: `delete/carry-up/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carry-up"],
    }),

    calcStCarryUp: builder.mutation({
      query: (value) => ({
        url: `calculate/goods`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["carry-up"],
    }),
  }),
});

export const {
  useAddStCarryUpMutation,
  useUpdateStCarryUpMutation,
  useGetStCarryUpQuery,
  useDeleteStCarryUpMutation,
  useCalcStCarryUpMutation,
} = carryUp_Api;
