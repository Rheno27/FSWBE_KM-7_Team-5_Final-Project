//src/redux/slices/index
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";

export default combineReducers({
  auth,
});
