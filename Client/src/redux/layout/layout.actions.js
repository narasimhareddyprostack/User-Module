import { v4 } from "uuid";
const REMOVE_ALERT = "REMOVE_ALERT";
const SET_ALERT = "SET_ALERT";

let setAlert = (message, color) => {
  return (dispatch) => {
    let id = v4();
    try {
      dispatch({
        type: SET_ALERT,
        payload: { message, color, id },
      });
      setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: { id } });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
};
export { REMOVE_ALERT, SET_ALERT, setAlert};
