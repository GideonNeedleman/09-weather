import Dropdown from "./Dropdown";

function Input({
  query,
  setQuery,
  results,
  isVisible,
  setIsVisible,
  setChosenLocation,
}) {
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="Enter location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 1 && (
        <button
          className="btn-more"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "less" : "more"}
        </button>
      )}
      {isVisible && (
        <Dropdown
          results={results}
          setChosenLocation={setChosenLocation}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
}

export default Input;
