import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodsApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "foods",
      providesTags: ["Foods"],
    }),
    addFood: builder.mutation({
      query: (newFood) => ({
        url: "foods",
        method: "POST",
        body: newFood,
      }),
      invalidatesTags: ["Foods"],
    }),
    deleteFood: builder.mutation({
      query: (foodId) => ({
        url: `foods/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const { useGetFoodsQuery, useAddFoodMutation, useDeleteFoodMutation } =
  foodsApi;
