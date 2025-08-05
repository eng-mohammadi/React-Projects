import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "courses",
      providesTags: ["Courses"],
    }),
    addCourses: builder.mutation({
      query: (newCourse) => ({
        url: "courses",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddCoursesMutation,
  useDeleteCourseMutation,
} = coursesApi;
