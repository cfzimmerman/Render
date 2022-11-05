import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../global/CommonTypes";

interface InboundLinkDataTypes {
  postID: string | null;
}

interface UniversalPostInitialTypes {
  universalPostData: PostType[];
  initialLinkData: InboundLinkDataTypes | null;
  delayedLinkData: InboundLinkDataTypes | null;
}

const slice = createSlice({
  name: "universalpost",
  initialState: {
    universalPostData: [],
    initialLinkData: null,
    delayedLinkData: null,
  } as UniversalPostInitialTypes,
  reducers: {
    clearUniversalPostData: (state) => {
      state.universalPostData.length = 0;
    },
    addToUniversalPostData: (state, action: PayloadAction<PostType>) => {
      state.universalPostData.unshift(action.payload);
    },
    setInitialLinkData: (
      state,
      action: PayloadAction<InboundLinkDataTypes | null>
    ) => {
      state.initialLinkData = action.payload;
    },
    setDelayedLinkData: (
      state,
      action: PayloadAction<InboundLinkDataTypes | null>
    ) => {
      state.delayedLinkData = action.payload;
    },
  },
});

export const {
  clearUniversalPostData,
  addToUniversalPostData,
  setInitialLinkData,
  setDelayedLinkData,
} = slice.actions;

export default slice.reducer;
