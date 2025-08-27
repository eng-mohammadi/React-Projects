import React from "react";
import { useParams } from "react-router-dom";
import { useGetFoodsQuery } from "../../redux/services/foodsApi";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";

const FoodDetails = () => {
  const { data: foods, isLoading, error } = useGetFoodsQuery();
  const params = useParams();

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
            <button type="button">رزرو غذا</button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FoodDetails;
