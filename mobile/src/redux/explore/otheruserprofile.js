import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "otheruserprofile",
  initialState: {
    otheruser: {},
    otherusergallerydata: [],
    fetchingotherusergallerydata: false,
    otherusergallerynexttoken: null,
    relationship: false,
    addedmecount: 0,
  },
  reducers: {
    clearOtherUserProfile: (state, action) => {
      state.otheruser = {};
      state.otherusergallerydata.length = 0;
      state.otherusergallerynexttoken = null;
      state.relationship = false;
      state.addedmecount = 0;
    },
    setOtherUser: (state, action) => {
      state.otheruser = action.payload;
      state.addedmecount = action.payload.addedmecount;
      state.otherusergallerydata.length = 0;
      state.otherusergallerynexttoken = null;
    },
    addToOtherUserGalleryData: (state, action) => {
      state.otherusergallerydata.push(action.payload);
    },
    clearOtherUserGalleryData: (state, action) => {
      state.otherusergallerydata.length = 0;
    },
    setFetchingOtherUserGalleryData: (state, action) => {
      state.fetchingotherusergallerydata = action.payload;
    },
    addVideoToOtherUserGalleryData: (state, action) => {
      state.otherusergallerydata[action.payload.index].signedurl =
        action.payload.signedurl;
    },
    setOtherUserRelationship: (state, action) => {
      state.relationship = action.payload.relationship;
      state.addedmecount += action.payload.increment;
    },
    setOtherUserGalleryNextToken: (state, action) => {
      state.otherusergallerynexttoken = action.payload;
    },
  },
});

export const {
  setOtherUser,
  addToOtherUserGalleryData,
  clearOtherUserGalleryData,
  setFetchingOtherUserGalleryData,
  addVideoToOtherUserGalleryData,
  setOtherUserRelationship,
  setOtherUserGalleryNextToken,
  clearOtherUserProfile,
} = slice.actions;
export default slice.reducer;
