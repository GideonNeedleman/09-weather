import { useState } from "react";
import Day from "./Day";

function Weather({
  weather,
  displayLocation,
  location,
  isCelsius,
  savedLocations,
  setSavedLocations,
}) {
  const [isPinned, setIsPinned] = useState(false);
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  console.log(weather);

  function handlePin() {
    !isPinned
      ? setSavedLocations(location)
      : setSavedLocations(
          ...savedLocations.filter((el) => el.id !== location.id)
        );
    setIsPinned((prev) => !prev);
  }
  return (
    <>
      {displayLocation.length > 2 && (
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
          <h2>Forecast for {displayLocation}</h2>
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
