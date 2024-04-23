import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthType = {
  isAuth: boolean | null;
  user: any;
  joinOpen: boolean;
};

const initialState = {
  isAuth: null,
  user: null,
  joinOpen: false,
} as AuthType;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = action.payload ? true : false;
    },
    logout: (state) => {
      localStorage.removeItem("exam-client");
      state.isAuth = false;
      state.user = null;
    },
    setJoinModal: (state, action: PayloadAction<any>) => {
      state.joinOpen = action.payload;
    },
  },
});

export const { setUser, logout, setJoinModal } = auth.actions;
export default auth.reducer;
