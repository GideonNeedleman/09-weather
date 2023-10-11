import { useEffect } from "react";
import api_key from "../api_key";
import { useWeather } from "../context/WeatherContext";
import { useGPS } from "../hooks/useGPS";

function GpsButton() {
  const apikey = api_key();
  const { isLoading, position, getPosition } = useGPS();
  const { dispatch } = useWeather();

  // trigger Loader
  useEffect(() => {
    isLoading
      ? dispatch({ type: "loading/start" })
      : dispatch({ type: "loading/stop" });
  }, [isLoading, dispatch]);

  // reverse geocode
  useEffect(() => {
    async function getLocation() {
      dispatch({ type: "loading/start" });
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${apikey}`
      );
      const data = await res.json();
      dispatch({ type: "loading/stop" });

      const location = {
        name: data.features[0].properties.city,
        admin1: data.features[0].properties.state,
        country_code: data.features[0].properties.country_code.toUpperCase(),
        latitude: position.lat,
        longitude: position.lng,
        timezone: data.features[0].properties.timezone.name,
        id: data.features[0].properties.plus_code_short,
      };
      dispatch({ type: "location/gpsload", payload: location });

      console.log(data);
      console.log(location);
    }
    position && getLocation();
  }, [position, apikey, dispatch]);

  // set chosenLocation

  function handlePressed() {
    getPosition();
    // setIsPressed(true);
  }

  return (
    <button className="btn-gps" onClick={handlePressed}>
      <i className="fa-solid fa-crosshairs"></i>
    </button>
  );
}

export default GpsButton;
