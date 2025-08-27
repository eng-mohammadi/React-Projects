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
      query: (newReservation) => ({
        url: "foodReservation",
        method: "POST",
        body: newReservation,
      }),
      invalidatesTags: ["FoodReservation"],
    }),
    deleteFoodReservation: builder.mutation({
      query: (id) => ({
        url: `foodReservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodReservation"],
    }),
  }),
});

export const {
  useGetFoodReservationQuery,
  useAddFoodReservationMutation,
  useDeleteFoodReservationMutation,
} = foodReservationApi;
