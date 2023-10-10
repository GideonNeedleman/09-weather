import { useWeather } from "../context/WeatherContext";
import Weather from "./Weather";

function Locations() {
  const { chosenLocation, savedLocations, query } = useWeather();
  const isSaved = savedLocations.map((el) => el.id).includes(chosenLocation.id);

  return (
    <div className="locations">
      {isSaved && (
        <h3 className="existing-location">
          This location is already saved below
        </h3>
      )}

      {chosenLocation.id && query.length > 2 && !isSaved && (
        <Weather location={chosenLocation} key={chosenLocation.id} />
      )}
      {savedLocations.toReversed().map((location) => (
        <Weather location={location} isSaved={true} key={location.id} />
      ))}
    </div>
  );
}

export default Locations;
