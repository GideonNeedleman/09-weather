import { useEffect, useState } from "react";
import Weather from "./Weather";
import { convertToFlag } from "../utils/helpers";
import Input from "./Input";
import Title from "./Title";
import Loader from "./Loader";

export default function App() {
  const [location, setLocation] = useState("");
  const [altLocations, setAltLocations] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  // fetchWeather
  useEffect(() => {
    const fetchWeather = async () => {
      if (location.length <= 2) return setWeather({});

      try {
        setIsLoading(true);

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code, admin1 } =
          geoData.results.at(0);

        setAltLocations(geoData.results);

        admin1
          ? setDisplayLocation(
              `${name} ${admin1} ${convertToFlag(country_code)}`
            )
          : setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="app">
      <Title isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      <Input
        location={location}
        setLocation={setLocation}
        altLocations={altLocations}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setDisplayLocation={setDisplayLocation}
        setWeather={setWeather}
      />

      <Loader isLoading={isLoading} />

      <Weather
        weather={weather}
        location={displayLocation}
        isCelsius={isCelsius}
      />
    </div>
  );
}
