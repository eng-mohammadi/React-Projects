import React from "react";
import { useGetFoodsQuery } from "../../redux/services/foodsApi";
import { Link } from "react-router-dom";

const FoodCards = ({ flag, setFlag }) => {
  const { data: foods, isLoading, error } = useGetFoodsQuery();

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  } else if (isLoading) {
    return <h2 className="loading-title">در حال بارگذاری....</h2>;
  } else {
    return (
      <React.Fragment>
        <div
          className="food-cards"
          style={
            flag
              ? {
                  overflow: "visible",
                  height: "auto",
                }
              : { overflow: "hidden" }
          }
        >
          {foods.map((food) => (
            <Link key={food.id} to={`/foods/${food.name}`}>
              <div
                className="food-card__box"
                style={flag ? { backgroundColor: "#bfddf8" } : {}}
              >
                <div className="food-image">
                  <img src={food.image} alt={`image_${food.id}`} />
                </div>
                <p className="food-name"> {food.name}</p>
                <p>وعده غذایی: {food.category}</p>
                <p>قیمت: {food.price}</p>
              </div>
            </Link>
          ))}
          <div
            className="hide-show-icon__food"
            style={
              flag
                ? {
                    position: "absolute",
                    zIndex: "1",
                    bottom: "-25px",
                  }
                : {}
            }
          >
            <i
              className="fa-solid fa-angle-up"
              style={flag ? { display: "block" } : { display: "none" }}
              onClick={setFlag}
            ></i>
            <i
              className="fa-solid fa-angle-down"
              style={flag ? { display: " none" } : { display: "block" }}
              onClick={setFlag}
              title="نمایش بیشتر"
            ></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default FoodCards;
