import axios from "axios";
import { setAlert } from "../layout/layout.actions";
import { setAuthToken } from "../Auth/setAuthToken";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const REG_USER_REQUEST = "REG_USER_REQUEST";
const REG_USER_SUCCESS = "REG_USER_SUCCESS";
const REG_USER_FAILURE = "REG_USER_FAILURE";

const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

const USER_LOGOUT = "USER_LOGOUT";

let getLogin = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      let config = {
        headers: {
          "content-type": "application/json",
        },
      };
      let response = await axios.post(
        `/user/login`,
        JSON.stringify(user),
        config
      );
      console.log(response);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });

      dispatch(setAlert("Login Success", "success"));
      history.push("/");
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };
};
let getRegistration = (user, history) => {
  //return type and payload
  return async (dispatch) => {
    try {
      dispatch({ type: REG_USER_REQUEST });
      //We need to consume the backend api
      let config = {
        headers: {
          "content-type": "application/json",
        },
      };
      let response = await axios.post(
        `/user/register`,
        JSON.stringify(user),
        config
      );

      dispatch({ type: REG_USER_SUCCESS, payload: response.data });
      //setAlert Action will invoke
      dispatch(setAlert("Registration Success", "success"));

      if (localStorage.token) {
        dispatch(getUserInfo());
      }
      history.push("/users/login");
    } catch (error) {
      dispatch({ type: REG_USER_FAILURE, payload: error });
    }
  };
};
let logOutAction = (history) => {
  console.log("Hello, Testing Logout");
  return (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    history.push("/products/men");
  };
};
let getUserInfo = () => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.getItem("token"));
      }
      dispatch({ type: GET_USER_INFO_REQUEST });
      let response = await axios.get(`/user/`);

      console.log("......Testing", response);
      dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_USER_INFO_FAILURE, payload: error });
    }
  };
};
export {
  getRegistration,
  getLogin,
  USER_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REG_USER_REQUEST,
  REG_USER_SUCCESS,
  REG_USER_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  getUserInfo,
  logOutAction,
};
