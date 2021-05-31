import apiReducer from "./apiReducer";
import { createStore } from "redux";

const storeApp = createStore(
  apiReducer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default storeApp;
