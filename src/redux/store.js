import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";
import { foodsApi } from "./services/foodsApi";
import { foodReservationApi } from "./services/foodReservationApi";
import { roomsReducer } from "./rooms/reducers";
import { foodsReducer } from "./foods/reducers";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [foodReservationApi.reducerPath]: foodReservationApi.reducer,
    rooms: roomsReducer,
    foods: foodsReducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomsApi.middleware,
      foodsApi.middleware,
      foodReservationApi.middleware
    ),
});

export default store;
