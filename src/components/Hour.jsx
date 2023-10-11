import dayjs from "dayjs";
import { getWeatherIcon, celsiusToFahrenheit } from "../utils/helpers";
import { useWeather } from "../context/WeatherContext";

// setup Day.js library with timezone plugin
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function Hour({ time, temp, weathercode, isDay }) {
  const tempC = Math.round(temp);
  const tempF = Math.round(celsiusToFahrenheit(temp));
  const leadingZero = time.slice(11, 12) === "0";
  const { isCelsius } = useWeather();

  return (
    <li className="hour-card">
      <span className="hour-icon">{getWeatherIcon(weathercode, isDay)}</span>
      <span className="hour-time">
        {leadingZero ? time.slice(12) : time.slice(11)}
      </span>
      <span className="hour-temp">{isCelsius ? `${tempC}°` : `${tempF}°`}</span>
    </li>
  );
}

export default Hour;
