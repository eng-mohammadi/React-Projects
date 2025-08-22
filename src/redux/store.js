import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";
import { foodsApi } from "./services/foodsApi";

const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware, foodsApi.middleware),
});

export default store;
