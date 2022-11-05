import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadProgressActiveTypes } from "../../screens/shared/general/components/LoadProgressModal";

interface GeneralMessageType {
  isactive: boolean;
  title: string;
  description: string;
}

interface DefaultSliceType {
  general: GeneralMessageType;
  percentcomplete: string;
  uploadcancelled: boolean;
}

const slice = createSlice({
  name: "loadprogressmessage",
  initialState: {
    general: {
      isactive: false,
      title: " ",
      description: " ",
    },
    percentcomplete: " ",
    uploadcancelled: false,
  } as DefaultSliceType,
  reducers: {
    clearLoadProgressMessage: (state) => {
      state.general = {
        isactive: false,
        title: " ",
        description: " ",
      };
      state.percentcomplete = " ";
    },
    setLoadProgressActive: (
      state,
      action: PayloadAction<LoadProgressActiveTypes>
    ) => {
      state.general.isactive = true;
      state.general.title = action.payload.title;
      state.general.description = action.payload.description;
      state.uploadcancelled = false;
    },
    setLoadProgressInactive: (state) => {
      state.general.isactive = false;
    },
    setPercentComplete: (state, action: PayloadAction<string>) => {
      state.percentcomplete = action.payload;
    },
    setUploadCancelledTrue: (state) => {
      state.uploadcancelled = true;
    },
  },
});

export const {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
  clearLoadProgressMessage,
  setUploadCancelledTrue,
} = slice.actions;
export default slice.reducer;
