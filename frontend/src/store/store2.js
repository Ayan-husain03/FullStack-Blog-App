import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";

export const store2 = configureStore({
  reducer: {
    user: userReducer,
  },
});
