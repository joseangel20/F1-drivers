import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import thank from "redux-thunk";
import driversReducer from "./driversReducer";
import teamsReducer from "./teamsReducer";

const rootReducer = combineReducers({ driversReducer, teamsReducer });
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thank))
  );

export default store;
