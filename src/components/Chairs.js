import React, { useContext } from "react";
import { dataContext } from "../App";

const Chairs = () => {
  const { data, dispatch } = useContext(dataContext);
  const { chairs, loading, errorMessage } = data;
  const sections = ["B", "A", "C", "D"];

  if (loading) {
    return <h3>Loading...</h3>;
  } else if (errorMessage) {
    return <h2>Error: {errorMessage}</h2>;
  } else {
    return (
      <React.Fragment>
        <div className="chairs-list">
          {sections.map((section) => (
            <div className="chair-section" key={section}>
              <h3>Section {section}</h3>
              {chairs
                .filter((chair) => chair.section === section)
                .map((chair) => (
                  <button
                    key={chair.number}
                    title={`Price: ${chair.price} تومان`}
                    className={chair.state}
                    onClick={() => {
                      if (chair.state === "reserved") {
                        window.alert("قبلاً رزرو شده است");
                        return;
                      }
                      dispatch({ type: "toggle_chair", number: chair.number });
                    }}
                  >
                    {chair.number}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default Chairs;
