import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";
import { foodsApi } from "./services/foodsApi";
import { foodReservationApi } from "./services/foodReservationApi";
import { roomsReducer } from "./rooms/reducers";
import { foodsReducer } from "./foods/reducers";
import { accountingApi } from "./services/accountingApi";

const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [foodReservationApi.reducerPath]: foodReservationApi.reducer,
    [accountingApi.reducerPath]: accountingApi.reducer,
    rooms: roomsReducer,
    foods: foodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomsApi.middleware,
      foodsApi.middleware,
      foodReservationApi.middleware,
      accountingApi.middleware
    ),
});

export default store;
