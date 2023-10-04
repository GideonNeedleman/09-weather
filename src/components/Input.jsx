import Dropdown from "./Dropdown";

function Input({
  location,
  setLocation,
  altLocations,
  isVisible,
  setIsVisible,
  setDisplayLocation,
  setWeather,
}) {
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {altLocations.length > 1 && (
        <button
          className="btn-more"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "less" : "more"}
        </button>
      )}
      {isVisible && (
        <Dropdown
          altLocations={altLocations}
          setDisplayLocation={setDisplayLocation}
          setWeather={setWeather}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
}

export default Input;
