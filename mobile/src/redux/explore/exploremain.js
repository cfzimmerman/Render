import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "exploremain",
  initialState: {
    searchresult: [],
    nextToken: null,
  },
  reducers: {
    clearExplore: (state, action) => {
      state.searchresult.length = 0;
      state.nextToken = null;
    },
    addToSearchResult: (state, action) => {
      state.searchresult.push(action.payload);
    },
    clearSearchResult: (state) => {
      state.searchresult.length = 0;
      state.nextToken = null;
    },
    changeFriendStatus: (state, action) => {
      state.searchresult[action.payload.index].relationship = action.payload.status;
    },
    setNextToken: (state, action) => {
      state.nextToken = action.payload;
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
} = slice.actions;
export default slice.reducer;
