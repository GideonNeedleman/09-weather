import { WeatherProvider } from "../context/WeatherContext";
import Input from "./Input";
import Title from "./Title";
import Loader from "./Loader";
import Locations from "./Locations";

export default function App() {
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
