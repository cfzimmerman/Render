import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../global/CommonTypes";
import { AddedUsersFilterItem } from "../../screens/home_vault/operations/GetAddedUsersFilter";

const slice = createSlice({
  name: "homemain",
  initialState: {
    addedusersfilter: [],
    storiessectionlist: [],
    storiesfullview: [],
    addedfeed: [],
    addedfeednexttoken: null,
    fetchingaddedfeeddata: false,
    publicfeed: [],
    publicfeednexttoken: null,
    fetchingpublicfeeddata: false,
    gotaddedusersfilter: false,
    selectedfeed: "addedfeed", // "addedfeed" or "publicfeed"
  },
  reducers: {
    clearHome: (state) => {
      state.addedusersfilter.length = 0;
      state.storiessectionlist.length = 0;
      state.storiesfullview.length = 0;
      state.addedfeed.length = 0;
      state.addedfeednexttoken = null;
      state.publicfeed.length = 0;
      state.publicfeednexttoken = null;
      state.gotaddedusersfilter = false;
      state.selectedfeed = "addedfeed";
    },
    addStoriesSectionListObject: (state, action) => {
      // state.storiessectionlist.push(action.payload)
      const index = state.storiessectionlist.findIndex(
        (item) => item.cognitosub === action.payload.newsection.cognitosub
      );
      if (index < 0) {
        state.storiessectionlist.push(action.payload.newsection);
      }
      state.storiesfullview.push(action.payload.newpost);
    },
    addVideoToStories: (state, action) => {
      state.storiesfullview[action.payload.index].signedurl =
        action.payload.signedurl;
    },
    setStoryViewed: (state, action) => {
      const index = state.storiessectionlist.findIndex(
        (item) => item.cognitosub === action.payload
      );
      if (index >= 0) {
        state.storiessectionlist[index].viewed = true;
      }
    },
    addToAddedUsersFilter: (
      state,
      action: PayloadAction<AddedUsersFilterItem>
    ) => {
      state.addedusersfilter.push(action.payload);
    },
    setGotAddedUsersFilter: (state, action) => {
      state.gotaddedusersfilter = action.payload;
    },
    setAddedFeedNextToken: (state, action) => {
      state.addedfeednexttoken = action.payload;
    },
    addToAddedFeed: (state, action) => {
      state.addedfeed.push(action.payload);
    },
    setSelectedFeed: (state, action) => {
      state.selectedfeed = action.payload;
    },
    addVideoToAddedFeed: (state, action) => {
      state.addedfeed[action.payload.index].signedurl =
        action.payload.signedurl;
    },
    addPfpToAddedFeedPost: (state, action) => {
      state.addedfeed[action.payload.index].userpfpurl =
        action.payload.userpfpurl;
    },
    addToPublicFeed: (state, action) => {
      state.publicfeed.push(action.payload);
    },
    addVideoToPublicFeed: (state, action) => {
      state.publicfeed[action.payload.index].signedurl =
        action.payload.signedurl;
    },
    setPublicFeedNextToken: (state, action) => {
      state.publicfeednexttoken = action.payload;
    },
    stackPublicFeedUpdate: (state, action) => {
      state.publicfeed.unshift(action.payload);
    },
    excisePublicFeedPost: (state, action) => {
      state.publicfeed.splice(action.payload, 1);
    },
    stackAddedFeedUpdate: (state, action) => {
      state.addedfeed.unshift(action.payload);
    },
    setFetchingAddedFeedData: (state, action) => {
      state.fetchingaddedfeeddata = action.payload;
    },
    setFetchingPublicFeedData: (state, action) => {
      state.fetchingpublicfeeddata = action.payload;
    },
  },
});

export const {
  addStoriesSectionListObject,
  addVideoToStories,
  setStoryViewed,
  addToAddedUsersFilter,
  setGotAddedUsersFilter,
  setAddedFeedNextToken,
  addToAddedFeed,
  setSelectedFeed,
  addVideoToAddedFeed,
  addPfpToAddedFeedPost,
  addToPublicFeed,
  addVideoToPublicFeed,
  setPublicFeedNextToken,
  clearHome,
  stackPublicFeedUpdate,
  excisePublicFeedPost,
  stackAddedFeedUpdate,
  setFetchingAddedFeedData,
  setFetchingPublicFeedData,
} = slice.actions;
export default slice.reducer;
