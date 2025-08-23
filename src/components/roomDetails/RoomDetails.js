import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomsQuery } from "../../redux/services/roomsApi";
import { CSSTransition } from "react-transition-group";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";

const RoomDetails = () => {
  const { data: rooms, isLoading, error } = useGetRoomsQuery();
  const params = useParams();
  const [index, setIndex] = useState(0);
  const imgRef = useRef();

  if (error) {
    return <h1 className="error-title">خطا: {error.message}</h1>;
  }
  if (isLoading) {
    return <h2 className="loading-title">در حال بارگذاری...</h2>;
  }

  const room = rooms.find((room) => room.name === params.name);
  if (!room) {
    return <h3 className="error-title">اتاق مورد نظر یافت نشد</h3>;
  }

  const goNext = () => {
    setIndex((nextIndex) => (nextIndex + 1) % room.images.length);
  };

  const goPrev = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length
    );
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="room-details">
        <h1 className="room-details_title">{room.name}</h1>
        <CSSTransition
          key={index}
          nodeRef={imgRef}
          timeout={500}
          classNames="room-details__slider"
        >
          <div className="room-details__images">
            <img
              src={room.images[index]}
              alt={`${room.name}-${index}`}
              ref={imgRef}
            />
          </div>
        </CSSTransition>
        <div className="room-details__buttons">
          <i onClick={goPrev} className="fa-solid fa-angle-right"></i>
          <i onClick={goNext} className="fa-solid fa-angle-left"></i>
        </div>
        <div className="room-details__content">
          <div className="room-amenities">
            <p>ظرفیت: {room.capacity} نفر</p>
            <p>قیمت هر شب: {room.pricePerNight} تومان</p>
            <p>امکانات اتاق:</p>
            {room.amenities.map((amenity) => (
              <ul>
                <li>{amenity}</li>
              </ul>
            ))}
          </div>
          <div className="hotel-amenities">
            <p>امکانات هتل:</p>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i>استخر
              </li>
              <li>
                <i className="fa-solid fa-check"></i>سونا
              </li>
              <li>
                <i className="fa-solid fa-check"></i>رستوران
              </li>
              <li>
                <i className="fa-solid fa-check"></i>پارکینگ
              </li>
            </ul>
          </div>
          <div className="room-reserve__button">
            <button type="button">رزرو اتاق</button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default RoomDetails;
