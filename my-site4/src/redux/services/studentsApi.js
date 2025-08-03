import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032/" }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "students",
      providesTags: ["Students"],
    }),
    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: "students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
