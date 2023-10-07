import { getWeatherIcon } from "../utils/helpers";

function Hour({ time, temp, weathercode, isCelsius, isToday }) {
  const tempC = Math.round(temp);
  const tempF = Math.round((temp * 9) / 5 + 32);
  const leadingZero = time.slice(11, 12) === "0";
  // Filter out times before the current hour
  // if (isToday && time < new Date()) return;
  return (
    <li className="hour-card">
      <span className="hour-icon">{getWeatherIcon(weathercode)}</span>
      <span className="hour-time">
        {leadingZero ? " " + time.slice(12) : time.slice(11)}
      </span>
      <span className="hour-temp">{isCelsius ? `${tempC}°` : `${tempF}°`}</span>
    </li>
  );
}

export default Hour;