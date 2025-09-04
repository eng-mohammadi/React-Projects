import React from "react";
import { useParams } from "react-router-dom";
import { useGetFoodsQuery } from "../../redux/services/foodsApi";
import { useGetAccountingQuery } from "../../redux/services/accountingApi";
import { loadCart, saveCart } from "../../utils/localStorage";
import {
  constantCounter,
  decreaseCounter,
  increaseCounter,
} from "../../redux/counter/counterActions";
import { useDispatch } from "react-redux";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";

const FoodDetails = () => {
  const { data: foods, isLoading, error } = useGetFoodsQuery();
  const { data: accounting } = useGetAccountingQuery();
  const params = useParams();
  const dispatch = useDispatch();

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  }
  if (isLoading) {
    return <h2 className="loading-title">درحال بارگذاری...</h2>;
  }
  const food = foods.find((item) => item.name === params.name);
  if (!food) {
    return <h1 className="error-title">غذا یافت نشد</h1>;
  }

  const reservedFood = () => {
    if (accounting.length === 0) {
      window.alert(
        "لطفا برای رزرو غذا ابتدا از تب ورود/ثبت نام وارد حساب کاربری شوید."
      );
    } else {
      const cartItems = loadCart();
      const existingItemIndex = cartItems.findIndex(
        (item) => item.foodName === food.name
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item, index) => {
          if (index !== existingItemIndex) return item;

          let totalPrice = item.foodPrice;
          totalPrice += item.quantity * item.foodPrice;
          const newQuantity = item.quantity + 1;

          return {
            ...item,
            quantity: newQuantity,
            foodPrice: item.foodPrices,
            totalPrice: totalPrice,
          };
        });
        saveCart(updatedCartItems);
        dispatch(constantCounter());
      } else {
        const newItem = {
          id: cartItems.length + 1,
          foodName: food.name,
          date: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}`,
          hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
          foodCategory: food.category,
          foodPrice: food.price,
          totalPrice: foods.price,
          quantity: 1,
        };
        saveCart([...cartItems, newItem]);
        dispatch(increaseCounter());
      }
    }
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="food-details">
        <h1 className="food-details__title">
          {food.category} - {food.name}
        </h1>
        <div className="food-details__content">
          <div className="food-details__image">
            <img src={food.image} alt={food.name} />
          </div>
          <div className="food-details__info">
            <p>قیمت: {food.price}تومان</p>
            {food.description && <p>شامل: {food.description}</p>}
            <button type="button" onClick={reservedFood}>
              رزرو غذا
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FoodDetails;
