import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../resources/CommonTypes";

type PostID = string;
// Just using this for semantic clarity

interface HomeVaultMainDefaultSliceType {
  selectedPosts: PostID[];
  multiSelectActive: boolean;
}

const slice = createSlice({
  name: "homevaultmain",
  initialState: {
    selectedPosts: [],
    multiSelectActive: false,
  } as HomeVaultMainDefaultSliceType,
  reducers: {
    clearSelectedPosts: (state) => {
      state.selectedPosts.length = 0;
    },
    setMultiSelectActive: (state, action: PayloadAction<boolean>) => {
      state.multiSelectActive = action.payload;
    },
    addSelectedPost: (state, action: PayloadAction<PostID>) => {
      state.selectedPosts.push(action.payload);
    },
    removeSelectedPost: (state, action: PayloadAction<PostID>) => {
      const targetIndex = state.selectedPosts.findIndex(
        (item: PostID) => item === action.payload
      );
      if (targetIndex != -1) {
        state.selectedPosts.splice(targetIndex, 1);
      }
    },
  },
});

export const {
  clearSelectedPosts,
  setMultiSelectActive,
  addSelectedPost,
  removeSelectedPost,
} = slice.actions;

export default slice.reducer;
