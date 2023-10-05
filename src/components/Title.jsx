// import { ToggleSwitch } from "./TempSwitch";

function Title({ isCelsius, setIsCelsius }) {
  return (
    <header>
      {/* <ToggleSwitch isCelsius={isCelsius} setIsCelsius={setIsCelsius} /> */}
      <div className="switch">
        <input
          type="checkbox"
          name="degrees"
          id="degrees"
          checked={isCelsius}
          value={isCelsius}
          onChange={() => setIsCelsius((prev) => !prev)}
        />
        <label htmlFor="degrees">°C</label>
      </div>
      <h1>Your Weather</h1>
    </header>
  );
}

export default Title;
