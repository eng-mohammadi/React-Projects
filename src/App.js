import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main-style.scss";
import Home from "./components/home/Home";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
