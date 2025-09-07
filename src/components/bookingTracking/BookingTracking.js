import React, { useState } from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import {
  filterRoomsByDate,
  filterFoodsByDate,
  setFoods,
  setRooms,
} from "../../redux/bookingTracking/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredFoodsByDate,
  selectFilteredRoomsByDate,
} from "../../redux/bookingTracking/selectors";
import { useGetFoodReservationQuery } from "../../redux/services/foodReservationApi";
import { useGetRoomReservationQuery } from "../../redux/services/roomReservationApi";

const BookingTracking = () => {
  const dispatch = useDispatch();
  const filteredRoomsByDate = useSelector((state) =>
    selectFilteredRoomsByDate(state || [])
  );
  const filteredFoodsByDate = useSelector((state) =>
    selectFilteredFoodsByDate(state || [])
  );
  const { data: roomReservation } = useGetRoomReservationQuery();
  const { data: foodReservation } = useGetFoodReservationQuery();
  const [foodReservationDate, setFoodReservationDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [flag, setFlag] = useState(false);

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setRooms(roomReservation));
    dispatch(setFoods(foodReservation));
    dispatch(
      filterRoomsByDate({
        checkInDate,
        checkOutDate,
      })
    );
    dispatch(filterFoodsByDate({ filterFoodDate: foodReservationDate }));
    setFlag(!flag);
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <hr />
      <div className="booking-tracking">
        <h3>در این بخش می‌توانید رزروهای ثبت شده خود را پیگیری کنید.</h3>
        <fieldset>
          <legend>پیگیری رزرو</legend>
          <form onSubmit={(event) => searchSubmitHandler(event)}>
            <div className="search-reservation">
              <h4>جستجوی اتاق رزرو شده</h4>
              <label htmlFor="room-reservation-checkIn">تاریخ ورود رزرو:</label>
              <input
                type="date"
                name="roomReservationCheckIn"
                id="room-reservation-checkIn"
                value={checkInDate}
                onChange={(event) => setCheckInDate(event.target.value)}
              />
              <label htmlFor="room-reservation-checkOut">
                تاریخ خروج رزرو:
              </label>
              <input
                type="date"
                name="roomReservationCheckOut"
                id="room-reservation-checkOut"
                value={checkOutDate}
                onChange={(event) => setCheckOutDate(event.target.value)}
              />
            </div>
            <div className="search-reservation">
              <h4>جستجوی غذای رزرو شده</h4>
              <label htmlFor="food-reservation-date">تاریخ رزرو:</label>
              <input
                type="date"
                name="foodReservationDate"
                id="food-reservation-date"
                autoComplete="off"
                placeholder="تاریخ رزرو غذا را وارد کنید"
                value={foodReservationDate}
                onChange={(event) => setFoodReservationDate(event.target.value)}
              />
            </div>
            <div className="booking-tracking__button">
              <button type="submit">جستجو</button>
            </div>
          </form>
        </fieldset>
        {flag ? (
          filteredRoomsByDate.length > 0 || filteredFoodsByDate.length > 0 ? (
            <React.Fragment>
              <h4 className="search-results-title">نتایج جستجو:</h4>
              <div className="booking-tracking__results">
                <div className="booking-tracking__room--result">
                  <table>
                    <thead>
                      <tr>
                        <th>نام رزرو کننده</th>
                        <th>تاریخ ورود</th>
                        <th>تاریخ خروج</th>
                        <th>تعداد میهمان</th>
                        <th>نوع اتاق</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoomsByDate.map((room) => (
                        <tr key={room.id}>
                          <td>
                            {room.name} - {room.family}
                          </td>
                          <td>{room.checkIn}</td>
                          <td>{room.checkOut}</td>
                          <td>{room.guests}</td>
                          <td>{room.roomType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="booking-tracking__food--result">
                  <table>
                    <thead>
                      <tr>
                        <th>نام غذا</th>
                        <th>تاریخ رزرو</th>
                        <th>وعده</th>
                        <th>تعداد</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFoodsByDate.map((food) => (
                        <tr key={food.id}>
                          <td>{food.foodName}</td>
                          <td>{food.date}</td>
                          <td>{food.foodCategory}</td>
                          <td>{food.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <h3 className="search-results-none">نتیجه ای یافت نشد!</h3>
          )
        ) : null}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BookingTracking;
