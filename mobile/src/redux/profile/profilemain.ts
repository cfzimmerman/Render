import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrentUserType, PostType } from "../../resources/CommonTypes";
import { AddVideoToGalleryDataType } from "../../screens/tabnav/profile/AddVideoToGalleryData";
import { AddedMeUsersType } from "../../screens/tabnav/profile/AddToAddedMeUsers";
import { ChangeGalleryPostPublicType } from "../../screens/tabnav/profile/ChangeGalleryPostPublic";

const slice = createSlice({
  name: "profilemain",
  initialState: {
    currentuser: {},
    pfpsignedurl: null,
    gallerydata: [],
    gallerynexttoken: null,
    addbackusers: [],
  },
  reducers: {
    clearProfile: (state) => {
      state.currentuser = {};
      state.pfpsignedurl = null;
      state.gallerydata.length = 0;
      state.gallerynexttoken = null;
      state.addbackusers.length = 0;
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentuser = action.payload;
    },
    setPfpSignedUrl: (state, action: PayloadAction<string>) => {
      state.pfpsignedurl = action.payload;
    },
    addToGalleryData: (state, action: PayloadAction<PostType>) => {
      state.gallerydata.push(action.payload);
    },
    clearGalleryData: (state) => {
      state.gallerydata.length = 0;
    },
    setGalleryNextToken: (state, action: PayloadAction<string>) => {
      state.gallerynexttoken = action.payload;
    },
    addVideoToGalleryData: (
      state,
      action: PayloadAction<AddVideoToGalleryDataType>,
    ) => {
      state.gallerydata[action.payload.index].signedurl = action.payload.signedurl;
    },
    addToAddBackUsers: (state, action: PayloadAction<AddedMeUsersType>) => {
      state.addbackusers.push(action.payload);
    },
    clearAddBackUsers: (state) => {
      state.addbackusers.length = 0;
    },
    removeAddBackUser: (state, action: PayloadAction<number>) => {
      state.addbackusers.splice(action.payload, 1);
    },
    exciseGalleryPost: (state, action: PayloadAction<number>) => {
      state.gallerydata.splice(action.payload, 1);
    },
    injectGalleryPost: (
      state,
      action: PayloadAction<ChangeGalleryPostPublicType>,
    ) => {
      state.gallerydata.splice(
        action.payload.postIndex,
        0,
        action.payload.newPost,
      );
    },
  },
});

export const {
  setCurrentUser,
  setPfpSignedUrl,
  addToGalleryData,
  clearGalleryData,
  addVideoToGalleryData,
  clearProfile,
  addToAddBackUsers,
  clearAddBackUsers,
  removeAddBackUser,
  setGalleryNextToken,
  exciseGalleryPost,
  injectGalleryPost,
} = slice.actions;

export default slice.reducer;
