import { useWeather } from "../context/WeatherContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { isCelsius, dispatch } = useWeather();

  return (
    <div className="toggle-button-cover">
      <div className="button r" id="button-1">
        <input
          type="checkbox"
          className="cbox"
          checked={isCelsius}
          onChange={() => dispatch({ type: "celsius/toggle" })}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
