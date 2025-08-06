import React, { useState } from "react";
import { useGetStudentsQuery } from "../redux/services/studentsApi";
import { useGetCoursesQuery } from "../redux/services/coursesApi";
import {
  useGetSelectUnitsQuery,
  useAddSelectUnitsMutation,
  useDeleteSelectUnitsMutation,
} from "../redux/services/selectUnitsApi";

const UnitSelection = () => {
  const { data: students } = useGetStudentsQuery();
  const { data: courses } = useGetCoursesQuery();
  const { data: selectUnits } = useGetSelectUnitsQuery();
  const [addSelectUnits, { isLoading: isAddingSelectUnits }] =
    useAddSelectUnitsMutation();
  const [deleteSelectUnits, { isLoading: isDeletingSelectUnits }] =
    useDeleteSelectUnitsMutation();

  const initialState = {
    name: "",
    family: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedStudent, setSelectedStudent] = useState();

  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
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

  const handleSelectUnitsSubmit = async (event, course) => {
    event.preventDefault();
    const isAlreadySelected = selectUnits.find(
      (unit) => unit.courseId === course.courseId
    );
    if (!isAlreadySelected) {
      await addSelectUnits(course);
    } else {
      window.alert("این درس قبلا انتخاب شده است.");
    }
    const selectedUnitsLength = selectUnits.map((unit) => unit.numberOfUnits);
    const totalSelectedUnits = selectedUnitsLength.reduce(
      (acc, unit) => acc + unit,
      0
    );
    console.log(totalSelectedUnits);
    if (totalSelectedUnits >= 20) {
      window.alert("تعداد واحدهای انتخابی نباید بیشتر از 20 باشد.");
    }
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
        <React.Fragment>
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
                <tr key={selectedStudent.id}>
                  <td>{selectedStudent.name}</td>
                  <td>{selectedStudent.family}</td>
                  <td>{selectedStudent.age}</td>
                  <td>{selectedStudent.fieldOfStudy}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="unit-selection__table">
            <table>
              <caption>انتخاب واحد</caption>
              <thead>
                <tr>
                  <th>نام درس</th>
                  <th>تعداد واحد</th>
                  <th>استاد مربوطه</th>
                  <th>انتخاب</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={`${course.id}-${index}`}>
                    <td>{course.name}</td>
                    <td>{course.numberOfUnits}</td>
                    <td>{course.professorName}</td>
                    <td>
                      <form
                        onSubmit={(event) =>
                          handleSelectUnitsSubmit(event, course)
                        }
                      >
                        <button type="submit" disabled={isAddingSelectUnits}>
                          اضافه کردن
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="unit-selection__table">
            <table>
              <thead>
                <tr>
                  <th>نام درس</th>
                  <th>تعداد واحد</th>
                  <th>استاد مربوطه</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {selectUnits.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.name}</td>
                    <td>{unit.numberOfUnits}</td>
                    <td>{unit.professorName}</td>
                    <td>
                      <i
                        className="fa fa-trash"
                        onClick={() => deleteSelectUnits(unit.id)}
                        disabled={isDeletingSelectUnits}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
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
