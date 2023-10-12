import { SET_DRIVERS, SET_DRIVER, CLEAR_DRIVER } from "./actions";

const drivers = {
  allDrivers: [],
  filterDrivers: [],
  driver: {},
};

const driversReducer = (state = drivers, action) => {
  switch (action.type) {
    case SET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        filterDrivers: action.payload,
      };
    case SET_DRIVER:
      return {
        ...state,
        driver: action.payload,
      };
      case CLEAR_DRIVER:
        return{
          ...state,
          driver:action.payload
        }
    default:
      return state;
  }
};

export default driversReducer;
