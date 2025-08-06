import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const selectUnitsApi = createApi({
  reducerPath: "selectUnitsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getSelectUnits: builder.query({
      query: () => "selectUnits",
      providesTags: ["SelectUnits"],
    }),
    addSelectUnits: builder.mutation({
      query: (newSelectUnitsData) => ({
        url: "selectUnits",
        method: "POST",
        body: newSelectUnitsData,
      }),
      invalidatesTags: ["SelectUnits"],
    }),
    deleteSelectUnits: builder.mutation({
      query: (id) => ({
        url: `selectUnits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SelectUnits"],
    }),
  }),
});

export const {
  useGetSelectUnitsQuery,
  useAddSelectUnitsMutation,
  useDeleteSelectUnitsMutation,
} = selectUnitsApi;
