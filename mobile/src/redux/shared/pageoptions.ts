import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "pageoptions",
  initialState: {
    isactive: false,
    landscape: false,
  },
  reducers: {
    clearPageOptions: (state) => {
      state.isactive = false;
      state.landscape = false;
    },
    setPageOptionsActive: (state) => {
      state.isactive = true;
    },
    setPageOptionsInactive: (state) => {
      state.isactive = false;
    },
    setLandscapeTrue: (state) => {
      state.landscape = true;
    },
    setLandscapeFalse: (state) => {
      state.landscape = false;
    },
  },
});

export const {
  setPageOptionsActive,
  setPageOptionsInactive,
  setLandscapeTrue,
  setLandscapeFalse,
  clearPageOptions,
} = slice.actions;
export default slice.reducer;
