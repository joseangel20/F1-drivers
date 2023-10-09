import {SET_DRIVERS } from "./actions";

const drivers = {
  allDrivers: [],
  filterDrivers: [],
};

const driversReducer = (state = drivers, action) => {
  switch (action.type) {
    case SET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        filterDrivers: action.payload,
      };

    default:
      return state;
  }
};

export default driversReducer;
