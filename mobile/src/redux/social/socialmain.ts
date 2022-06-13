import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CurrentUserType,
  PostType,
  CommentType,
} from "../../resources/CommonTypes";

interface SetDeleteCommentPropsType {
  active: boolean;
  commentID: string;
}

const slice = createSlice({
  name: "socialmain",
  initialState: {
    addcommentactive: false,
    deletecomment: {
      active: false,
      commentID: null,
    },
    commentsdata: [],
    commentsnexttoken: null,
    fetchingcomments: false,
  },
  reducers: {
    /*
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentuser = action.payload;
    },
    */
    setAddCommentActive: (state, action: PayloadAction<boolean>) => {
      state.addcommentactive = action.payload;
    },
    setDeleteComment: (
      state,
      action: PayloadAction<SetDeleteCommentPropsType>
    ) => {
      state.deletecomment.active = action.payload.active;
      state.deletecomment.commentID = action.payload.commentID;
    },
    clearCommentsData: (state) => {
      state.commentsdata.length = 0;
      state.commentsnexttoken = null;
    },
    setCommentsNextToken: (state, action: PayloadAction<string>) => {
      state.commentsnexttoken = action.payload;
    },
    addCommentsDataItem: (state, action: PayloadAction<CommentType>) => {
      state.commentsdata.push(action.payload);
    },
    setFetchingComments: (state, action: PayloadAction<boolean>) => {
      state.fetchingcomments = action.payload;
    },
    injectComment: (state, action: PayloadAction<CommentType>) => {
      state.commentsdata.unshift(action.payload);
    },
    exciseComment: (state, action: PayloadAction<number>) => {
      state.commentsdata.splice(action.payload, 1);
    },
  },
});

export const {
  setAddCommentActive,
  setDeleteComment,
  clearCommentsData,
  setCommentsNextToken,
  addCommentsDataItem,
  setFetchingComments,
  injectComment,
  exciseComment,
} = slice.actions;

export default slice.reducer;
