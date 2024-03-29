import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../global/CommonTypes";
import { AddVideoToPGFullGamePostsPT } from "../screens/explore/operations/AddVideoToPGPosts";
import { UserSearchResultType } from "../screens/explore/operations/GetUserSearchResults";
import { FullGameItemType } from "../screens/shared/public_game/pages/PGLanding";
import { SetPGSearchResultInputTypes } from "../screens/shared/public_game/operations/PGSearchTitles";
import { GameCoverTileType } from "../screens/shared/game_tags/components/GameCoverTile";

interface InitialSliceTypes {
  userSearchResult: UserSearchResultType[];
  userSearchNextToken: string | null;
  userSearchActive: boolean;
  pgSearchResult: GameCoverTileType[];
  pgSearchNextToken: string | null;
  pgSearchActive: boolean;
  pgFullGame: FullGameItemType;
  pgFullGamePosts: PostType[];
  pgFullGamePostsNextToken: string | null;
  pgFullGamePostSearchActive: boolean;
}

const emptyArray = [];

const emptyPGFullGame: FullGameItemType = {
  id: null,
  title: null,
  coverID: null,
  backgroundID: null,
  series: null,
  releaseDate: null,
  numUserGames: null,
};

const slice = createSlice({
  name: "exploremain",
  initialState: {
    userSearchResult: [],
    userSearchNextToken: null,
    userSearchActive: false,
    pgSearchResult: [],
    pgSearchNextToken: null,
    pgSearchActive: false,
    pgFullGame: emptyPGFullGame,
    pgFullGamePosts: [],
    pgFullGamePostsNextToken: null,
    pgFullGamePostSearchActive: false,
  } as InitialSliceTypes,
  reducers: {
    clearExplore: (state) => {
      state.userSearchResult.length = 0;
      state.userSearchNextToken = null;
    },
    addToUserSearchResult: (
      state,
      action: PayloadAction<UserSearchResultType>
    ) => {
      state.userSearchResult.push(action.payload);
    },
    clearUserSearchResult: (state) => {
      state.userSearchResult = emptyArray;
      state.userSearchNextToken = null;
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
    setPGFullGame: (state, action: PayloadAction<FullGameItemType>) => {
      state.pgFullGame = action.payload;
    },
    clearPGFullGame: (state) => {
      state.pgFullGame = emptyPGFullGame;
    },
    clearPGFullGamePosts: (state) => {
      state.pgFullGamePosts = emptyArray;
      state.pgFullGamePostsNextToken = null;
    },
    addToPGFullGamePosts: (state, action: PayloadAction<PostType>) => {
      state.pgFullGamePosts.push(action.payload);
    },
    setPGFullGamePostsNextToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.pgFullGamePostsNextToken = action.payload;
    },
    setPGFullGamePostSearchActive: (state, action: PayloadAction<boolean>) => {
      state.pgFullGamePostSearchActive = action.payload;
    },
    addVideoToPGFullGamePosts: (
      state,
      action: PayloadAction<AddVideoToPGFullGamePostsPT>
    ) => {
      state.pgFullGamePosts[action.payload.index].signedurl =
        action.payload.signedURL;
    },
  },
});

// FriendStatus options: true, false, incomingpending, outgoingpending

export const {
  addToUserSearchResult,
  clearUserSearchResult,
  clearExplore,
  setUserSearchResultsArray,
  addNextUserSearchResultsArray,
  setUserSearchNextToken,
  setUserSearchActive,
  clearPGSearchResult,
  setPGSearchResult,
  setPGSearchNextToken,
  addNextPGSearchResults,
  setPGFullGame,
  clearPGFullGame,
  clearPGFullGamePosts,
  setPGFullGamePostsNextToken,
  setPGFullGamePostSearchActive,
  addToPGFullGamePosts,
  addVideoToPGFullGamePosts,
} = slice.actions;
export default slice.reducer;
