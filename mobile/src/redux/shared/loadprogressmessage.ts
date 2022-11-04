import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "loadprogressmessage",
  initialState: {
    general: {
      isactive: false,
      title: " ",
      description: " ",
    },
    percentcomplete: " ",
    uploadobject: null,
    uploadcanceled: false,
  },
  reducers: {
    clearLoadProgressMessage: (state) => {
      state.general = {
        isactive: false,
        title: " ",
        description: " ",
      };
      state.percentcomplete = " ";
    },
    setLoadProgressActive: (state, action) => {
      state.general.isactive = true;
      state.general.title = action.payload.title;
      state.general.description = action.payload.description;
      state.uploadcanceled = false;
    },
    setLoadProgressInactive: (state) => {
      state.general.isactive = false;
    },
    setPercentComplete: (state, action) => {
      state.percentcomplete = action.payload;
    },
    setUploadObject: (state, action) => {
      state.uploadobject = action.payload;
    },
    setUploadCanceledTrue: (state) => {
      state.uploadcanceled = true;
    },
  },
});

export const {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
  clearLoadProgressMessage,
  setUploadObject,
  setUploadCanceledTrue,
} = slice.actions;
export default slice.reducer;
