import React, { useEffect, useState, useRef } from "react";
// import { useGetRoomsQuery } from "../../redux/services/roomsApi";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import NavbarMenu from "./NavbarMenu";
import Footer from "./Footer";

const Home = () => {
  // const { data: rooms, isLoading, error } = useGetRoomsQuery();
  const [sliderImages, setSliderImages] = useState([]);
  const [slidIndex, setSlideIndex] = useState(0);
  const [error, setError] = useState("");
  const [isEnter, setIsEnter] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3032/rooms")
      .then((response) =>
        response.data.map((room) =>
          room.images.map((img) =>
            setSliderImages((prevImage) => [...prevImage, img])
          )
        )
      )
      .catch(() => {
        const error = new Error("خطای شبکه-داده ای دریافت نشد!");
        setError(error);
      });
  }, []);

  const goNext = () => {
    setSlideIndex((nextIndex) => (nextIndex + 1) % sliderImages.length);
  };

  const goPrev = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const changeState = () => {
    setIsEnter((isEnter) => !isEnter);
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <main role="main">
        <CSSTransition
          classNames="my-class"
          in={isEnter}
          timeout={{ enter: 1000, exit: 1000 }}
          nodeRef={divRef}
        >
          <div className="room-image__slider" ref={divRef}>
            {error ? (
              <h1>خطا: {error.message}</h1>
            ) : (
              sliderImages.map((img, index) => (
                <img
                  key={index}
                  src={[img]}
                  alt={`Slider${index + 1}`}
                  className={slidIndex === index ? "active" : "inactive"}
                />
              ))
            )}
            <div className="slider-buttons">
              <button
                type="button"
                onClick={() => {
                  goPrev();
                  changeState();
                }}
                disabled={slidIndex === 0}
              >
                قبلی
              </button>
              <button
                type="button"
                onClick={() => {
                  goNext();
                  changeState();
                }}
                disabled={slidIndex === sliderImages.length - 1}
              >
                بعدی
              </button>
            </div>
          </div>
        </CSSTransition>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
