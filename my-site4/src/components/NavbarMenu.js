import React from "react";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <React.Fragment>
      <div className="navbar-menu">
        <ul>
          <li>
            <Link to="/">خانه</Link>
          </li>
          <li>
            <Link to="/students">مدیریت دانشجویان</Link>
          </li>
          <li>
            <Link to="/professors">مدیریت اساتید</Link>
          </li>
          <li>
            <Link to="/courses">مدیریت دروس</Link>
          </li>
          <li>
            <Link to="/course-selection">انتخاب واحد</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavbarMenu;
