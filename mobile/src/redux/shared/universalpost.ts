import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../global/CommonTypes";

interface UniversalPostInitialTypes {
  universalPostData: PostType[];
}

const slice = createSlice({
  name: "universalpost",
  initialState: {
    universalPostData: [],
  } as UniversalPostInitialTypes,
  reducers: {
    clearUniversalPostData: (state) => {
      state.universalPostData.length = 0;
    },
    addToUniversalPostData: (state, action: PayloadAction<PostType>) => {
      state.universalPostData.unshift(action.payload);
    },
  },
});

export const { clearUniversalPostData, addToUniversalPostData } = slice.actions;

export default slice.reducer;
