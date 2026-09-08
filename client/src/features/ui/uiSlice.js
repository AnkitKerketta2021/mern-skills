import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: { sidebarOpen: false, notice: null, apiPending: 0 },
  reducers: {
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen; },
    closeSidebar(state) { state.sidebarOpen = false; },
    setNotice(state, action) { state.notice = action.payload; },
    clearNotice(state) { state.notice = null; },
    apiStart(state) { state.apiPending += 1; },
    apiEnd(state) { state.apiPending = Math.max(0, state.apiPending - 1); }
  }
});

export const { toggleSidebar, closeSidebar, setNotice, clearNotice, apiStart, apiEnd } = slice.actions;
export default slice.reducer;
