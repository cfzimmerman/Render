import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSearchResultType } from "../../screens/tabnav/explore/GetUserSearchResults";

interface InitialSliceTypes {
  userSearchResult: UserSearchResultType[];
  nextToken: string | null;
  userSearchActive: boolean;
}

const slice = createSlice({
  name: "exploremain",
  initialState: {
    userSearchResult: [],
    nextToken: null,
    userSearchActive: false,
  } as InitialSliceTypes,
  reducers: {
    clearExplore: (state, action) => {
      state.userSearchResult.length = 0;
      state.nextToken = null;
    },
    addToUserSearchResult: (state, action) => {
      state.userSearchResult.push(action.payload);
    },
    clearUserSearchResult: (state) => {
      const emptyArray = [];
      state.userSearchResult = emptyArray;
      state.nextToken = null;
    },
    changeFriendStatus: (state, action) => {
      state.userSearchResult[action.payload.index].relationship =
        action.payload.status;
    },
    setNextToken: (state, action) => {
      state.nextToken = action.payload;
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
      state.nextToken = action.payload;
    },
    setUserSearchActive: (state, action: PayloadAction<boolean>) => {
      state.userSearchActive = action.payload;
    },
  },
});

// FriendStatus options: true, false, incomingpending, outgoingpending

export const {
  addToUserSearchResult,
  clearUserSearchResult,
  changeFriendStatus,
  setNextToken,
  clearExplore,
  setUserSearchResultsArray,
  addNextUserSearchResultsArray,
  setUserSearchNextToken,
  setUserSearchActive,
} = slice.actions;
export default slice.reducer;
