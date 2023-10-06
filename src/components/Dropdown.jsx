function Dropdown({ results, setChosenLocation, setIsVisible }) {
  return (
    <div className="dropdownMenu">
      {results.map((location) => (
        <div
          value={location}
          key={location.id}
          onClick={() => {
            setChosenLocation(location);
            setIsVisible(false);
          }}
          className="dropdownItem"
        >
          {location.admin1 ? (
            <span>
              {location.name}, {location.admin1}, {location.country}
            </span>
          ) : (
            <span>
              {location.name}, {location.country}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
