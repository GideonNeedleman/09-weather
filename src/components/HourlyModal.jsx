import { useEffect, useState } from "react";
import { formatDay } from "../utils/helpers";
import Hour from "./Hour";

function HourlyModal({ isToday, date, chosenLocation, isCelsius }) {
  const [weather, setWeather] = useState({});
  const dayName = isToday ? "Today" : formatDay(date, "long");
  const { temperature_2m: temp, time, weathercode } = weather;

  // fetchWeather
  useEffect(() => {
    async function fetchWeather() {
      const { latitude, longitude, timezone } = chosenLocation;
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&hourly=weathercode,temperature_2m&forecast_days=1`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.hourly);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWeather();
  }, [chosenLocation]);
  console.log(weather);
  return (
    <div className="hourly-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{dayName}</h2>
          <ul className="modal-list">
            {time?.map((hour, i) => (
              <Hour
                time={hour}
                temp={temp.at(i)}
                weathercode={weathercode.at(i)}
                isToday={isToday}
                isCelsius={isCelsius}
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
