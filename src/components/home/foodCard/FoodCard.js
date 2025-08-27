import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart/cartSlice";

const FoodCard = ({ foodName, foodImage, foodPrice, foodCategory, flag }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const likeNodeRef = useRef(null);
  const dislikeNodeRef = useRef(null);
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const quantity = 1;

  useEffect(() => {
    setDate(new Date().toString());
  }, []);

  // const reservedFoods = (event) => {
  //   event.preventDefault();
  //   dispatch(addToCart({ foodName, date, foodCategory, foodPrice }));
  // };

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
          <form>
            <button
              type="submit"
              onClick={() =>
                dispatch(
                  addToCart({
                    foodName,
                    date,
                    foodCategory,
                    foodPrice,
                    quantity,
                  })
                )
              }
            >
              رزرو غذا
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodCard;
