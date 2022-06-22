import LSRewriteLocalLibrary from "../../screens/tabnav/profile/LSRewriteLocalLibrary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DefaultSliceType {
  localConfig: LocalConfigType;
  localLibrary: Record<string, LSLibraryItemType>;
}

export interface LSLibraryItemType {
  lastUpdated: string;
}

export interface AddToLocalLibraryPropsType {
  [key: string]: {
    lastUpdated: string;
  };
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
    addToLocalLibrary: (
      state,
      action: PayloadAction<AddToLocalLibraryPropsType>
    ) => {
      state.localLibrary = Object.assign(state.localLibrary, action.payload);
      LSRewriteLocalLibrary({
        localLibraryString: JSON.stringify(state.localLibrary),
      });
      // Using Redux as a source of truth from which to update localLibrary (in case async actions get piled up)
    },
    removeFromLocalLibrary: (state, action: PayloadAction<string>) => {
      if (Object.keys(state.localLibrary).length > 0) {
        const { [action.payload]: removedObject, ...rest } = state.localLibrary;
        // Destructures localLibrary to return the removedObject in one variable and the rest of the object in another. We only care about the rest, which is set back into state and saved in LocalLibrary
        state.localLibrary = rest;
        LSRewriteLocalLibrary({ localLibraryString: JSON.stringify(rest) });
      }
    },
  },
});

export const {
  clearLocalSync,
  setLocalConfig,
  setLocalLibrary,
  addToLocalLibrary,
  removeFromLocalLibrary,
} = slice.actions;

export default slice.reducer;
