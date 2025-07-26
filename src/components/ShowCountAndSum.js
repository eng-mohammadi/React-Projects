import React, { useContext } from "react";
import { dataContext } from "../App";

const ShowCountAndSum = () => {
  const { data } = useContext(dataContext);
  const { count, sum } = data;

  return (
    <React.Fragment>
      <div className="count-sum__container">
        <div className="count">
          <p>Count: {count}</p>
        </div>
        <div className="sum">
          <p>Sum: {sum} تومان</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowCountAndSum;
