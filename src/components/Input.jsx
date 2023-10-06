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
        name="query input"
        id="query input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 1 && query.length > 2 && (
        <button
          className="btn-more"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
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
