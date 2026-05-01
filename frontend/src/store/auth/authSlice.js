import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
      state.loading = false;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
