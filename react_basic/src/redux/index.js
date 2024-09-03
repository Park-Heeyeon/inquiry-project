import { combineReducers } from "redux";
import modalReducer from "./modules/modalReducer";
import loadingReducer from "./modules/loadingReducer";
import userInfoReducer from "./modules/userInfoReducer";

const rootReducer = combineReducers({
  modalReducer,
  loadingReducer,
  userInfoReducer,
});
export default rootReducer;
