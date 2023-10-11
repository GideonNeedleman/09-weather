import { createContext, useContext, useEffect, useReducer } from "react";

const WeatherContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading/start":
      return {
        ...state,
        isLoading: true,
      };
    case "loading/stop":
      return {
        ...state,
        isLoading: false,
      };
    case "location/loaded":
      return {
        ...state,
        results: action.payload.results,
        chosenLocation: action.payload.results.at(0),
      };
    case "celsius/toggle":
      return {
        ...state,
        isCelsius: !state.isCelsius,
      };
    case "dropdown/toggle":
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case "query/change":
      return {
        ...state,
        query: action.payload,
        isVisible: false,
        gpsUsed: false,
      };
    case "location/set":
      return {
        ...state,
        chosenLocation: action.payload,
        isVisible: false,
      };
    case "location/pin":
      return {
        ...state,
        savedLocations: [...state.savedLocations, state.chosenLocation],
        chosenLocation: {},
      };
    case "location/unpin":
      return {
        ...state,
        savedLocations:
          state.savedLocations.length === 1
            ? []
            : [
                ...state.savedLocations.filter(
                  (el) => el.id !== action.payload.id
                ),
              ],
      };
    case "location/gpsload":
      return {
        ...state,
        gpsUsed: true,
        chosenLocation: action.payload,
      };
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
  isVisible: false, //is Dropdown menu visible
  isCelsius: JSON.parse(localStorage.getItem("isCelsius")) || false,
  gpsUsed: false,
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
      gpsUsed,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // fetchLocation
  useEffect(() => {
    const fetchLocation = async () => {
      if (query.length <= 2) return;

      try {
        dispatch({ type: "loading/start" });

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location not found");

        dispatch({ type: "location/loaded", payload: geoData });

        // 2) Getting actual weather
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "loading/stop" });
      }
    };

    fetchLocation();
  }, [query]);

  // store savedLocations to localStorage
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  // store temp units option to localStorage
  useEffect(() => {
    localStorage.setItem("isCelsius", JSON.stringify(isCelsius));
  }, [isCelsius]);

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
        gpsUsed,

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
