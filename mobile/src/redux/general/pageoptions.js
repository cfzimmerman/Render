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
    setPageOptionsActive: (state, action) => {
      state.isactive = true;
    },
    setPageOptionsInactive: (state, action) => {
      state.isactive = false;
    },
    setLandscapeTrue: (state, action) => {
      state.landscape = true;
    },
    setLandscapeFalse: (state, action) => {
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
