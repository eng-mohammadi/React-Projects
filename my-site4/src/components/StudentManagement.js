import React, { useState } from "react";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} from "../redux/services/studentsApi";

const StudentManagement = () => {
  const { data: students, error, isLoading } = useGetStudentsQuery();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [deleteStudent, { isLoading: isDeletingStudent }] =
    useDeleteStudentMutation();

  const initialState = {
    name: "",
    family: "",
    age: "",
    fieldOfStudy: "",
  };

  const [newStudent, setNewStudent] = useState(initialState);

  const inputChangeHandler = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const handleSubmitHandler = async (event) => {
    event.preventDefault();
    await addStudent(newStudent);
    setNewStudent(initialState);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  } else {
    return (
      <React.Fragment>
        <div className="student-management">
          <table>
            <caption>مدیریت دانشجویان</caption>
            <thead>
              <tr>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>سن</th>
                <th>رشته تحصیلی</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.family}</td>
                  <td>{student.age}</td>
                  <td>{student.fieldOfStudy}</td>
                  <td>
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteStudent(student.id)}
                      disabled={isDeletingStudent}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-student__form">
            <fieldset>
              <legend>افزودن دانشجو</legend>
              <form onSubmit={(event) => handleSubmitHandler(event)}>
                <div className="form-group">
                  <label htmlFor="name">نام : </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام"
                    autoComplete="off"
                    value={newStudent.name}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="family">نام خانوادگی : </label>
                  <input
                    type="text"
                    id="family"
                    name="family"
                    placeholder="نام خانوادگی"
                    autoComplete="off"
                    value={newStudent.family}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">سن : </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="سن"
                    autoComplete="off"
                    value={newStudent.age}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fieldOfStudy">رشته تحصیلی : </label>
                  <input
                    type="text"
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    placeholder="رشته تحصیلی"
                    autoComplete="off"
                    value={newStudent.fieldOfStudy}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" disabled={isAddingStudent}>
                    افزودن دانشجو
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

export default StudentManagement;
