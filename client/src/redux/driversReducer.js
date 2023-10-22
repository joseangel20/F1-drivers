import * as types from "./types";

const drivers = {
  allDrivers: [],
  filterDrivers: [],
  driver: {},
};

// Se eliminan las tildes de la cadena cuando se llama
const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const driversReducer = (state = drivers, action) => {
  switch (action.type) {
    case types.GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        filterDrivers: action.payload,
      };

    case types.CLEAR_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
      };

    case types.GET_DRIVER:
      return {
        ...state,
        driver: action.payload,
      };

    case types.CLEAR_DRIVER:
      return {
        ...state,
        driver: action.payload,
      };

    case types.FILTER_TEAM:
      if (action.payload === "")
        return { ...state, filterDrivers: state.allDrivers };
      return {
        ...state,
        filterDrivers: state.allDrivers.filter((driver) => {
          try {
            if (driver.teams.includes(action.payload)) return driver;
          } catch (error) {
            return null;
          }
        }),
      };

    case types.FILTER_ORIGEN:
      return {
        ...state,
        filterDrivers: state.filterDrivers.slice(
          action.payload.start,
          action.payload.end
        ),
      };

    case types.FILTER:
      if (action.payload.filter === "asce") {
        const filter = action.payload.value;
        return {
          ...state,
          filterDrivers: state.filterDrivers.sort((a, b) => {
            // Elimino tildes de nombres para ordenar
            a = normalize(a[filter]);
            b = normalize(b[filter]);
            if (a > b) {
              return 1;
            }
            if (a < b) {
              return -1;
            }
            return 0;
          }),
        };
      } else {
        const filter = action.payload.value;
        return {
          ...state,
          filterDrivers: state.filterDrivers.sort((a, b) => {
            a = normalize(a[filter]);
            b = normalize(b[filter]);
            if (a < b) {
              return 1;
            }
            if (a > b) {
              return -1;
            }
            return 0;
          }),
        };
      }

    default:
      return state;
  }
};

export default driversReducer;
