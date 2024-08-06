import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = process.env.REACT_APP_BASE_URL;
// const base_url = "https://tmm428sh-8081.euw.devtunnels.ms/";
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
  tagTypes: [
    "action",
    "ingredient",
    "groups",
    "category",
    "department",
    "invoice-group",
    "invoices",
    "product",
    "s-products",
    "store",
    "suplier",
    "user",
    "order",
    "worker",
    "transaction",
    "tr-group",
    "cashbox",
    "cashbox-report",
    "cashbox-transaction",
    "table",
    "navigation",
    "rejects",
    "supplier",
    "add-order",
    "inventory",
    "transaction-report",
  ],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: ({ url = null }) => {
        if (!url) {
          return console.log("url not found");
        }
        return url;
      },
      refetchOnMount: false,
      providesTags: (result, error, { tags = [] }) => [...tags],
    }),
    postData: builder.mutation({
      query: ({ url, data = [] }) => ({
        url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { tags = [] }) => [...tags],
    }),
    patchData: builder.mutation({
      query: ({ url, data = [] }) => ({
        url,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { tags = [] }) => [...tags],
    }),
    delData: builder.mutation({
      query: ({ url, data = [] }) => ({
        url,
        method: "DELETE",
        body: data || [],
      }),
      invalidatesTags: (result, error, { tags = [] }) => [...tags],
    }),
  }),
});

export const useFetchDataQuery = (props) => api.endpoints.fetchData.useQuery(props);
export const usePostDataMutation = (props) => api.endpoints.postData.useMutation(props);
export const usePatchDataMutation = (props) => api.endpoints.patchData.useMutation(props);
export const useDelDataMutation = (props) => api.endpoints.delData.useMutation(props);

export default api;
