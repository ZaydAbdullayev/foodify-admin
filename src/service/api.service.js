import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;
// const base_url = "https://backend.foodify.uz";
const user = JSON.parse(localStorage.getItem("user")) || [];

const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
    "Content-Type": "application/json; multipart/form-data",
  },
};

export const ApiService = {
  async fetching(url, data) {
    const response = await axios.post(`${base_url}/${url}`, data, config);
    return response;
  },
};

export const ApiGetService = {
  async fetching(url) {
    const response = await axios.get(`${base_url}/${url}`);
    return response;
  },
};

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
      query: (url) => url,
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
        body: data,
      }),
      invalidatesTags: (result, error, { tags }) => [{ type: "dynamic", tags }],
    }),
  }),
});

// Example of combining RTK Query and axios

export const useFetchDataQuery = (props) =>
  api.endpoints.fetchData.useQuery(props);

export default api;
// export const customApiService = {
//   fetchData: async (url) => {
//     const response = await axios.get(`${base_url}/${url}`);
//     return response.data;
//   },
//   postData: async ({ url, data }) => {
//     const response = await axios.post(`${base_url}/${url}`, data, {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         "Content-Type": "application/json; multipart/form-data",
//       },
//     });
//     return response.data;
//   },
// };
