import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
// import "./style.css";

export const ToggleSwitch = ({
  stateProp,
  className,
  isCelsius,
  setIsCelsius,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "farenheit",
  });

  return (
    <div
      className={`toggle-switch ${state.state} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="frame">
        <div className="f">
          {state.state === "farenheit" && <>°F</>}

          {state.state === "celsius" && <>°C</>}
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.state === "farenheit") {
    switch (action) {
      case "click":
        return {
          state: "celsius",
        };
      default:
        return null;
    }
  }

  if (state.state === "celsius") {
    switch (action) {
      case "click":
        return {
          state: "farenheit",
        };
      default:
        return null;
    }
  }

  return state;
}

ToggleSwitch.propTypes = {
  stateProp: PropTypes.oneOf(["celsius", "farenheit"]),
};
