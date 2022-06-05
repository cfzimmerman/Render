import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "plusmain",
  initialState: {
    uploadarray: [],
    edittextmodalactive: false,
  },
  reducers: {
    addToUploadArray: (state, action) => {
      state.uploadarray.unshift(action.payload);
    },
    clearUploadArray: (state, action) => {
      state.uploadarray.length = 0;
      state.edittextmodalactive = false;
    },
    clearPlus: (state) => {
      state.uploadarray.length = 0;
    },
    setEditTextModalActive: (state, action) => {
      state.edittextmodalactive = action.payload;
    },
  },
});

export const {
  addToUploadArray,
  clearUploadArray,
  clearPlus,
  setEditTextModalActive,
} = slice.actions;
export default slice.reducer;
