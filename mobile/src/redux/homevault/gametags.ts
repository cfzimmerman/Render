import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../resources/CommonTypes";
import { AddVideoToHVGameSearchResultsInputTypes } from "../../screens/tabnav/homevault/GameTags/AddVideoToHVGameSearchResults";
import { GameCoverTileType } from "../../screens/tabnav/homevault/GameTags/GameCoverTile";
import { SetNewLibraryGamesArrayInput } from "../../screens/tabnav/homevault/GameTags/GetCurrentUserGameLibrary";
import { SetNextLibraryGamesArrayInput } from "../../screens/tabnav/homevault/GameTags/GetNextCurrentUserGameLibrary";
import { AddNextAllGamesArrayPT } from "../../screens/tabnav/homevault/GameTags/SearchNextGameTitle";

interface DefaultSliceType {
  allGamesArray: GameCoverTileType[] | null;
  allGamesNextToken: string | null;
  libraryGamesArray: GameCoverTileType[] | null;
  libraryGamesNextToken: string | null;
  libraryGamesSearchResults: GameCoverTileType[];
  hvGameSearchResults: PostType[];
  hvGameSearchNextToken: string | null;
  hvGameSearchActive: boolean;
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
    libraryGamesSearchResults: [],
    hvGameSearchResults: [],
    hvGameSearchNextToken: null,
    hvGameSearchActive: false,
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
    setLibraryGamesSearchResults: (
      state,
      action: PayloadAction<GameCoverTileType[]>
    ) => {
      state.libraryGamesSearchResults = action.payload;
    },
    clearHVGameSearchResults: (state) => {
      state.hvGameSearchResults.length = 0;
      state.hvGameSearchNextToken = null;
    },
    addToHVGameSearchResults: (state, action: PayloadAction<PostType>) => {
      state.hvGameSearchResults.push(action.payload);
    },
    setHVGameSearchNextToken: (state, action: PayloadAction<string | null>) => {
      state.hvGameSearchNextToken = action.payload;
    },
    setHVGameSearchActive: (state, action: PayloadAction<boolean>) => {
      state.hvGameSearchActive = action.payload;
    },
    addVideoToHVGameSearchResults: (
      state,
      action: PayloadAction<AddVideoToHVGameSearchResultsInputTypes>
    ) => {
      state.hvGameSearchResults[action.payload.index].signedurl =
        action.payload.signedurl;
    },
    addNextHVGameSearchResultsArray: (
      state,
      action: PayloadAction<PostType[]>
    ) => {
      state.hvGameSearchResults = state.hvGameSearchResults.concat(
        action.payload
      );
    },
  },
});

export const {
  clearAllGamesArray,
  setNewAllGamesArray,
  addNextAllGamesArray,
  setNewLibraryGamesArray,
  addNextLibraryGamesArray,
  setLibraryGamesSearchResults,
  clearHVGameSearchResults,
  addToHVGameSearchResults,
  setHVGameSearchNextToken,
  setHVGameSearchActive,
  addVideoToHVGameSearchResults,
  addNextHVGameSearchResultsArray,
} = slice.actions;

export default slice.reducer;
