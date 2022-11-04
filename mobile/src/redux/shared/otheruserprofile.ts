import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../global/CommonTypes";
import { SetUserRelationshipType } from "../../screens/explore/operations/ChangeUserRelationship";
import { OtherUserType } from "../../screens/explore/operations/EnterProfileFromSearch";
import { AddVideoToFeedDataType } from "../../screens/home_vault/operations/AddVideoToStories";

interface DefaultSliceType {
  otheruser: OtherUserType | null;
  otherusergallerydata: PostType[];
  fetchingotherusergallerydata: boolean;
  otherusergallerynexttoken: string | null;
  relationship: boolean;
  addedmecount: number;
}

const slice = createSlice({
  name: "otheruserprofile",
  initialState: {
    otheruser: null,
    otherusergallerydata: [],
    fetchingotherusergallerydata: false,
    otherusergallerynexttoken: null,
    relationship: false,
    addedmecount: 0,
  } as DefaultSliceType,
  reducers: {
    clearOtherUserProfile: (state) => {
      state.otheruser = null;
      state.otherusergallerydata.length = 0;
      state.otherusergallerynexttoken = null;
      state.relationship = false;
      state.addedmecount = 0;
    },
    setOtherUser: (state, action: PayloadAction<OtherUserType>) => {
      state.otheruser = action.payload;
      state.addedmecount = action.payload.addedmecount;
      state.otherusergallerydata.length = 0;
      state.otherusergallerynexttoken = null;
    },
    addToOtherUserGalleryData: (state, action: PayloadAction<PostType>) => {
      state.otherusergallerydata.push(action.payload);
    },
    setFetchingOtherUserGalleryData: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.fetchingotherusergallerydata = action.payload;
    },
    addVideoToOtherUserGalleryData: (
      state,
      action: PayloadAction<AddVideoToFeedDataType>
    ) => {
      state.otherusergallerydata[action.payload.index].signedurl =
        action.payload.signedURL;
    },
    setOtherUserRelationship: (
      state,
      action: PayloadAction<SetUserRelationshipType>
    ) => {
      state.relationship = action.payload.relationship;
      state.addedmecount += action.payload.increment;
    },
    setOtherUserGalleryNextToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.otherusergallerynexttoken = action.payload;
    },
  },
});

export const {
  setOtherUser,
  addToOtherUserGalleryData,
  setFetchingOtherUserGalleryData,
  addVideoToOtherUserGalleryData,
  setOtherUserRelationship,
  setOtherUserGalleryNextToken,
  clearOtherUserProfile,
} = slice.actions;
export default slice.reducer;
