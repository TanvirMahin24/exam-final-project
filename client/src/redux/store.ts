import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import examSlice from "./slices/examSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    exam: examSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
