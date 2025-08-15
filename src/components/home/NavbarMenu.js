import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <div
        className="navbar-menu"
        style={
          sticky
            ? {
                position: "sticky",
                top: "0",
                zIndex: "1",
                backgroundColor: "#ffc107",
                borderRadius: "0 0 10px 10px",
                transition: "all 0.3s ease-in",
              }
            : null
        }
      >
        <div className="logo">
          <img src="/images/favicon/logo.jpg" alt="hotel" />
        </div>
        <div className="list-style">
          <ul>
            <li>
              <i className="fa-solid fa-house"></i>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <i className="fa-solid fa-right-to-bracket"></i>
              <Link to="/account">ورود/ثبت نام</Link>
            </li>
            <li>
              <i className="fa-solid fa-bed"></i>
              <Link to="/reserve">رزرو</Link>
            </li>
            <li>
              <i className="fa-solid fa-suitcase-rolling"></i>
              <Link to="/contact-us">پیگیری رزرو</Link>
            </li>
            <li>
              <i className="fa-solid fa-headset"></i>
              <Link to="/support">پشتیبانی</Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavbarMenu;
