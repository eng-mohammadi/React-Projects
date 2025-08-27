import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main-style.scss";
import Home from "./components/home/Home";
import RoomDetails from "./components/roomDetails/RoomDetails";
import FoodDetails from "./components/foodDetails/FoodDetails";
import Cart from "./components/cart/Cart";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rooms/:name" element={<RoomDetails />}></Route>
        <Route path="/foods/:name" element={<FoodDetails />}></Route>
        <Route path="/reserve" element={<Cart />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
