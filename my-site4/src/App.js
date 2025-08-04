import React from "react";
import "./styles/main_styles.scss";
import { Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu";
import Home from "./components/Home";
import StudentManagement from "./components/StudentManagement";
import ProfessorManagement from "./components/ProfessorManagement";
import CourseManagement from "./components/CourseManagement";
import UnitSelection from "./components/UnitSelection";

const App = () => {
  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/students" element={<StudentManagement />}></Route>
          <Route path="/professors" element={<ProfessorManagement />}></Route>
          <Route path="/courses" element={<CourseManagement />}></Route>
          <Route path="/course-selection" element={<UnitSelection />}></Route>
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default App;
