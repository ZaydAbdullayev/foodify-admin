import { apiSlice } from "./frame.service";
const user = JSON?.parse(localStorage.getItem("user")) || [];

export const workerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // path for add worker
    addWorker: builder.mutation({
      query: (data) => ({
        url: "/add/worker",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["worker"],
    }),

    // path for get all res's workers
    getWorkers: builder.query({
      query: () => ({
        url: `/get/workers/${user?.user?.id}`,
        method: "GET",
      }),
      providesTags: ["worker"],
    }),

    // path for update worker's info by id
    updateWorker: builder.mutation({
      query: (worker) => ({
        url: `/update/worker/${worker.id}`,
        method: "PATCH",
        body: worker,
      }),
      invalidatesTags: ["worker"],
    }),

    // path for delete worker by id
    deleteWorker: builder.mutation({
      query: (id) => ({
        url: `/delete/worker/${id}`,
        method: "DELETE",
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
