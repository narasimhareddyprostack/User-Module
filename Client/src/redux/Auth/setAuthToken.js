//to update HTTP Headers.
import Axios from "axios";
let setAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};
export { setAuthToken };
