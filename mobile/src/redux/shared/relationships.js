import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "relationships",
  initialState: {
    added: [],
    addednexttoken: null,
    addedme: [],
    addedmenexttoken: null,
  },
  reducers: {
    clearRelationships: (state) => {
      state.added.length = 0;
      state.addednexttoken = null;
      state.addedme.length = 0;
      state.addedmenexttoken = null;
    },
    addToAdded: (state, action) => {
      state.added.push(action.payload);
    },
    clearAdded: (state, action) => {
      state.added.length = 0;
      state.addednexttoken = null;
    },
    setAddedNextToken: (state, action) => {
      state.addednexttoken = action.payload;
    },
    changeAddedMeRelationship: (state, action) => {
      state.addedme[action.payload].relationship = true;
      state.addedme[action.payload].addedmecount = state.addedme[action.payload].addedmecount + 1;
    },
    addToAddedMe: (state, action) => {
      state.addedme.push(action.payload);
    },
    clearAddedMe: (state, action) => {
      state.addedme.length = 0;
    },
    setAddedMeNextToken: (state, action) => {
      state.addedmenexttoken = action.payload;
    },
  },
});

export const {
  addToAdded,
  clearAdded,
  addToAddedMe,
  clearAddedMe,
  changeAddedMeRelationship,
  setAddedNextToken,
  setAddedMeNextToken,
  clearRelationships,
} = slice.actions;
export default slice.reducer;
