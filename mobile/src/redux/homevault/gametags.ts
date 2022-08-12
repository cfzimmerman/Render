import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameCoverTileType } from "../../screens/tabnav/homevault/GameTags/GameCoverTile";

interface DefaultSliceType {
  allGamesArray: GameCoverTileType[] | null;
  allGamesNextToken: null | string;
}

export interface SetNewAllGamesArrayPT {
  newAllGamesArray: GameCoverTileType[];
  newAllGamesNextToken: null | string;
}

export interface AddNextAllGamesArrayPT {
  nextAllGamesArray: GameCoverTileType[];
  nextAllGamesNextToken: null | string;
}

const slice = createSlice({
  name: "gametags",
  initialState: {
    allGamesArray: [],
    allGamesNextToken: null,
  } as DefaultSliceType,
  reducers: {
    clearAllGamesArray: (state) => {
      state.allGamesArray.length = 0;
    },
    setNewAllGamesArray: (
      state,
      action: PayloadAction<SetNewAllGamesArrayPT>
    ) => {
      state.allGamesArray = action.payload.newAllGamesArray;
      state.allGamesNextToken = action.payload.newAllGamesNextToken;
    },
    addNextAllGamesArray: (
      state,
      action: PayloadAction<AddNextAllGamesArrayPT>
    ) => {
      state.allGamesArray = state.allGamesArray.concat(
        action.payload.nextAllGamesArray
      );
      state.allGamesNextToken = action.payload.nextAllGamesNextToken;
    },
  },
});

export const { clearAllGamesArray, setNewAllGamesArray, addNextAllGamesArray } =
  slice.actions;

export default slice.reducer;
