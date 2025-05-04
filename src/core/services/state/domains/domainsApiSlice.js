import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DomainsApiSlice = createApi({
  reducerPath: "domains",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
  }),
  endpoints: (builder) => {
    return {
      getDomains: builder.query({
        query: () => `/`,
      }),
      getDomain: builder.query({
        query: ({ id }) => `/${id}`,
      }),
      createDomain: builder.mutation({
        query: (domain) => ({
          url: "/",
          method: "POST",
          body: domain,
        }),
      }),
      deleteDomain: builder.mutation({
        query: ({ id }) => ({
          url: `/${id}`,
          method: "DELETE",
        }),
      }),
      updateDomain: builder.mutation({
        query: ({ id, ...newDomain }) => ({
          url: `/${id}`,
          method: "PUT",
          body: newDomain,
        }),
      }),
    };
  },
});

export const {
  useGetDomainsQuery,
  useGetDomainQuery,
  useCreateDomainMutation,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} = DomainsApiSlice;
