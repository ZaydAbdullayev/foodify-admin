import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = process.env.REACT_APP_BASE_URL;
// const base_url = "https://backend.foodify.uz";
const user = JSON.parse(localStorage.getItem("user")) || [];

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers, { getState }) => {
    if (user?.token) {
      headers.set("Authorization", `Bearer ${user?.token}`);
    }
    return headers;
  },
});

const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: ({ url }) => url,
      providesTags: (result, error, { tags }) => [{ type: "dynamic", tags }], // Eğer tags varsa, kullan; yoksa boş bir dizi kullan
    }),
    postData: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { tags }) => [{ type: "dynamic", tags }],
    }),
    patchData: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { tags }) => [{ type: "dynamic", tags }],
    }),
    delData: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "DELETE",
        body: data || [],
      }),
      invalidatesTags: (result, error, { tags }) => [{ type: "dynamic", tags }],
    }),
  }),
});

// Example of combining RTK Query and axios

export const useFetchDataQuery = (props) =>
  api.endpoints.fetchData.useQuery(props);
export const usePostDataMutation = (props) =>
  api.endpoints.postData.useMutation(props);
export const usePatchDataMutation = (props) =>
  api.endpoints.patchData.useMutation(props);
export const useDelDataMutation = (props) =>
  api.endpoints.delData.useMutation(props);

export default api;
