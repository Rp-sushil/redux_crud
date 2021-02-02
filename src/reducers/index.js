import { combineReducers } from "redux";
import listReducer from "./listReducer";

const allReducers = combineReducers({
  bicycle: listReducer,
});

export default allReducers;
