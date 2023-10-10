import { useState } from "react";
import {
  celsiusToFarenheit,
  formatDay,
  getWeatherIcon,
} from "../utils/helpers";
import HourlyModal from "./HourlyModal";
import { useWeather } from "../context/WeatherContext";

function Day({ date, max, min, code, isToday, location }) {
  const minF = celsiusToFarenheit(min);
  const maxF = celsiusToFarenheit(max);
  const [openModal, setOpenModal] = useState(false);
  const { isCelsius } = useWeather();

  return (
    <li onClick={() => setOpenModal((prev) => !prev)}>
      {openModal && (
        <HourlyModal isToday={isToday} date={date} location={location} />
      )}
      <div className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date, "short")}</p>
        {isCelsius ? (
          <p>
            {Math.floor(min)}&deg; &mdash;{" "}
            <strong>{Math.ceil(max)}&deg;</strong>
          </p>
        ) : (
          <p>
            {Math.floor(minF)}&deg; &mdash;{" "}
            <strong>{Math.ceil(maxF)}&deg;</strong>
          </p>
        )}
      </div>
    </li>
  );
}

export default Day;
