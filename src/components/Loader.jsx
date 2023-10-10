import { useWeather } from "../context/WeatherContext";

function Loader() {
  const { isLoading } = useWeather();
  return <>{isLoading && <p className="loader">Loading...</p>}</>;
}

export default Loader;
