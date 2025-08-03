import { configureStore } from "@reduxjs/toolkit";
import { studentsApi } from "./services/studentsApi";

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware),
});

export default store;
