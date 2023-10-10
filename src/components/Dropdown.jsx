import { useWeather } from "../context/WeatherContext";

function Dropdown() {
  const { results, dispatch } = useWeather();

  return (
    <div className="dropdownMenu">
      {results.map((location) => (
        <div
          value={location}
          key={location.id}
          onClick={() => dispatch({ type: "location/set", payload: location })}
          className="dropdownItem"
        >
          {location.admin1 ? (
            <span>
              {location.name}, {location.admin1}, {location.country}
            </span>
          ) : (
            <span>
              {location.name}, {location.country}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
