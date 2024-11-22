// src/redux/slices/auth.js

import { createSlice } from "@reduxjs/toolkit";

// Base64 encoding function
const encodeBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Base64 decoding function
const decodeBase64 = (str) => {
  return decodeURIComponent(escape(atob(str)));
};

// Default (initial) state
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(decodeBase64(localStorage.getItem("user")))
    : null,
  token: localStorage.getItem("token") || null, // Retrieve token from localStorage
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Persist user data in localStorage
      if (action.payload) {
        localStorage.setItem(
          "user",
          encodeBase64(JSON.stringify(action.payload))
        );
      } else {
        localStorage.removeItem("user");
      }
    },
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
  },
});

// Export the actions
export const { setToken, setUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
