import { configureStore } from "@reduxjs/toolkit";
import { studentsApi } from "./services/studentsApi";
import { professorsApi } from "./services/professorsApi";
import { coursesApi } from "./services/coursesApi";
import { selectUnitsApi } from "./services/selectUnitsApi";

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
    [professorsApi.reducerPath]: professorsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [selectUnitsApi.reducerPath]: selectUnitsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentsApi.middleware,
      professorsApi.middleware,
      coursesApi.middleware,
      selectUnitsApi.middleware
    ),
});

export default store;
