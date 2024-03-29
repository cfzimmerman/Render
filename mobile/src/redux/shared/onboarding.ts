import { createSlice } from "@reduxjs/toolkit";

interface DefaultSliceType {
  imageurls: {
    squarelogo: string | null;
    onboardinglanding: string | null;
    signup: string | null;
    displayname: string | null;
    gamertag: string | null;
    birthday: string | null;
    tos: string | null;
  };
  cognitouser: string | null;
}

const slice = createSlice({
  name: "onboarding",
  initialState: {
    imageurls: {
      squarelogo: null,
      onboardinglanding: null,
      signup: null,
      displayname: null,
      gamertag: null,
      birthday: null,
      tos: null,
    },
    cognitouser: null,
  } as DefaultSliceType,
  reducers: {
    clearOnboarding: (state) => {
      state.imageurls = {
        squarelogo: null,
        onboardinglanding: null,
        signup: null,
        displayname: null,
        gamertag: null,
        birthday: null,
        tos: null,
      };
      state.cognitouser = null;
    },
    setOnboardingImages: (state, action) => {
      state.imageurls = {
        squarelogo: action.payload.squarelogo,
        onboardinglanding: action.payload.onboardinglanding,
        signup: action.payload.signup,
        displayname: action.payload.displayname,
        gamertag: action.payload.gamertag,
        birthday: action.payload.birthday,
        tos: action.payload.tos,
      };
    },
    setCognitoUser: (state, action) => {
      state.cognitouser = action.payload;
    },
  },
});

export const { clearOnboarding, setOnboardingImages, setCognitoUser } =
  slice.actions;
export default slice.reducer;
