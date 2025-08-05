import React, { useState } from "react";
import {
  useGetProfessorsQuery,
  useAddProfessorMutation,
  useDeleteProfessorMutation,
} from "../redux/services/professorsApi";

const ProfessorManagement = () => {
  const { data: professors, isLoading, error } = useGetProfessorsQuery();
  const [addProfessor, { isLoading: isAddingProfessor }] =
    useAddProfessorMutation();
  const [deleteProfessor, { isLoading: isDeletingProfessor }] =
    useDeleteProfessorMutation();

  const initialState = {
    name: "",
    family: "",
    personalId: "",
    courseList: "",
  };

  const [newProfessor, setNewProfessor] = useState(initialState);

  const inputChangeHandler = (event) => {
    setNewProfessor({
      ...newProfessor,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitHandler = async (event) => {
    event.preventDefault();
    const payload = {
      ...newProfessor,
      personalId: Number(newProfessor.personalId),
      course_list: newProfessor.courseList.split(" "),
    };
    await addProfessor(payload);
    setNewProfessor(initialState);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  } else {
    return (
      <React.Fragment>
        <div className="professor-management">
          <table>
            <caption>مدیریت اساتید</caption>
            <thead>
              <tr>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>شماره پرسنلی</th>
                <th>دروس</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {professors.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.name}</td>
                  <td>{professor.family}</td>
                  <td>{professor.personalId}</td>
                  <td>
                    {Array.isArray(professor.course_list)
                      ? professor.course_list.join(" ، ")
                      : ""}
                  </td>
                  <td>
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteProfessor(professor.id)}
                      disabled={isDeletingProfessor}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-professor__form">
            <fieldset>
              <legend>افزودن استاد</legend>
              <form onSubmit={(event) => handleSubmitHandler(event)}>
                <div className="form-group">
                  <label htmlFor="name">نام : </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام"
                    autoComplete="off"
                    value={newProfessor.name}
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
                    value={newProfessor.family}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="personalId">شماره پرسنلی : </label>
                  <input
                    type="number"
                    id="personalId"
                    name="personalId"
                    placeholder="شماره پرسنلی"
                    autoComplete="off"
                    value={newProfessor.personalId}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="courseList"> لیست دروس : </label>
                  <input
                    type="text"
                    id="courseList"
                    name="courseList"
                    placeholder="لیست دروس"
                    autoComplete="off"
                    value={newProfessor.courseList}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" disabled={isAddingProfessor}>
                    افزودن استاد
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

export default ProfessorManagement;
