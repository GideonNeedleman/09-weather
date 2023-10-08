import dayjs from "dayjs";
import { getWeatherIcon } from "../utils/helpers";

// setup Day.js library with timezone plugin
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function Hour({ time, temp, weathercode, isCelsius, isToday, timezone }) {
  const tempC = Math.round(temp);
  const tempF = Math.round((temp * 9) / 5 + 32);
  const leadingZero = time.slice(11, 12) === "0";

  console.log(time);
  console.log(timezone);
  console.log("here time: ", dayjs().$d);
  /*   console.log("target time: ", dayjs(time).tz(timezone).$d);
  console.log("is target > here? ", dayjs(time).tz(timezone) > dayjs()); */
  console.log("target time: ", dayjs.tz(time, timezone).$d);
  console.log("is target > here? ", dayjs.tz(time, timezone) > dayjs());

  return (
    <li className="hour-card">
      <span className="hour-icon">{getWeatherIcon(weathercode)}</span>
      <span className="hour-time">
        {leadingZero ? time.slice(12) : time.slice(11)}
      </span>
      <span className="hour-temp">{isCelsius ? `${tempC}°` : `${tempF}°`}</span>
    </li>
  );
}

export default Hour;
