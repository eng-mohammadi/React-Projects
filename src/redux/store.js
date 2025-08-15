import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";

const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware),
});

export default store;
