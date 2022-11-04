import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageAssetsType } from "../../screens/home_vault/operations/GetPageAssets";

interface InitialSliceTypes {
  authenticated: boolean;
  initialdataloaded: boolean;
  pageassets: PageAssetsType | null;
}

const slice = createSlice({
  name: "appstart",
  initialState: {
    authenticated: false,
    initialdataloaded: false,
    pageassets: null,
  } as InitialSliceTypes,
  reducers: {
    clearAppStart: (state) => {
      state.authenticated = false;
      state.initialdataloaded = false;
      state.pageassets = null;
    },
    setUserAuthenticated: (state) => {
      state.authenticated = true;
    },
    setPageAssets: (state, action: PayloadAction<PageAssetsType>) => {
      state.pageassets = action.payload;
    },
  },
});

export const { setUserAuthenticated, setPageAssets, clearAppStart } =
  slice.actions;
export default slice.reducer;
