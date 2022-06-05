import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "systemmessage",
  initialState: {
    isactive: false,
    header: " ",
    title: " ",
    description: " ",
  },
  reducers: {
    clearSystemMessage: (state) => {
      state.isactive = false;
      state.header = " ";
      state.title = " ";
      state.description = " ";
    },
    setSystemmessageActive: (state, action) => {
      state.isactive = true;
      state.header = action.payload.header;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setSystemmessageInactive: (state, action) => {
      state.isactive = false;
    },
  },
});

export const {
  setSystemmessageActive,
  setSystemmessageInactive,
  clearSystemMessage,
} = slice.actions;
export default slice.reducer;
