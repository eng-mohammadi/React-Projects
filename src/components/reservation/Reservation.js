import React from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import FoodCart from "../cart/FoodCart";

const Reservation = () => {
  return (
    <React.Fragment>
      <NavbarMenu />
      <hr />
      <FoodCart />
      <Footer />
    </React.Fragment>
  );
};

export default Reservation;
