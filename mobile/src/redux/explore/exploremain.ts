import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSearchResultType } from "../../screens/tabnav/explore/GetSearchResults";

interface InitialSliceTypes {
  searchresult: UserSearchResultType[];
  nextToken: string | null;
  userSearchActive: boolean;
}

const slice = createSlice({
  name: "exploremain",
  initialState: {
    searchresult: [],
    nextToken: null,
    userSearchActive: false,
  } as InitialSliceTypes,
  reducers: {
    clearExplore: (state, action) => {
      state.searchresult.length = 0;
      state.nextToken = null;
    },
    addToSearchResult: (state, action) => {
      state.searchresult.push(action.payload);
    },
    clearSearchResult: (state) => {
      const emptyArray = [];
      state.searchresult = emptyArray;
      state.nextToken = null;
    },
    changeFriendStatus: (state, action) => {
      state.searchresult[action.payload.index].relationship =
        action.payload.status;
    },
    setNextToken: (state, action) => {
      state.nextToken = action.payload;
    },
    setUserSearchResultsArray: (
      state,
      action: PayloadAction<UserSearchResultType[]>
    ) => {
      state.searchresult = action.payload;
    },
    addNextUserSearchResultsArray: (
      state,
      action: PayloadAction<UserSearchResultType[]>
    ) => {
      state.searchresult = state.searchresult.concat(action.payload);
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
  addToSearchResult,
  clearSearchResult,
  changeFriendStatus,
  setNextToken,
  clearExplore,
  setUserSearchResultsArray,
  addNextUserSearchResultsArray,
  setUserSearchNextToken,
  setUserSearchActive,
} = slice.actions;
export default slice.reducer;
