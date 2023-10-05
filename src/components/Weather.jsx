import { useEffect, useState } from "react";
import Day from "./Day";
import { convertToFlag } from "../utils/helpers";

function Weather({
  chosenLocation,
  isCelsius,
  savedLocations,
  setSavedLocations,
}) {
  const [weather, setWeather] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  console.log("Weather Data", weather);

  // set displayName
  useEffect(() => {
    chosenLocation.admin1
      ? setDisplayName(
          `${chosenLocation.name} ${chosenLocation.admin1} ${convertToFlag(
            chosenLocation.country_code
          )}`
        )
      : setDisplayName(
          `${chosenLocation.name} ${convertToFlag(chosenLocation.country_code)}`
        );
  }, [chosenLocation]);

  // fetchWeather
  useEffect(() => {
    async function fetchWeather() {
      const { latitude, longitude, timezone } = chosenLocation;
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
  }, [chosenLocation]);

  function handlePin() {
    !isPinned
      ? setSavedLocations(chosenLocation)
      : setSavedLocations(
          ...savedLocations.filter((el) => el.id !== chosenLocation.id)
        );
    setIsPinned((prev) => !prev);
  }
  return (
    <>
      {displayName.length > 2 && (
        <div>
          <div className="pin">
            <input
              type="checkbox"
              name="pin"
              id="pin"
              checked={isPinned}
              value={isPinned}
              onChange={handlePin}
            />
            <label htmlFor="pin">pin</label>
          </div>
          <h2>Forecast for {displayName}</h2>
          <ul className="weather">
            {dates?.map((date, i) => (
              <Day
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                key={date}
                isToday={i === 0}
                isCelsius={isCelsius}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Weather;
