import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../resources/CommonTypes";
import { SetGameInfoModalInputs } from "../../screens/tabnav/homevault/GameTags/GameInfoModal";

type PostID = string;
// Just using this for semantic clarity

interface HomeVaultMainDefaultSliceType {
  selectedPosts: PostID[];
  multiSelectActive: boolean;
  gameInfoModal: SetGameInfoModalInputs;
}

const slice = createSlice({
  name: "homevaultmain",
  initialState: {
    selectedPosts: [],
    multiSelectActive: false,
    gameInfoModal: {
      active: false,
      gameID: null,
      coverID: null,
      title: null,
    },
  } as HomeVaultMainDefaultSliceType,
  reducers: {
    activateMultiSelect: (state, action: PayloadAction<PostID>) => {
      state.multiSelectActive = true;
      state.selectedPosts = [action.payload];
    },
    deactivateMultiSelect: (state) => {
      state.multiSelectActive = false;
      state.selectedPosts.length = 0;
    },
    setMultiSelectActive: (state, action: PayloadAction<boolean>) => {
      state.multiSelectActive = action.payload;
    },
    addSelectedPost: (state, action: PayloadAction<PostID>) => {
      state.selectedPosts.push(action.payload);
    },
    resetWithNewSelectedPost: (state, action: PayloadAction<PostID[]>) => {
      state.selectedPosts = action.payload;
    },
    removeSelectedPost: (state, action: PayloadAction<PostID>) => {
      const targetIndex = state.selectedPosts.findIndex(
        (item: PostID) => item === action.payload
      );
      if (targetIndex != -1) {
        state.selectedPosts.splice(targetIndex, 1);
      }
    },
    setGameInfoModal: (
      state,
      action: PayloadAction<SetGameInfoModalInputs>
    ) => {
      state.gameInfoModal = action.payload;
    },
  },
});

export const {
  addSelectedPost,
  removeSelectedPost,
  activateMultiSelect,
  deactivateMultiSelect,
  setMultiSelectActive,
  resetWithNewSelectedPost,
  setGameInfoModal,
} = slice.actions;

export default slice.reducer;
