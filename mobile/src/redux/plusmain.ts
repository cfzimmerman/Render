import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialSliceTypes {
  edittextmodalactive: boolean;
}

const slice = createSlice({
  name: "plusmain",
  initialState: {
    edittextmodalactive: false,
  } as InitialSliceTypes,
  reducers: {
    setEditTextModalActive: (state, action: PayloadAction<boolean>) => {
      state.edittextmodalactive = action.payload;
    },
  },
});

export const { setEditTextModalActive } = slice.actions;
export default slice.reducer;
