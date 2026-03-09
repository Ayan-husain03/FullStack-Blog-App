import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: true,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const data = action.payload;
      state.user = data;
      state.isLoggedIn = true;
      state.loading = false;
    },
    removeUser: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
