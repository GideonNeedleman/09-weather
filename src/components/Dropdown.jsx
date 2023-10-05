import { convertToFlag } from "../utils/helpers";

function Dropdown({
  altLocations,
  setDisplayLocation,
  setWeather,
  setIsVisible,
}) {
  async function onSelect(location) {
    // set alt to be the new location
    const { latitude, longitude, timezone, name, country_code, admin1 } =
      location;
    console.log(location);
    admin1
      ? setDisplayLocation(`${name} ${admin1} ${convertToFlag(country_code)}`)
      : setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

    // fetch weather for this new alt location
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
      setIsVisible(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="dropdownMenu">
      {altLocations.map((location) => (
        <div
          value={location}
          key={location.id}
          onClick={() => onSelect(location)}
          className="dropdownItem"
        >
          {location.name}, {location.admin1}, {location.country}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
