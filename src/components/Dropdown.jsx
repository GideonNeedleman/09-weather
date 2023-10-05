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
          {location.name}, {location.admin1}, {location.country}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
