//src/redux/slices/index
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import searchQuery from "./searchQuery";

export default combineReducers({
    auth,
    searchQuery,
});
