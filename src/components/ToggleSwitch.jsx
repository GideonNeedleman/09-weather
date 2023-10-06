import "./ToggleSwitch.css";

function ToggleSwitch({ isCelsius, setIsCelsius }) {
  return (
    <div class="toggle-button-cover">
      <div class="button r" id="button-1">
        <input
          type="checkbox"
          class="cbox"
          checked={isCelsius}
          onClick={() => {
            localStorage.setItem("isCelsius", JSON.stringify(!isCelsius));
            setIsCelsius((prev) => !prev);
          }}
        />
        <div class="knobs"></div>
        <div class="layer"></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
