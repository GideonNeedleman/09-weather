import { useEffect, useState } from "react";
import { formatDay, objectSlice } from "../utils/helpers";
import Hour from "./Hour";
import Loader from "./Loader";

function HourlyModal({ isToday, date, chosenLocation, isCelsius }) {
  const [weather, setWeather] = useState({});
  const [timezone, setTimezone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dayName = isToday ? "Today" : formatDay(date, "long");
  const { temperature_2m: temp, time, weathercode } = weather;

  // fetchWeather
  useEffect(() => {
    async function fetchWeather() {
      const { latitude, longitude, timezone: timezoneLocal } = chosenLocation;
      try {
        setIsLoading(true);
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezoneLocal}&hourly=weathercode,temperature_2m`
        );
        const weatherData = await weatherRes.json();
        const found = weatherData.hourly.time.findIndex(
          (el) => el.slice(0, 10) === date
        );
        // 24 hours per day:
        setWeather(objectSlice(weatherData.hourly, found, 24));
        setTimezone(timezoneLocal);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [chosenLocation, date]);

  console.log(new Date().toUTCString());
  console.log(timezone);

  return (
    <div className="hourly-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{dayName}</h2>
          {<Loader isLoading={isLoading} />}
          <ul className="modal-list">
            {time?.map((hour, i) => (
              // Filter out times before the current hour
              // if (isToday && time hour >= new Date() hour) return;
              <Hour
                time={hour}
                temp={temp.at(i)}
                weathercode={weathercode.at(i)}
                isToday={isToday}
                isCelsius={isCelsius}
                timezone={timezone}
                key={hour}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HourlyModal;
