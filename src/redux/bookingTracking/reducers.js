import {
  FILTER_ROOMS_BY_DATE,
  FILTER_FOODS_BY_DATE,
  SET_FOODS,
  SET_ROOMS,
} from "./ActionTypes";

const initialFilteredState = {
  rooms: [],
  foods: [],
  filteredRoomsByDate: [],
  filteredFoodsByDate: [],
};

export const bookingTrackingReducer = (
  state = initialFilteredState,
  action
) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        filteredRoomsByDate: action.payload,
      };

    case SET_FOODS:
      return {
        ...state,
        foods: action.payload,
        filteredFoodsByDate: action.payload,
      };

    case FILTER_ROOMS_BY_DATE:
      const { checkInDate, checkOutDate } = action.payload;
      let filteredRooms = state.rooms;

      if (checkInDate) {
        filteredRooms = filteredRooms.filter((room) =>
          room.checkIn.includes(checkInDate)
        );
      }

      if (checkOutDate) {
        filteredRooms = filteredRooms.filter((room) =>
          room.checkOut.includes(checkOutDate)
        );
      }

      return { ...state, filteredRoomsByDate: filteredRooms };

    case FILTER_FOODS_BY_DATE:
      const { filterFoodDate } = action.payload;

      let filteredFoods = state.foods;
      if (filterFoodDate) {
        filteredFoods = filteredFoods.filter((food) =>
          food.date.includes(filterFoodDate)
        );
      }
      return { ...state, filteredFoodsByDate: filteredFoods };

    default:
      return state;
  }
};
