import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DefaultSliceType {
  isactive: boolean;
  landscape: boolean;
}

const slice = createSlice({
  name: "pageoptions",
  initialState: {
    isactive: false,
    landscape: false,
  } as DefaultSliceType,
  reducers: {
    clearPageOptions: (state) => {
      state.isactive = false;
      state.landscape = false;
    },
    setLandscapeActive: (state, action: PayloadAction<boolean>) => {
      state.landscape = action.payload;
    },
  },
});

export const { setLandscapeActive, clearPageOptions } = slice.actions;
export default slice.reducer;
