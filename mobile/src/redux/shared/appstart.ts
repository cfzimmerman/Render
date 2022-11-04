import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appstart",
  initialState: {
    authenticated: false,
    initialdataloaded: false,
    pageassets: null,
  },
  reducers: {
    clearAppStart: (state) => {
      state.authenticated = false;
      state.initialdataloaded = false;
      state.pageassets = null;
    },
    setAllLoaded: (state) => {
      state.authenticated = true;
      state.initialdataloaded = true;
    },
    setUserAuthenticated: (state) => {
      state.authenticated = true;
    },
    setPageAssets: (state, action) => {
      state.pageassets = action.payload;
    },
    addToPageAssets: (state, action) => {
      state.pageassets[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  setAllLoaded,
  setUserAuthenticated,
  setPageAssets,
  addToPageAssets,
  clearAppStart,
} = slice.actions;
export default slice.reducer;
