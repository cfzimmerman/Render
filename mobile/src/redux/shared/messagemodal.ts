import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ButtonMessagePropTypes {
  isactive: boolean;
  header: string;
  title: string;
  description: string;
  leftButton: {
    Action: Function | null;
    title: string;
  };
  rightButton: {
    Action: Function | null;
    title: string;
  };
}

const slice = createSlice({
  name: "messagemodal",
  initialState: {
    systemmessagemodal: {
      isactive: false,
      header: " ",
      title: " ",
      description: " ",
    },
    buttonmessagemodal: {
      isactive: false,
      header: " ",
      title: " ",
      description: " ",
      leftButton: {
        Action: null,
        title: " ",
      },
      rightButton: {
        Action: null,
        title: " ",
      },
    },
  },
  reducers: {
    clearSystemMessage: (state) => {
      state.systemmessagemodal.isactive = false;
      state.systemmessagemodal.header = " ";
      state.systemmessagemodal.title = " ";
      state.systemmessagemodal.description = " ";
      state.buttonmessagemodal.isactive = false;
      state.buttonmessagemodal.header = " ";
      state.buttonmessagemodal.title = " ";
      state.buttonmessagemodal.description = " ";
      state.buttonmessagemodal.leftButton.Action = null;
      state.buttonmessagemodal.leftButton.title = " ";
      state.buttonmessagemodal.rightButton.Action = null;
      state.buttonmessagemodal.rightButton.title = " ";
    },
    setSystemmessageActive: (state, action) => {
      state.systemmessagemodal.isactive = true;
      state.systemmessagemodal.header = action.payload.header;
      state.systemmessagemodal.title = action.payload.title;
      state.systemmessagemodal.description = action.payload.description;
    },
    setSystemmessageInactive: (state, action) => {
      state.systemmessagemodal.isactive = false;
    },
    setButtonMessageActive: (
      state,
      action: PayloadAction<ButtonMessagePropTypes>
    ) => {
      // Fills ButtonMessageModal with nessary data
      state.buttonmessagemodal.isactive = action.payload.isactive;

      state.buttonmessagemodal.header = action.payload.header;

      state.buttonmessagemodal.title = action.payload.title;

      state.buttonmessagemodal.description = action.payload.description;

      state.buttonmessagemodal.leftButton.title =
        action.payload.leftButton.title;

      state.buttonmessagemodal.leftButton.Action =
        action.payload.leftButton.Action;

      state.buttonmessagemodal.rightButton.title =
        action.payload.rightButton.title;

      state.buttonmessagemodal.rightButton.Action =
        action.payload.rightButton.Action;
    },
    setButtonMessageInactive: (state) => {
      state.buttonmessagemodal.isactive = false;
    },
  },
});

export const {
  setSystemmessageActive,
  setSystemmessageInactive,
  clearSystemMessage,
  setButtonMessageActive,
  setButtonMessageInactive,
} = slice.actions;

export default slice.reducer;
