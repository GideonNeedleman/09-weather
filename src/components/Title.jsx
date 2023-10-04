function Title({ isCelsius, setIsCelsius }) {
  return (
    <header>
      <input
        type="checkbox"
        name="degrees"
        id="degrees"
        checked={isCelsius}
        value={isCelsius}
        onChange={() => setIsCelsius((prev) => !prev)}
      />
      <h1>Your Weather</h1>
    </header>
  );
}

export default Title;
