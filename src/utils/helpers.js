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

function formatDay(dateStr, length) {
  return new Intl.DateTimeFormat("en", {
    weekday: length,
  }).format(new Date(`${dateStr}T00:00`));
}

// slices object with same shape as api.open-meteo.com response. Returned object has same shape with subarrays of length numElements
function objectSlice(object, start, numElements) {
  const newObject = {};
  for (const key in object) {
    newObject[key] = object[key].slice(start, start + numElements);
  }
  return newObject;
}

export { getWeatherIcon, convertToFlag, formatDay, objectSlice };
