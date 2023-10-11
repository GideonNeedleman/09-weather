import { useEffect, useState } from "react";
import { formatDay, objectSlice } from "../utils/helpers";
import Hour from "./Hour";
import dayjs from "dayjs";

// setup Day.js library with timezone plugin
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function HourlyModal({ isToday, date, location }) {
  const [weather, setWeather] = useState({});
  const [timezone, setTimezone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dayName = isToday ? "Today" : formatDay(date, "long");
  const { temperature_2m: temp, time, weathercode, is_day } = weather;

  // fetchWeather
  useEffect(() => {
    async function fetchWeather() {
      const { latitude, longitude, timezone: timezoneLocal } = location;
      try {
        setIsLoading(true);
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezoneLocal}&hourly=weathercode,temperature_2m,is_day`
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
  }, [location, date]);

  return (
    <div className="hourly-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{dayName}</h2>
          {isLoading && <p className="loader">Loading...</p>}
          <ul className="modal-list">
            {time?.map((hour, i) =>
              // Filter out times before the current hour
              // if (isToday && time hour >= current hour) return;
              !isToday ? (
                <Hour
                  time={hour}
                  temp={temp.at(i)}
                  weathercode={weathercode.at(i)}
                  isDay={is_day.at(i)}
                  isToday={isToday}
                  timezone={timezone}
                  key={hour}
                />
              ) : (
                dayjs() <= dayjs.tz(hour, timezone).add(1, "hour") && (
                  <Hour
                    time={hour}
                    temp={temp.at(i)}
                    weathercode={weathercode.at(i)}
                    isDay={is_day.at(i)}
                    isToday={isToday}
                    timezone={timezone}
                    key={hour}
                  />
                )
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HourlyModal;
