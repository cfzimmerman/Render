import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";

import appstart from "../system/appstart";

import errormessage from "../system/errormessage";
import systemmessage from "../system/systemmessage";
import loadprogressmessage from "../system/loadprogressmessage";
import onboarding from "../system/onboarding";

import pageoptions from "../general/pageoptions";

import vaultpostdata from "../vault/vaultpostdata";

import profilemain from "../profile/profilemain";
import relationships from "../profile/relationships";

import plusmain from "../plus/plusmain";

import exploremain from "../explore/exploremain";

import otheruserprofile from "../explore/otheruserprofile";

import homemain from "../home/homemain";

const reducer = combineReducers({
  errormessage,
  systemmessage,
  loadprogressmessage,
  pageoptions,
  vaultpostdata,
  profilemain,
  relationships,
  plusmain,
  exploremain,
  otheruserprofile,
  appstart,
  homemain,
  onboarding,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootStateType = ReturnType<typeof reducer>;
export type DispatchType = typeof store.dispatch;
export const useAppDispatchType = () => useDispatch<DispatchType>();

export default store;
