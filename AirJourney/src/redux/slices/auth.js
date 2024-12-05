// src/redux/slices/auth.js

import { createSlice } from "@reduxjs/toolkit";

// Default (initial) state
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null, // Retrieve token from localStorage
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
