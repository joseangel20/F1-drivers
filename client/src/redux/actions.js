import axios from "axios";
import * as types from "../redux/types";

const filterAction = (filter) => {
  
  if (filter.includes("asce")) {
    return {
      type: types.FILTER,
      payload: {
        value: filter.substring(0, filter.indexOf("_")),
        filter: "asce",
      },
    };
  } else {
    return {
      type: types.FILTER,
      payload: {
        value: filter.substring(0, filter.indexOf("_")),
        filter: "desc",
      },
    };
  }
};

const filterTeamAction = (name) => {
  return {
    type: types.FILTER_TEAM,
    payload: name,
  };
};

const filterOriginAction = (option) => {
  const CANTIDAD_DRIVERS_API = 508;
  if (option === "api") {
    return {
      type: types.FILTER_ORIGEN,
      payload: { start: 0, end: CANTIDAD_DRIVERS_API },
    };
  } else if (option === "dataBase") {
    return {
      type: types.FILTER_ORIGEN,
      payload: { start: CANTIDAD_DRIVERS_API + 1, end: undefined },
    };
  }
};

const clearDriversAction = () => {
  return {
    type: types.CLEAR_DRIVERS,
    payload: [],
  };
};

const cleanDriverAction = () => {
  return {
    type: types.CLEAR_DRIVER,
    payload: {},
  };
};

const getDriverNamesAction = async (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/drivers/name?name=${name}`);

      return dispatch({
        type: types.GET_DRIVERS,
        payload: data,
      });
    } catch ({ response }) {
      dispatch(clearDriversAction());
    }
  };
};

const getDriverAction = async (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/drivers/${id}`);
      return dispatch({
        type: types.GET_DRIVER,
        payload: data[0],
      });
    } catch (response) {
      //console.log(response.data.error);
    }
  };
};

const getDriversAction = async () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/drivers");
      return dispatch({
        type: types.GET_DRIVERS,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };
};

const getTeamsAction = async () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/teams");
      return dispatch({
        type: types.GET_TEAMS,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };
};
export {
  getDriversAction,
  getDriverAction,
  getDriverNamesAction,
  getTeamsAction,
  cleanDriverAction,
  filterOriginAction,
  filterTeamAction,
  filterAction,
};
