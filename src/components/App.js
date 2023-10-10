import { WeatherProvider } from "../context/WeatherContext";
import Input from "./Input";
import Title from "./Title";
import Loader from "./Loader";
import Locations from "./Locations";

export default function App() {
  /*   const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [chosenLocation, setChosenLocation] = useState({});
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem("savedLocations")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCelsius, setIsCelsius] = useState(
    JSON.parse(localStorage.getItem("isCelsius")) || false
  ); */

  // fetchLocation
  /*   useEffect(() => {
    const fetchLocation = async () => {
      if (query.length <= 2) return;

      try {
        setIsLoading(true);

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        );
        const geoData = await geoRes.json();

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
  }, [query]); */

  // store savedLocations to localStorage
  /*   useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]); */

  // console.log("Chosen Location: ", chosenLocation);
  // console.log("saved locations: ", savedLocations);

  return (
    <WeatherProvider>
      <div className="app">
        <Title />
        <Input />
        <Loader />
        <Locations />
      </div>
    </WeatherProvider>
  );
}
