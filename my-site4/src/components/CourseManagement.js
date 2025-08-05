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
    courseId: "",
    name: "",
    numberOfUnits: "",
    professorName: "",
  };

  const [newCourse, setNewCourse] = useState(initialState);

  const inputChangeHandler = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
  };

  const handleSubmitHandler = async (event) => {
    event.preventDefault();
    await addCourse(newCourse);
    setNewCourse(initialState);
  };

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
                <th>کد درس</th>
                <th>نام درس</th>
                <th>تعداد واحد</th>
                <th>استاد مربوطه</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseId}</td>
                  <td>{course.name}</td>
                  <td>{course.numberOfUnits}</td>
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
          <div className="add-course__form">
            <fieldset>
              <legend>افزودن درس جدید</legend>
              <form onSubmit={(event) => handleSubmitHandler(event)}>
                <div className="form-group">
                  <label htmlFor="courseId">کد درس : </label>
                  <input
                    type="number"
                    id="courseId"
                    name="courseId"
                    placeholder="کد درس"
                    autoComplete="off"
                    value={newCourse.courseId}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">نام درس : </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام درس"
                    autoComplete="off"
                    value={newCourse.name}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfUnits">تعداد واحد : </label>
                  <input
                    type="number"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    placeholder="تعداد واحد"
                    autoComplete="off"
                    value={newCourse.numberOfUnits}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="professorName">نام استاد مربوطه : </label>
                  <input
                    type="text"
                    id="professorName"
                    name="professorName"
                    placeholder="نام استاد مربوطه"
                    autoComplete="off"
                    value={newCourse.professorName}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" disabled={isAddingCourses}>
                    افزودن درس
                  </button>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default CourseManagement;
