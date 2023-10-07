import { useEffect, useState } from "react";
import Day from "./Day";
import { convertToFlag } from "../utils/helpers";
import Pin from "./Pin";

function Weather({
  chosenLocation,
  setChosenLocation,
  isCelsius,
  savedLocations,
  setSavedLocations,
}) {
  const [weather, setWeather] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [isPinned, setIsPinned] = useState("");
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  // console.log("Weather Data", weather);

  // check isPinned
  useEffect(() => {
    savedLocations.map((el) => el.id).includes(chosenLocation.id)
      ? setIsPinned(true)
      : setIsPinned(false);
  }, [chosenLocation, savedLocations]);

  // set displayName
  useEffect(() => {
    chosenLocation.admin1
      ? setDisplayName(
          `${chosenLocation.name}, ${chosenLocation.admin1} ${convertToFlag(
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

  function pin() {
    if (savedLocations.includes(chosenLocation)) {
      alert("Location already pinned");
      setChosenLocation({});
      return;
    }
    setSavedLocations([...savedLocations, chosenLocation]);
    setChosenLocation({});
  }

  function unPin() {
    savedLocations.length === 1
      ? setSavedLocations([])
      : setSavedLocations([
          ...savedLocations.filter((el) => el.id !== chosenLocation.id),
        ]);
  }

  function handlePin() {
    !isPinned ? pin() : unPin();
    setIsPinned((prev) => !prev);
  }

  // console.log(weather);

  return (
    <>
      {displayName.length > 2 && (
        <div className="weather-container">
          <h2>Forecast for {displayName}</h2>
          <div className="pin">
            <Pin
              id={chosenLocation.id}
              isPinned={isPinned}
              handlePin={handlePin}
            />
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
                isCelsius={isCelsius}
                chosenLocation={chosenLocation}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Weather;
