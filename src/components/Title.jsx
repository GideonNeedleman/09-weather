import ToggleSwitch from "./ToggleSwitch";

function Title({ isCelsius, setIsCelsius }) {
  return (
    <header>
      <ToggleSwitch isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      <h1 className="title">Your Weather</h1>
    </header>
  );
}

export default Title;
