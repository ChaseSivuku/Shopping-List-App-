import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string | null;
  userId: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: null,
  userId: null,
  isAuthenticated: false,
};

type LoginPayload = { email: string; userId: number };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
