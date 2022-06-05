import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "errormessage",
  initialState: {
    isactive: false,
    header: " ",
    title: " ",
    description: " ",
  },
  reducers: {
    clearErrorMessage: (state) => {
      state.isactive = false;
      state.header = " ";
      state.title = " ";
      state.description = " ";
    },
    setErrormessageActive: (state, action) => {
      state.isactive = true;
      state.header = action.payload.header;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setErrormessageInactive: (state, action) => {
      state.isactive = false;
    },
  },
});

export const {
  setErrormessageActive,
  setErrormessageInactive,
  clearErrorMessage,
} = slice.actions;
export default slice.reducer;
