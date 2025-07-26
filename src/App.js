import React, { useEffect, useReducer } from "react";
import "./styles/main-styles.scss";
import Stage from "./components/Stage";
import ShowCountAndSum from "./components/ShowCountAndSum";
import Chairs from "./components/Chairs";
import axios from "axios";

const getNextState = (current) => {
  switch (current) {
    case "unselected":
      return "selected";
    case "selected":
      return "temporaryReservation";
    case "temporaryReservation":
      return "reserved";
    default:
      return current;
  }
};

const initialState = {
  chairs: [],
  errorMessage: null,
  loading: true,
  reservedMessage: null,
  count: 0,
  sum: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_success":
      return {
        ...state,
        chairs: action.chairsInfo,
        loading: false,
      };
    case "fetch_failure":
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };
    case "toggle_chair": {
      const newChairs = state.chairs.map((chair) =>
        chair.number === action.number
          ? { ...chair, state: getNextState(chair.state) }
          : chair
      );

      const reservedChairs = newChairs.filter(
        (chair) => chair.state === "reserved"
      );

      const count = reservedChairs.length;
      const sum = reservedChairs.reduce((acc, chair) => acc + chair.price, 0);

      return {
        ...state,
        chairs: newChairs,
        count,
        sum,
      };
    }
    default:
      return state;
  }
};

export const dataContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("/chairs.json")
      .then((response) =>
        dispatch({ type: "fetch_success", chairsInfo: response.data })
      )
      .catch((error) =>
        dispatch({ type: "fetch_failure", error: error.message })
      );
  }, []);
  return (
    <React.Fragment>
      <Stage />
      <dataContext.Provider value={{ data, dispatch }}>
        <ShowCountAndSum />
        <Chairs />
      </dataContext.Provider>
    </React.Fragment>
  );
};

export default App;
