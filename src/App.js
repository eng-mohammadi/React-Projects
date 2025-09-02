import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main-style.scss";
import Home from "./components/home/Home";
import RoomDetails from "./components/roomDetails/RoomDetails";
import FoodDetails from "./components/foodDetails/FoodDetails";
import Reservation from "./components/reservation/Reservation";
import Accounting from "./components/accounting/Accounting";
import Register from "./components/accounting/register/Register";
import Login from "./components/accounting/login/Login";
import FoodCart from "./components/cart/FoodCart";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="rooms/:name" element={<RoomDetails />}></Route>
        <Route path="foods/:name" element={<FoodDetails />}></Route>
        <Route path="accounting" element={<Accounting />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="reservation" element={<Reservation />}></Route>
        <Route path="cart" element={<FoodCart />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
