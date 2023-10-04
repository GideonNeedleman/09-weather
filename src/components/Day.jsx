import { formatDay, getWeatherIcon } from "../utils/helpers";

function Day({ date, max, min, code, isToday, isCelsius }) {
  const minF = (min * 9) / 5 + 32;
  const maxF = (max * 9) / 5 + 32;

  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      {isCelsius ? (
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      ) : (
        <p>
          {Math.floor(minF)}&deg; &mdash;{" "}
          <strong>{Math.ceil(maxF)}&deg;</strong>
        </p>
      )}
    </li>
  );
}

export default Day;
