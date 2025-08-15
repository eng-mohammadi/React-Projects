import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "rooms",
      providesTags: ["Rooms"],
    }),
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: "rooms",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `rooms/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const { useGetRoomsQuery, useAddRoomMutation, useDeleteRoomMutation } =
  roomsApi;
