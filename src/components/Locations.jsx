import { useWeather } from "../context/WeatherContext";
import Weather from "./Weather";

function Locations() {
  const { chosenLocation, savedLocations, query } = useWeather();

  return (
    <div className="locations">
      {chosenLocation.id &&
        query.length > 0 &&
        (savedLocations.map((el) => el.id).includes(chosenLocation.id) ? (
          <h3 className="existing-location">
            This location is already saved below
          </h3>
        ) : (
          <Weather location={chosenLocation} />
        ))}
      {savedLocations.toReversed().map((location) => (
        <Weather location={location} key={location.id} />
      ))}
    </div>
  );
}

export default Locations;
