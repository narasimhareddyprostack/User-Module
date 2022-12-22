import { combineReducers } from "redux";
import userReducer from "./users/users.reducer";
import alertReducer from "./layout/layout.reducer";
let rootReducer = combineReducers({
  userData: userReducer,
  alert: alertReducer,
  });
export { rootReducer };
//named export
