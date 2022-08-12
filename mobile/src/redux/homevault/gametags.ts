import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameCoverTileType } from "../../screens/tabnav/homevault/GameTags/GameCoverTile";

interface DefaultSliceType {
  gameArray: GameCoverTileType[] | null;
}

const slice = createSlice({
  name: "gametags",
  initialState: {
    gameArray: null,
    searchInProgress: false,
  } as DefaultSliceType,
  reducers: {
    clearGameArray: (state) => {
      state.gameArray.length = 0;
    },
  },
});

export const { clearGameArray } = slice.actions;

export default slice.reducer;
