import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodReservationApi = createApi({
  reducerPath: "foodReservationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getFoodReservation: builder.query({
      query: () => "foodReservation",
      providesTags: ["FoodReservation"],
    }),
    addFoodReservation: builder.mutation({
      query: (items) => ({
        url: "foodReservation",
        method: "POST",
        body: items,
      }),
      invalidatesTags: ["FoodReservation"],
    }),
  }),
});

export const { useGetFoodReservationQuery, useAddFoodReservationMutation } =
  foodReservationApi;
