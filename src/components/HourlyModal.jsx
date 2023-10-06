import { useEffect, useState } from "react";
import { formatDay } from "../utils/helpers";

function HourlyModal({ isToday, date, chosenLocation }) {
  const [weather, setWeather] = useState({});
  const dayName = isToday ? "Today" : formatDay(date, "long");

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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic natus
          earum atque sapiente a id omnis debitis error optio excepturi officia,
          officiis qui tempore deserunt autem quasi similique impedit magnam.
        </div>
      </div>
    </div>
  );
}

export default HourlyModal;
