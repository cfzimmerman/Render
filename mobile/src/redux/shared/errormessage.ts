import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDialogueType } from "../../global/UserDialogue";

interface InitialSliceTypes {
  isactive: boolean;
  header: string;
  title: string;
  description: string;
}

const slice = createSlice({
  name: "errormessage",
  initialState: {
    isactive: false,
    header: " ",
    title: " ",
    description: " ",
  } as InitialSliceTypes,
  reducers: {
    clearErrorMessage: (state) => {
      state.isactive = false;
      state.header = " ";
      state.title = " ";
      state.description = " ";
    },
    setErrorMessageActive: (state, action: PayloadAction<UserDialogueType>) => {
      state.isactive = true;
      state.header = action.payload.header;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setErrorMessageInactive: (state) => {
      state.isactive = false;
    },
  },
});

export const {
  setErrorMessageActive,
  setErrorMessageInactive,
  clearErrorMessage,
} = slice.actions;
export default slice.reducer;
