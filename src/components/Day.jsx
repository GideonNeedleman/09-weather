import { useState } from "react";
import { formatDay, getWeatherIcon } from "../utils/helpers";
import HourlyModal from "./HourlyModal";

function Day({ date, max, min, code, isToday, isCelsius, chosenLocation }) {
  const minF = (min * 9) / 5 + 32;
  const maxF = (max * 9) / 5 + 32;
  const [openModal, setOpenModal] = useState(false);

  return (
    <li onClick={() => setOpenModal((prev) => !prev)}>
      {openModal && (
        <HourlyModal
          isToday={isToday}
          date={date}
          chosenLocation={chosenLocation}
          isCelsius={isCelsius}
        />
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
