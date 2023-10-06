import "./ToggleSwitch.css";

function ToggleSwitch({ isCelsius, setIsCelsius }) {
  return (
    <div className="toggle-button-cover">
      <div className="button r" id="button-1">
        <input
          type="checkbox"
          className="cbox"
          checked={isCelsius}
          onChange={() => {
            localStorage.setItem("isCelsius", JSON.stringify(!isCelsius));
            setIsCelsius((prev) => !prev);
          }}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
