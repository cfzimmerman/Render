import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../global/CommonTypes";
import {
  StoriesSectionListItemType,
  UpdateStoriesDataType,
} from "../../screens/home_vault/operations/AddToStoriesData";
import { AddVideoToFeedDataType } from "../../screens/home_vault/operations/AddVideoToStories";
import { AddedUsersFilterItem } from "../../screens/home_vault/operations/GetAddedUsersFilter";
type SelectedFeedTypes = "addedfeed" | "publicfeed";

interface DefaultSliceType {
  addedusersfilter: AddedUsersFilterItem[];
  storiessectionlist: StoriesSectionListItemType[];
  storiesfullview: PostType[];
  addedfeed: PostType[];
  addedfeednexttoken: string | null;
  fetchingaddedfeeddata: boolean;
  publicfeed: PostType[];
  publicfeednexttoken: string | null;
  fetchingpublicfeeddata: boolean;
  gotaddedusersfilter: boolean;
  selectedfeed: SelectedFeedTypes;
}

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
    selectedfeed: "addedfeed",
  } as DefaultSliceType,
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
    addStoriesSectionListObject: (
      state,
      action: PayloadAction<UpdateStoriesDataType>
    ) => {
      const index = state.storiessectionlist.findIndex(
        (item: StoriesSectionListItemType) =>
          item.cognitosub === action.payload.newSection.cognitosub
      );
      if (index < 0) {
        state.storiessectionlist.push(action.payload.newSection);
      }
      state.storiesfullview.push(action.payload.newPost);
    },
    addVideoToStories: (
      state,
      action: PayloadAction<AddVideoToFeedDataType>
    ) => {
      state.storiesfullview[action.payload.index].signedurl =
        action.payload.signedURL;
    },
    setStoryViewed: (state, action: PayloadAction<string>) => {
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
    setGotAddedUsersFilter: (state, action: PayloadAction<boolean>) => {
      state.gotaddedusersfilter = action.payload;
    },
    setAddedFeedNextToken: (state, action: PayloadAction<string | null>) => {
      state.addedfeednexttoken = action.payload;
    },
    addToAddedFeed: (state, action: PayloadAction<PostType>) => {
      state.addedfeed.push(action.payload);
    },
    setSelectedFeed: (state, action: PayloadAction<SelectedFeedTypes>) => {
      state.selectedfeed = action.payload;
    },
    addVideoToAddedFeed: (
      state,
      action: PayloadAction<AddVideoToFeedDataType>
    ) => {
      state.addedfeed[action.payload.index].signedurl =
        action.payload.signedURL;
    },
    addToPublicFeed: (state, action: PayloadAction<PostType>) => {
      state.publicfeed.push(action.payload);
    },
    addVideoToPublicFeed: (
      state,
      action: PayloadAction<AddVideoToFeedDataType>
    ) => {
      state.publicfeed[action.payload.index].signedurl =
        action.payload.signedURL;
    },
    setPublicFeedNextToken: (state, action: PayloadAction<string | null>) => {
      state.publicfeednexttoken = action.payload;
    },
    stackPublicFeedUpdate: (state, action: PayloadAction<PostType>) => {
      state.publicfeed.unshift(action.payload);
    },
    excisePublicFeedPost: (state, action: PayloadAction<number>) => {
      state.publicfeed.splice(action.payload, 1);
    },
    stackAddedFeedUpdate: (state, action: PayloadAction<PostType>) => {
      state.addedfeed.unshift(action.payload);
    },
    setFetchingAddedFeedData: (state, action: PayloadAction<boolean>) => {
      state.fetchingaddedfeeddata = action.payload;
    },
    setFetchingPublicFeedData: (state, action: PayloadAction<boolean>) => {
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
