import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DefaultSliceType {
  localConfig: LocalConfigType;
}

export interface LocalConfigType {
  syncPreference: null | "All" | "Partial" | "None";
}

const slice = createSlice({
  name: "localsync",
  initialState: {
    localConfig: {
      syncPreference: null,
    },
  } as DefaultSliceType,
  reducers: {
    clearLocalSync: (state) => {
      state.localConfig.syncPreference = null;
    },
    setLocalConfig: (state, action: PayloadAction<LocalConfigType>) => {
      state.localConfig.syncPreference = action.payload.syncPreference;
    },
  },
});

export const { clearLocalSync, setLocalConfig } = slice.actions;

export default slice.reducer;
