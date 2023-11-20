import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const workerService = createApi({
  reducerPath: "workerService",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["worker"],
  endpoints: (builder) => ({
    // path for add worker
    addWorker: builder.mutation({
      query: (data) => ({
        url: "/add/worker",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["worker"],
    }),

    // path for get all res's workers
    getWorkers: builder.query({
      query: () => ({
        url: `/get/workers/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["worker"],
    }),

    // path for update worker's info by id
    updateWorker: builder.mutation({
      query: (worker) => ({
        url: `/update/worker/${worker.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: worker,
      }),
      invalidatesTags: ["worker"],
    }),

    // path for delete worker by id
    deleteWorker: builder.mutation({
      query: (id) => ({
        url: `/delete/worker/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      invalidatesTags: ["worker"],
    }),
  }),
});

export const {
  useAddWorkerMutation,
  useDeleteWorkerMutation,
  useGetWorkersQuery,
  useUpdateWorkerMutation,
} = workerService;
