import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default function App() {
  const [location, setLocation] = useState("");
  const [altLocations, setAltLocations] = useState([]);
  const [altChosen, setAltChosen] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  // fetchWeather
  useEffect(() => {
    const fetchWeather = async () => {
      if (location.length <= 2) return setWeather({});

      try {
        setIsLoading(true);

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);

        setAltLocations(geoData.results);

        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  // Select alt location
  async function onSelect(location) {
    // set alt to be the new location
    const { latitude, longitude, timezone, name, country_code } = location;
    console.log(location);
    setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

    // fetch weather for this new alt location
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    setWeather(weatherData.daily);
    setIsVisible(false);
  }

  return (
    <div className="app">
      <h1>Your Weather</h1>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {altLocations.length > 1 && (
          <button
            className="btn-more"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? "less" : "more"}
          </button>
        )}

        {isVisible && (
          <div className="dropdownMenu">
            {altLocations.map((loc) => (
              <div
                value={loc}
                key={loc.id}
                onClick={() => onSelect(loc)}
                className="dropdownItem"
              >
                {loc.name}, {loc.admin1}, {loc.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading && <p className="loader">Loading...</p>}

      {location.length > 2 && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  console.log(weather);
  return (
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
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
