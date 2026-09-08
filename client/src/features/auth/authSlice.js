import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sessionExpired: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.sessionExpired = false;
    },
    authLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.sessionExpired = false;
    },
    authHydrated(state) {
      state.isLoading = false;
    },
    authSessionExpired(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.sessionExpired = true;
    },
  },
});

export const { authLogin, authLogout, authHydrated, authSessionExpired } =
  slice.actions;
export default slice.reducer;
