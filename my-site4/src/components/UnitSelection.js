import React, { useState } from "react";
import { useGetStudentsQuery } from "../redux/services/studentsApi";

const UnitSelection = () => {
  const { data: students } = useGetStudentsQuery();

  const initialState = {
    name: "",
    family: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedStudent, setSelectedStudent] = useState();

  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData) {
      const selectedStudent = students.find(
        (student) =>
          student.name === formData.name && student.family === formData.family
      );
      if (selectedStudent) {
        setSelectedStudent(selectedStudent);
      } else {
        window.alert(
          "نتیجه ای یافت نشد! لطفا از قسمت مدیریت دانشجو اطلاعات جدید را وارد کنید."
        );
      }
    }
    setFormData(initialState);
  };

  return (
    <React.Fragment>
      <div className="unit-selection__form">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-group">
            <label htmlFor="name">نام</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={formData.name}
              onChange={(event) => inputChangeHandler(event)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="family">نام خانوادگی</label>
            <input
              type="text"
              name="family"
              id="family"
              autoComplete="off"
              value={formData.family}
              onChange={(event) => inputChangeHandler(event)}
            />
          </div>
          <div className="form-group">
            <button type="submit">ورود</button>
          </div>
        </form>
      </div>
      {selectedStudent ? (
        <div className="unit-selection__table">
          <table>
            <thead>
              <tr>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>سن</th>
                <th>رشته تحصیلی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedStudent.name}</td>
                <td>{selectedStudent.family}</td>
                <td>{selectedStudent.age}</td>
                <td>{selectedStudent.fieldOfStudy}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : formData ? (
        <div className="unit-selection__no-result">
          <p>لطفا اطلاعات خود را وارد کنید</p>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default UnitSelection;
