import axios from "axios";
export const SET_DRIVERS = "SET_DRIVERS";

const setDriversAction = async () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/drivers");
      return dispatch({
        type: SET_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};


export { setDriversAction };
