import React, { useState } from "react";
import {
  useGetCoursesQuery,
  useAddCoursesMutation,
  useDeleteCourseMutation,
} from "../redux/services/coursesApi";

const CourseManagement = () => {
  const { data: courses, isLoading, error } = useGetCoursesQuery();
  const [addCourse, { isLoading: isAddingCourses }] = useAddCoursesMutation();
  const [deleteCourse, { isLoading: isDeletingCourse }] =
    useDeleteCourseMutation();

  const initialState = {
    name: "",
    numberOfUnit: "",
    professorName: "",
  };

  const [newCourse, setNewCourse] = useState(initialState);

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  } else {
    return (
      <React.Fragment>
        <div className="course-management">
          <table>
            <caption>مدیریت دروس</caption>
            <thead>
              <tr>
                <th>نام درس</th>
                <th>تعداد واحدها</th>
                <th>استاد مربوطه</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.numberOfUnit}</td>
                  <td>{course.professorName}</td>
                  <th>
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteCourse(course.id)}
                      disabled={isDeletingCourse}
                    ></i>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
};

export default CourseManagement;
