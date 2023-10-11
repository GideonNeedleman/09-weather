import { useEffect, useState } from "react";
import { convertToFlag } from "../utils/helpers";
import { useWeather } from "../context/WeatherContext";
import Day from "./Day";
import Pin from "./Pin";

function Weather({ location, isSaved = false }) {
  const { dispatch } = useWeather();
  const [weather, setWeather] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [isPinned, setIsPinned] = useState(isSaved);
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

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

  function handlePin() {
    !isPinned
      ? dispatch({ type: "location/pin" })
      : dispatch({ type: "location/unpin", payload: location });
    setIsPinned((prev) => !prev);
  }

  console.log("weather component");

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
