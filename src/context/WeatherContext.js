import { createContext, useContext, useReducer } from "react";

const WeatherContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("unknown action type");
  }
}

const initialState = {
  query: "",
  results: [],
  chosenLocation: {},
  savedLocations: JSON.parse(localStorage.getItem("savedLocations")) || [],
  isLoading: false,
  isVisible: false,
  isCelsius: JSON.parse(localStorage.getItem("isCelsius")) || false,
};

function WeatherProvider({ children }) {
  const [
    {
      query,
      results,
      chosenLocation,
      savedLocations,
      isLoading,
      isVisible,
      isCelsius,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <WeatherContext.Provider
      value={{
        query,
        results,
        chosenLocation,
        savedLocations,
        isLoading,
        isVisible,
        isCelsius,

        dispatch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("useWeather used outside of WeatherProvider");
  return context;
}

export { WeatherProvider, useWeather };
