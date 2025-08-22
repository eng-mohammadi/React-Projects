import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import SliderBox from "./SliderBox";
import RoomCards from "./RoomCards";
import FoodCards from "./FoodCards";
import Footer from "../footer/Footer";

const Home = () => {
  const [roomImages, setRoomImages] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [roomIndex, setRoomIndex] = useState(0);
  const [foodIndex, setFoodIndex] = useState(0);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3032/rooms"),
      axios.get("http://localhost:3032/foods"),
    ])
      .then(
        axios.spread((rooms, foods) => {
          setRoomImages(rooms.data.flatMap((room) => room.images));
          setFoodImages(foods.data.flatMap((food) => food.image));
        })
      )
      .catch(() => setError("خطای شبکه: داده‌ای دریافت نشد."));
  }, []);

  return (
    <React.Fragment>
      <NavbarMenu />
      <SliderBox
        title="اتاق ها"
        error={error}
        images={roomImages}
        index={roomIndex}
        goNext={() =>
          setRoomIndex((nextIndex) => (nextIndex + 1) % roomImages.length)
        }
        goPrev={() =>
          setRoomIndex(
            (prevIndex) =>
              (prevIndex - 1 + roomImages.length) % roomImages.length
          )
        }
      />
      <SliderBox
        title="غذاها"
        error={error}
        images={foodImages}
        index={foodIndex}
        goNext={() =>
          setFoodIndex((nextIndex) => (nextIndex + 1) % foodImages.length)
        }
        goPrev={() =>
          setFoodIndex(
            (prevIndex) =>
              (prevIndex - 1 + foodImages.length) % foodImages.length
          )
        }
      />
      <hr />
      <RoomCards />
      <hr />
      <FoodCards flag={flag} setFlag={() => setFlag(!flag)} />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
