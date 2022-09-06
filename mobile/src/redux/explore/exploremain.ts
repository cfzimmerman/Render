import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSearchResultType } from "../../screens/tabnav/explore/GetUserSearchResults";
import { SetPGSearchResultInputTypes } from "../../screens/tabnav/explore/PGSearchTitles";
import { GameCoverTileType } from "../../screens/tabnav/homevault/GameTags/GameCoverTile";

interface InitialSliceTypes {
  userSearchResult: UserSearchResultType[];
  userSearchNextToken: string | null;
  userSearchActive: boolean;
  pgSearchResult: GameCoverTileType[];
  pgSearchNextToken: string | null;
  pgSearchActive: boolean;
}

const emptyArray = [];

const slice = createSlice({
  name: "exploremain",
  initialState: {
    userSearchResult: [],
    userSearchNextToken: null,
    userSearchActive: false,
    pgSearchResult: [],
    pgSearchNextToken: null,
    pgSearchActive: false,
  } as InitialSliceTypes,
  reducers: {
    clearExplore: (state, action) => {
      state.userSearchResult.length = 0;
      state.userSearchNextToken = null;
    },
    addToUserSearchResult: (state, action) => {
      state.userSearchResult.push(action.payload);
    },
    clearUserSearchResult: (state) => {
      state.userSearchResult = emptyArray;
      state.userSearchNextToken = null;
    },
    changeFriendStatus: (state, action) => {
      state.userSearchResult[action.payload.index].relationship =
        action.payload.status;
    },
    setUserSearchResultsArray: (
      state,
      action: PayloadAction<UserSearchResultType[]>
    ) => {
      state.userSearchResult = action.payload;
    },
    addNextUserSearchResultsArray: (
      state,
      action: PayloadAction<UserSearchResultType[]>
    ) => {
      state.userSearchResult = state.userSearchResult.concat(action.payload);
    },
    setUserSearchNextToken: (state, action: PayloadAction<string | null>) => {
      state.userSearchNextToken = action.payload;
    },
    setUserSearchActive: (state, action: PayloadAction<boolean>) => {
      state.userSearchActive = action.payload;
    },
    clearPGSearchResult: (state) => {
      state.pgSearchResult = emptyArray;
      state.pgSearchNextToken = null;
    },
    setPGSearchResult: (
      state,
      action: PayloadAction<SetPGSearchResultInputTypes>
    ) => {
      state.pgSearchResult = action.payload.resultsArray;
      state.pgSearchNextToken = action.payload.nextNextToken;
    },
    setPGSearchNextToken: (state, action: PayloadAction<string | null>) => {
      state.pgSearchNextToken = action.payload;
    },
    addNextPGSearchResults: (
      state,
      action: PayloadAction<SetPGSearchResultInputTypes>
    ) => {
      state.pgSearchResult = state.pgSearchResult.concat(
        action.payload.resultsArray
      );
      state.pgSearchNextToken = action.payload.nextNextToken;
    },
  },
});

// FriendStatus options: true, false, incomingpending, outgoingpending

export const {
  addToUserSearchResult,
  clearUserSearchResult,
  changeFriendStatus,
  clearExplore,
  setUserSearchResultsArray,
  addNextUserSearchResultsArray,
  setUserSearchNextToken,
  setUserSearchActive,
  clearPGSearchResult,
  setPGSearchResult,
  setPGSearchNextToken,
  addNextPGSearchResults,
} = slice.actions;
export default slice.reducer;
