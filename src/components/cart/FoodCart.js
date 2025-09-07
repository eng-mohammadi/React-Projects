import React, { useState } from "react";
import { loadCart, saveCart } from "../../utils/localStorage";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import {
  resetCounter,
  decreaseCounter,
} from "../../redux/counter/counterActions";
import { useDispatch } from "react-redux";
import { useAddFoodReservationMutation } from "../../redux/services/foodReservationApi";
import { useNavigate } from "react-router-dom";

const FoodCart = () => {
  const initialCart = loadCart();
  const [items, setItems] = useState(initialCart);
  const dispatch = useDispatch();
  const [addFoodReservation, { isLoading: isAddingFoodReservation }] =
    useAddFoodReservationMutation();
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      saveCart(newItems);
      dispatch(decreaseCounter());
      return newItems;
    });
  };

  const plusFoodHandler = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.foodPrice * (item.quantity + 1),
            }
          : item
      );

      saveCart(newItems);
      return newItems;
    });
  };

  const minusFoodHandler = (id) => {
    setItems((prevItems) => {
      const newItem = prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              totalPrice:
                item.quantity > 1
                  ? item.foodPrice * (item.quantity - 1)
                  : item.foodPrice,
            }
          : item
      );

      saveCart(newItem);
      return newItem;
    });
  };

  const submitFoodReservationHandler = (event) => {
    event.preventDefault();
    window.alert("رزرو غذای شما با موفقیت انجام شد");
    const items = JSON.parse(window.localStorage.getItem("cartItems") || []);
    items.forEach((item) => {
      addFoodReservation(item);
    });
    navigate("/");
    window.localStorage.clear("cartItems");
    dispatch(resetCounter());
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      {items.length === 0 ? (
        <h3 className="error-title">غذایی رزرو نشده است!</h3>
      ) : (
        <div className="cart-box">
          <h2>لیست غذای های رزرو اولیه</h2>
          <table>
            <thead>
              <tr>
                <th>نام غذا</th>
                <th>وعده</th>
                <th>قیمت واحد</th>
                <th>تاریخ رزرو</th>
                <th>ساعت</th>
                <th>قیمت کل</th>
                <th>تعداد</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.foodPrice.toLocaleString("fa-IR")} تومان</td>
                  <td>{item.date}</td>
                  <td>{item.hour}</td>
                  <td>{item.totalPrice.toLocaleString("fa-IR")} تومان</td>
                  <td>
                    <div className="quantity-control">
                      <i
                        className="fas fa-plus"
                        onClick={() => plusFoodHandler(item.id)}
                      ></i>
                      {item.quantity}
                      <i
                        className="fas fa-minus"
                        onClick={() => minusFoodHandler(item.id)}
                      ></i>
                    </div>
                  </td>
                  <td>
                    <i
                      className="fas fa-trash"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">
            <h3>
              جمع کل:
              {items
                .reduce((acc, item) => acc + item.totalPrice, 0)
                .toLocaleString("fa-IR")}
              تومان
            </h3>
            <form onSubmit={(event) => submitFoodReservationHandler(event)}>
              <button type="submit" disabled={isAddingFoodReservation}>
                تایید و پرداخت
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default FoodCart;
