import Day from "./Day";

function Weather({ weather, location, isCelsius }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  console.log(weather);
  return (
    <>
      {location.length > 2 && (
        <div>
          <h2>Forecast for {location}</h2>
          <ul className="weather">
            {dates?.map((date, i) => (
              <Day
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                key={date}
                isToday={i === 0}
                isCelsius={isCelsius}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Weather;
