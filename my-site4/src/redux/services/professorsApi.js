import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const professorsApi = createApi({
  reducerPath: "professorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getProfessors: builder.query({
      query: () => "professors",
      providesTags: ["Professors"],
    }),
    addProfessor: builder.mutation({
      query: (newProfessor) => ({
        url: "professors",
        method: "POST",
        body: newProfessor,
      }),
      invalidatesTags: ["Professors"],
    }),
    deleteProfessor: builder.mutation({
      query: (id) => ({
        url: `professors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professors"],
    }),
  }),
});

export const {
  useGetProfessorsQuery,
  useAddProfessorMutation,
  useDeleteProfessorMutation,
} = professorsApi;
