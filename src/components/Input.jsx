import { useWeather } from "../context/WeatherContext";
import Dropdown from "./Dropdown";
import GpsButton from "./GpsButton";

function Input() {
  const { query, results, isVisible, gpsUsed, dispatch } = useWeather();

  return (
    <div className="inputContainer">
      {!gpsUsed && <GpsButton />}

      <input
        type="text"
        placeholder="Enter location..."
        name="query input"
        id="query input"
        value={query}
        onChange={(e) =>
          dispatch({ type: "query/change", payload: e.target.value })
        }
      />

      {results.length > 1 && query.length > 2 && (
        <button
          className="btn-more"
          onClick={() => dispatch({ type: "dropdown/toggle" })}
        >
          {isVisible ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      )}

      {isVisible && <Dropdown />}
    </div>
  );
}

export default Input;
