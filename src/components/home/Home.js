import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NavbarMenu from "./NavbarMenu";
import Footer from "./Footer";

const Home = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");

  const imgRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3032/rooms")
      .then((response) => {
        const imgs = response.data.flatMap((room) => room.images);
        setImages(imgs);
      })
      .catch(() => setError("خطای شبکه: داده‌ای دریافت نشد."));
  }, []);

  const goNext = () => {
    setIndex((nextIndex) => (nextIndex + 1) % images.length);
  };

  const goPrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  } else if (images.length === 0) {
    return <h2 className="loading-title">در حال بارگذاری ....</h2>;
  } else {
    return (
      <React.Fragment>
        <NavbarMenu />
        <h1>{index}</h1>
        <div className="slider-container">
          <TransitionGroup>
            <CSSTransition
              key={images[index]}
              classNames="slide"
              timeout={500}
              nodeRef={imgRef}
            >
              <img
                src={images[index]}
                alt={`Slider ${index + 1}`}
                className="slider-image"
                ref={imgRef}
              />
            </CSSTransition>
          </TransitionGroup>
          <div className="slider-buttons">
            <button onClick={goPrev} disabled={index <= 1}>
              قبلی
            </button>
            <button onClick={goNext} disabled={index >= images.length - 1}>
              بعدی
            </button>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
};

export default Home;
