import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "homemain",
  initialState: {
    onboardingstatus: null,
    vaultheader: null,
    addedusersfilter: [],
    storiessectionlist: [],
    storiesfullview: [],
    addedfeed: [],
    addedfeednexttoken: null,
    publicfeed: [],
    publicfeednexttoken: null,
    gotaddedusersfilter: false,
    selectedfeed: "addedfeed", // "addedfeed" or "publicfeed"
  },
  reducers: {
    clearHome: (state) => {
      state.onboardingstatus = null;
      state.vaultheader = null;
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
    setOnboardingStatus: (state, action) => {
      state.onboardingstatus = action.payload;
    },
    setVaultHeader: (state, action) => {
      state.vaultheader = action.payload;
    },
    addStoriesSectionListObject: (state, action) => {
      // state.storiessectionlist.push(action.payload)
      const index = state.storiessectionlist.findIndex(
        (item) => item.cognitosub === action.payload.newsection.cognitosub,
      );
      if (index < 0) {
        state.storiessectionlist.push(action.payload.newsection);
      }
      state.storiesfullview.push(action.payload.newpost);
    },
    addVideoToStories: (state, action) => {
      state.storiesfullview[action.payload.index].signedurl = action.payload.signedurl;
    },
    setStoryViewed: (state, action) => {
      const index = state.storiessectionlist.findIndex(
        (item) => item.cognitosub === action.payload,
      );
      if (index >= 0) {
        state.storiessectionlist[index].viewed = true;
      }
    },
    addToAddedUsersFilter: (state, action) => {
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
      state.addedfeed[action.payload.index].signedurl = action.payload.signedurl;
    },
    addPfpToAddedFeedPost: (state, action) => {
      state.addedfeed[action.payload.index].userpfpurl = action.payload.userpfpurl;
    },
    addToPublicFeed: (state, action) => {
      state.publicfeed.push(action.payload);
    },
    addVideoToPublicFeed: (state, action) => {
      state.publicfeed[action.payload.index].signedurl = action.payload.signedurl;
    },
    setPublicFeedNextToken: (state, action) => {
      state.publicfeednexttoken = action.payload;
    },
  },
});

export const {
  setOnboardingStatus,
  setVaultHeader,
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
} = slice.actions;
export default slice.reducer;
