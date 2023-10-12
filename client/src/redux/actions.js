import axios from "axios";
export const SET_DRIVERS = "SET_DRIVERS";
export const SET_DRIVER = "SET_DRIVER";
export const CLEAR_DRIVER = "CLEAR_DRIVER";

const cleanDriverAction = () => {
  return {
    type: CLEAR_DRIVER,
    payload: {},
  };
};

const setDriverAction = async (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/drivers/${id}`);
      return dispatch({
        type: SET_DRIVER,
        payload: data[0],
      });
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };
};

const setDriversAction = async () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/drivers");
      return dispatch({
        type: SET_DRIVERS,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };
};

export { setDriversAction, setDriverAction, cleanDriverAction };
