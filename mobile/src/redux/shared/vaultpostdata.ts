import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostHeaderType, PostType } from "../../global/CommonTypes";

import {
  InjectNewHeaderPostPropsType,
  InjectNewTrailingPostPropsType,
  InjectNewSectionPropsType,
} from "../../screens/home_vault/operations/InjectPostIntoFeed";
import { ExciseGeneralPropsType } from "../../screens/home_vault/operations/ModifyVaultData";
import { TextUpdateType } from "../../screens/shared/edit_content/operations/ChangePostText";
import { PostPublicUpdatePropsType } from "../../screens/shared/edit_content/operations/ChangePostPublic";
import {
  UpdateHeaderGameInput,
  UpdateNonHeaderGameInput,
} from "../../screens/shared/game_tags/operations/ModifyPostGame";
import { AddVideoToFeedDataType } from "../../screens/home_vault/operations/AddVideoToStories";

interface InitialSliceType {
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  activepost: number | null;
  nextToken: string | null;
  focusview: boolean;
  fetchingdata: boolean;
  shareactive: boolean;
  textactive: boolean;
  postpublicmodal: boolean;
  options: {
    active: boolean;
    changestatus: boolean;
    postid: string | null;
  };
  vaultrefreshdate: string;
}

const slice = createSlice({
  name: "vaultpostdata",
  initialState: {
    vaultpostdata: [],
    vaultfeeddata: [],
    activepost: null,
    nextToken: null,
    focusview: false,
    fetchingdata: false,
    shareactive: false,
    textactive: false,
    postpublicmodal: false,
    options: {
      active: false,
      changestatus: false,
      postid: null,
    },
    vaultrefreshdate: new Date().toISOString(),
  } as InitialSliceType,
  reducers: {
    clearVaultPostData: (state) => {
      state.vaultpostdata.length = 0;
      state.vaultfeeddata.length = 0;
      state.activepost = null;
      state.nextToken = null;
      state.focusview = false;
      state.fetchingdata = false;
      state.textactive = false;
      state.postpublicmodal = false;
      state.options = {
        active: false,
        changestatus: false,
        postid: null,
      };
    },
    addVaultPostDataObject: (state, action: PayloadAction<PostHeaderType>) => {
      state.vaultpostdata.push(action.payload);
    },
    addToLastVaultPostDataArray: (state, action: PayloadAction<PostType>) => {
      state.vaultpostdata[state.vaultpostdata.length - 1].data.push(
        action.payload
      );
    },
    addToVaultFeedData: (state, action: PayloadAction<PostType>) => {
      state.vaultfeeddata.push(action.payload);
    },
    addVideoToFeedData: (
      state,
      action: PayloadAction<AddVideoToFeedDataType>
    ) => {
      state.vaultfeeddata[action.payload.index].signedurl =
        action.payload.signedURL;
    },
    setActivePost: (state, action: PayloadAction<number>) => {
      state.activepost = action.payload;
    },
    setOptionsActive: (state, action: PayloadAction<string>) => {
      state.options.active = true;
      state.options.changestatus = true;
      state.options.postid = action.payload;
    },
    setOptionsInactive: (state) => {
      state.options.active = false;
      state.options.changestatus = true;
    },
    setFocusViewActive: (state, action: PayloadAction<boolean>) => {
      state.focusview = action.payload;
    },
    setVaultNextToken: (state, action: PayloadAction<string>) => {
      state.nextToken = action.payload;
    },
    injectNewHeaderPost: (
      state,
      action: PayloadAction<InjectNewHeaderPostPropsType>
    ) => {
      state.vaultpostdata[action.payload.sectionIndex].header.post =
        action.payload.newHeaderPost;
      state.vaultpostdata[action.payload.sectionIndex].data.unshift(
        action.payload.oldHeaderPost
      );
      state.vaultfeeddata.splice(
        action.payload.feedIndex,
        0,
        action.payload.newHeaderPost
      );
    },
    injectNewTrailingPost: (
      state,
      action: PayloadAction<InjectNewTrailingPostPropsType>
    ) => {
      if (action.payload.sectionDataIndex > -1) {
        state.vaultpostdata[action.payload.sectionIndex].data.splice(
          action.payload.sectionDataIndex,
          0,
          action.payload.newPost
        );
      } else {
        state.vaultpostdata[action.payload.sectionIndex].data.push(
          action.payload.newPost
        );
      }
      state.vaultfeeddata.splice(
        action.payload.feedIndex,
        0,
        action.payload.newPost
      );
    },
    injectNewSection: (
      state,
      action: PayloadAction<InjectNewSectionPropsType>
    ) => {
      state.vaultpostdata.splice(
        action.payload.sectionPlacement,
        0,
        action.payload.newSection
      );
      state.vaultfeeddata.splice(
        action.payload.feedIndex,
        0,
        action.payload.newPost
      );
    },
    exciseSection: (state, action: PayloadAction<ExciseGeneralPropsType>) => {
      state.vaultpostdata.splice(action.payload.sectionIndex, 1);
      state.vaultfeeddata.splice(action.payload.feedIndex, 1);
    },
    exciseHeaderPost: (
      state,
      action: PayloadAction<ExciseGeneralPropsType>
    ) => {
      state.vaultpostdata[action.payload.sectionIndex].header.post =
        action.payload.newSectionHeaderPost;
      state.vaultpostdata[action.payload.sectionIndex].data.splice(0, 1);
      state.vaultfeeddata.splice(action.payload.feedIndex, 1);
    },
    exciseTrailingPost: (
      state,
      action: PayloadAction<ExciseGeneralPropsType>
    ) => {
      state.vaultpostdata[action.payload.sectionIndex].data.splice(
        action.payload.sectionDataIndex,
        1
      );
      state.vaultfeeddata.splice(action.payload.feedIndex, 1);
    },
    setFetchingData: (state, action: PayloadAction<boolean>) => {
      state.fetchingdata = action.payload;
    },
    setShareActive: (state, action: PayloadAction<boolean>) => {
      state.shareactive = action.payload;
    },
    setTextActive: (state, action: PayloadAction<boolean>) => {
      state.textactive = action.payload;
    },
    updateNonHeaderText: (state, action: PayloadAction<TextUpdateType>) => {
      state.vaultfeeddata[action.payload.vaultFeedIndex].posttext =
        action.payload.newText;
      state.vaultpostdata[action.payload.sectionIndex].data[
        action.payload.sectionDataIndex
      ].posttext = action.payload.newText;
    },
    updateHeaderText: (state, action: PayloadAction<TextUpdateType>) => {
      state.vaultfeeddata[action.payload.vaultFeedIndex].posttext =
        action.payload.newText;
      state.vaultpostdata[action.payload.sectionIndex].header.post.posttext =
        action.payload.newText;
    },
    setPostPublicModal: (state, action: PayloadAction<boolean>) => {
      state.postpublicmodal = action.payload;
    },
    updatePostPublic: (
      state,
      action: PayloadAction<PostPublicUpdatePropsType>
    ) => {
      if (action.payload.header === false) {
        state.vaultpostdata[action.payload.sectionIndex].data[
          action.payload.sectionDataIndex
        ].publicpost = action.payload.postOperation.publicpost;
        state.vaultpostdata[action.payload.sectionIndex].data[
          action.payload.sectionDataIndex
        ].publicpostdate = action.payload.postOperation.publicpostdate;
      } else if (action.payload.header === true) {
        // This is an error check in case neither is passed. Else If can be removed when TypeScript transition is made.
        state.vaultpostdata[
          action.payload.sectionIndex
        ].header.post.publicpost = action.payload.postOperation.publicpost;
        state.vaultpostdata[
          action.payload.sectionIndex
        ].header.post.publicpostdate =
          action.payload.postOperation.publicpostdate;
      }
      state.vaultfeeddata[action.payload.vaultFeedIndex].publicpost =
        action.payload.postOperation.publicpost;
      state.vaultfeeddata[action.payload.vaultFeedIndex].publicpostdate =
        action.payload.postOperation.publicpostdate;
    },
    setVaultRefreshDate: (state, action: PayloadAction<string>) => {
      state.vaultrefreshdate = action.payload;
    },
    clearHomeVaultRefresh: (state) => {
      state.fetchingdata = true;
      state.vaultpostdata.length = 0;
      state.vaultfeeddata.length = 0;
      state.nextToken = null;
      state.vaultrefreshdate = new Date().toISOString();
    },
    updateNonHeaderGame: (
      state,
      action: PayloadAction<UpdateNonHeaderGameInput>
    ) => {
      state.vaultfeeddata[action.payload.feedIndex].gamesID =
        action.payload.gamesID;
      state.vaultfeeddata[action.payload.feedIndex].coverID =
        action.payload.coverID;
      state.vaultfeeddata[action.payload.feedIndex].title =
        action.payload.title;

      state.vaultpostdata[action.payload.sectionIndex].data[
        action.payload.sectionDataIndex
      ].gamesID = action.payload.gamesID;
      state.vaultpostdata[action.payload.sectionIndex].data[
        action.payload.sectionDataIndex
      ].coverID = action.payload.coverID;
      state.vaultpostdata[action.payload.sectionIndex].data[
        action.payload.sectionDataIndex
      ].title = action.payload.title;
    },
    updateHeaderGame: (state, action: PayloadAction<UpdateHeaderGameInput>) => {
      state.vaultfeeddata[action.payload.feedIndex].gamesID =
        action.payload.gamesID;
      state.vaultfeeddata[action.payload.feedIndex].coverID =
        action.payload.coverID;
      state.vaultfeeddata[action.payload.feedIndex].title =
        action.payload.title;

      state.vaultpostdata[action.payload.sectionIndex].header.post.gamesID =
        action.payload.gamesID;
      state.vaultpostdata[action.payload.sectionIndex].header.post.coverID =
        action.payload.coverID;
      state.vaultpostdata[action.payload.sectionIndex].header.post.title =
        action.payload.title;
    },
  },
});

export const {
  addVaultPostDataObject,
  addToLastVaultPostDataArray,
  clearVaultPostData,
  addToVaultFeedData,
  addVideoToFeedData,
  setActivePost,
  setOptionsActive,
  setOptionsInactive,
  setFocusViewActive,
  setVaultNextToken,
  injectNewHeaderPost,
  injectNewTrailingPost,
  injectNewSection,
  exciseSection,
  exciseHeaderPost,
  exciseTrailingPost,
  setFetchingData,
  setShareActive,
  setTextActive,
  updateHeaderText,
  updateNonHeaderText,
  setPostPublicModal,
  updatePostPublic,
  setVaultRefreshDate,
  clearHomeVaultRefresh,
  updateHeaderGame,
  updateNonHeaderGame,
} = slice.actions;

export default slice.reducer;
