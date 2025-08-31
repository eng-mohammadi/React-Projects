import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { loadCart, saveCart } from "../../../utils/localStorage";
import { useGetAccountingQuery } from "../../../redux/services/accountingApi";

const FoodCard = ({ foodName, foodImage, foodPrice, foodCategory, flag }) => {
  const { data: accounting } = useGetAccountingQuery();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const likeNodeRef = useRef(null);
  const dislikeNodeRef = useRef(null);

  const reservedFoods = (event) => {
    event.preventDefault();
    if (accounting.length === 0) {
      window.alert(
        "لطفا برای رزرو غذا ابتدا از تب ورود/ثبت نام وارد حساب کاربری شوید."
      );
    } else {
      const cartItems = loadCart();
      console.log(cartItems);
      const existingItemIndex = cartItems.findIndex(
        (item) => item.foodName === foodName
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveCart(updatedCartItems);
      } else {
        const newItem = {
          foodName,
          date: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}`,
          hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
          foodCategory,
          foodPrice,
          quantity: 1,
        };
        saveCart([...cartItems, newItem]);
      }
    }
  };

  return (
    <React.Fragment>
      <div
        className="food-card__box"
        style={flag ? { backgroundColor: "#bfddf8" } : {}}
      >
        <div className="food-image">
          <Link to={`/foods/${foodName}`}>
            <img src={foodImage} alt={`image_${foodName}`} />
          </Link>
        </div>
        <p className="food-name"> {foodName}</p>
        <p>وعده غذایی: {foodCategory}</p>
        <p>قیمت: {foodPrice}</p>
        <div className="food-card__button">
          <div className="food-card__icons">
            <CSSTransition
              nodeRef={likeNodeRef}
              in={like}
              timeout={300}
              classNames="translate-like-icon"
            >
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => {
                  setLike(!like);
                  if (!like) setDislike(false);
                }}
                style={like ? { color: "yellowGreen" } : { color: "" }}
                ref={likeNodeRef}
              ></i>
            </CSSTransition>
            <CSSTransition
              nodeRef={dislikeNodeRef}
              in={dislike}
              timeout={300}
              classNames="translate-dislike-icon"
            >
              <i
                className="fa-regular fa-thumbs-down"
                onClick={() => {
                  setDislike(!dislike);
                  if (!dislike) setLike(false);
                }}
                style={dislike ? { color: "red" } : { color: "" }}
                ref={dislikeNodeRef}
              ></i>
            </CSSTransition>
          </div>
          <form onSubmit={reservedFoods}>
            <button type="submit">رزرو غذا</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodCard;
