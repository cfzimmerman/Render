import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DefaultSliceType {
  localConfig: LocalConfigType;
  localLibrary: {} | Record<string, LSLibraryItemType>;
}

export interface LSLibraryItemType {
  lastUpdated: string;
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
    localLibrary: {},
  } as DefaultSliceType,
  reducers: {
    clearLocalSync: (state) => {
      state.localConfig.syncPreference = null;
    },
    setLocalConfig: (state, action: PayloadAction<LocalConfigType>) => {
      state.localConfig.syncPreference = action.payload.syncPreference;
    },
    setLocalLibrary: (
      state,
      action: PayloadAction<Record<string, LSLibraryItemType>>
    ) => {
      state.localLibrary = action.payload;
    },
  },
});

export const { clearLocalSync, setLocalConfig, setLocalLibrary } =
  slice.actions;

export default slice.reducer;
