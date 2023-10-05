import { useEffect, useState } from "react";
import Weather from "./Weather";
import Input from "./Input";
import Title from "./Title";
import Loader from "./Loader";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [chosenLocation, setChosenLocation] = useState({});
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem("savedLocations")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  // fetchLocation
  useEffect(() => {
    const fetchLocation = async () => {
      if (query.length <= 2) return;

      try {
        setIsLoading(true);

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        );
        const geoData = await geoRes.json();
        console.log("results: ", geoData.results);

        if (!geoData.results) throw new Error("Location not found");

        setResults(geoData.results);
        setChosenLocation(geoData.results.at(0));

        // 2) Getting actual weather
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [query]);

  // store savedLocations to localStorage
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    console.log(savedLocations);
  }, [savedLocations]);

  console.log("Chosen Location: ", chosenLocation);
  console.log("saved locations: ", savedLocations);

  return (
    <div className="app">
      <Title isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      <Input
        query={query}
        setQuery={setQuery}
        results={results}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setChosenLocation={setChosenLocation}
      />
      <Loader isLoading={isLoading} />
      {chosenLocation.id && (
        <Weather
          chosenLocation={chosenLocation}
          setChosenLocation={setChosenLocation}
          isCelsius={isCelsius}
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
        />
      )}

      {/* Saved locations */}
      {savedLocations.map((location) => (
        <Weather
          chosenLocation={location}
          isCelsius={isCelsius}
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
          key={location.id}
        />
      ))}
    </div>
  );
}
