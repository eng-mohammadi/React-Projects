import React, { useState } from "react";
import { Link } from "react-router-dom";

const FoodCard = ({ foodName, foodImage, foodPrice, foodCategory, flag }) => {
  const [like, setLike] = useState(false);
  //   const [dislike, setDislike] = useState(false);

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
            <i
              className="fa-regular fa-thumbs-up"
              onClick={() => setLike(!like)}
              style={like ? { color: "green" } : { color: "" }}
              disabled={like}
            ></i>
            <i
              className="fa-regular fa-thumbs-down"
              onClick={() => setLike(!like)}
              style={like ? { color: "" } : { color: "red" }}
              disabled={like}
            ></i>
          </div>
          <button type="button">رزرو غذا</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodCard;
