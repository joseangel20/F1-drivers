
import * as types from "./types";

const teams = {
  teams: [],
};

const teamsReducer = (state = teams, action) => {
  switch (action.type) {
    
    case types.GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    default:
      return state;
  }
};

export default teamsReducer;
