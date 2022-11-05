import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherUserType } from "../../screens/explore/operations/EnterProfileFromSearch";
import { AddedMeUsersType } from "../../screens/profile/operations/AddToAddedMeUsers";

interface DefaultSliceType {
  added: OtherUserType[];
  addednexttoken: string | null;
  addedme: AddedMeUsersType[];
  addedmenexttoken: string | null;
}

const slice = createSlice({
  name: "relationships",
  initialState: {
    added: [],
    addednexttoken: null,
    addedme: [],
    addedmenexttoken: null,
  } as DefaultSliceType,
  reducers: {
    clearRelationships: (state) => {
      state.added.length = 0;
      state.addednexttoken = null;
      state.addedme.length = 0;
      state.addedmenexttoken = null;
    },
    addToAddedUsers: (state, action: PayloadAction<OtherUserType>) => {
      state.added.push(action.payload);
    },
    setAddedNextToken: (state, action: PayloadAction<string | null>) => {
      state.addednexttoken = action.payload;
    },
    addToAddedMe: (state, action: PayloadAction<AddedMeUsersType>) => {
      state.addedme.push(action.payload);
    },
    setAddedMeNextToken: (state, action: PayloadAction<string | null>) => {
      state.addedmenexttoken = action.payload;
    },
  },
});

export const {
  addToAddedUsers,
  addToAddedMe,
  setAddedNextToken,
  setAddedMeNextToken,
  clearRelationships,
} = slice.actions;
export default slice.reducer;
