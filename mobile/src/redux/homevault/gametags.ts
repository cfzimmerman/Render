import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameCoverTileType } from "../../screens/tabnav/homevault/GameTags/GameCoverTile";
import { SetNewLibraryGamesArrayInput } from "../../screens/tabnav/homevault/GameTags/GetCurrentUserGameLibrary";
import { SetNextLibraryGamesArrayInput } from "../../screens/tabnav/homevault/GameTags/GetNextCurrentUserGameLibrary";
import { AddNextAllGamesArrayPT } from "../../screens/tabnav/homevault/GameTags/SearchNextGameTitle";

interface DefaultSliceType {
  allGamesArray: GameCoverTileType[] | null;
  allGamesNextToken: string | null;
  libraryGamesArray: GameCoverTileType[] | null;
  libraryGamesNextToken: string | null;
}

export interface SetNewAllGamesArrayPT {
  newAllGamesArray: GameCoverTileType[];
  newAllGamesNextToken: null | string;
}

const slice = createSlice({
  name: "gametags",
  initialState: {
    allGamesArray: [],
    allGamesNextToken: null,
    libraryGamesArray: null,
    libraryGamesNextToken: null,
  } as DefaultSliceType,
  reducers: {
    clearAllGamesArray: (state) => {
      state.allGamesArray.length = 0;
    },
    setNewAllGamesArray: (
      state,
      action: PayloadAction<SetNewAllGamesArrayPT>
    ) => {
      state.allGamesArray = action.payload.newAllGamesArray;
      state.allGamesNextToken = action.payload.newAllGamesNextToken;
    },
    addNextAllGamesArray: (
      state,
      action: PayloadAction<AddNextAllGamesArrayPT>
    ) => {
      state.allGamesArray = state.allGamesArray.concat(
        action.payload.nextAllGamesArray
      );
      state.allGamesNextToken = action.payload.nextAllGamesNextToken;
    },
    setNewLibraryGamesArray: (
      state,
      action: PayloadAction<SetNewLibraryGamesArrayInput>
    ) => {
      state.libraryGamesArray = action.payload.newLibraryGamesArray;
      state.libraryGamesNextToken = action.payload.newLibraryGamesNextToken;
    },
    addNextLibraryGamesArray: (
      state,
      action: PayloadAction<SetNextLibraryGamesArrayInput>
    ) => {
      state.libraryGamesArray = state.libraryGamesArray.concat(
        action.payload.nextLibraryGamesArray
      );
      state.libraryGamesNextToken = action.payload.nextLibraryGamesNextToken;
    },
  },
});

export const {
  clearAllGamesArray,
  setNewAllGamesArray,
  addNextAllGamesArray,
  setNewLibraryGamesArray,
  addNextLibraryGamesArray,
} = slice.actions;

export default slice.reducer;
