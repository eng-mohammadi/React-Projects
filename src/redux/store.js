import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";
import { foodsApi } from "./services/foodsApi";
import { foodReservationApi } from "./services/foodReservationApi";
import { roomsReducer } from "./rooms/reducers";
import { foodsReducer } from "./foods/reducers";
import { accountingApi } from "./services/accountingApi";
import { roomReservationApi } from "./services/roomReservationApi";

const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [foodReservationApi.reducerPath]: foodReservationApi.reducer,
    [accountingApi.reducerPath]: accountingApi.reducer,
    [roomReservationApi.reducerPath]: roomReservationApi.reducer,
    rooms: roomsReducer,
    foods: foodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomsApi.middleware,
      foodsApi.middleware,
      foodReservationApi.middleware,
      accountingApi.middleware,
      roomReservationApi.middleware
    ),
});

export default store;
