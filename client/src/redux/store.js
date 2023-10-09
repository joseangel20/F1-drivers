import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thank from "redux-thunk";
import driversReducer from "./reducerDrivers";

const store = createStore(driversReducer, composeWithDevTools(applyMiddleware(thank)));

export default store;
