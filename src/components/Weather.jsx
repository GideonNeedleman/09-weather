import { useEffect, useState } from "react";
import { convertToFlag } from "../utils/helpers";
import { useWeather } from "../context/WeatherContext";
import Day from "./Day";
import Pin from "./Pin";

function Weather({ location }) {
  const { savedLocations, dispatch } = useWeather();
  const [weather, setWeather] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [isPinned, setIsPinned] = useState("");
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  // check isPinned
  useEffect(() => {
    savedLocations.map((el) => el.id).includes(location.id)
      ? setIsPinned(true)
      : setIsPinned(false);
  }, [location, savedLocations]);

  // set displayName
  useEffect(() => {
    location.admin1
      ? setDisplayName(
          `${location.name}, ${location.admin1} ${convertToFlag(
            location.country_code
          )}`
        )
      : setDisplayName(
          `${location.name} ${convertToFlag(location.country_code)}`
        );
  }, [location]);

  // fetchWeather
  useEffect(() => {
    async function fetchWeather() {
      const { latitude, longitude, timezone } = location;
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWeather();
  }, [location]);

  function pin() {
    dispatch({ type: "location/pin" });
  }

  function unPin() {
    dispatch({ type: "location/unpin", payload: location });
  }

  function handlePin() {
    !isPinned ? pin() : unPin();
    setIsPinned((prev) => !prev);
  }

  return (
    <>
      {displayName.length > 2 && (
        <div className="weather-container">
          <h2>Forecast for {displayName}</h2>
          <div className="pin">
            <Pin id={location.id} isPinned={isPinned} handlePin={handlePin} />
          </div>
          <ul className="weather">
            {dates?.map((date, i) => (
              <Day
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                key={date}
                isToday={i === 0}
                location={location}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Weather;
