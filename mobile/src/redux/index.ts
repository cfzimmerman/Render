import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";

import appstart from "./shared/appstart";

import errormessage from "./shared/errormessage";
import messagemodal from "./shared/messagemodal";
import loadprogressmessage from "./shared/loadprogressmessage";
import onboarding from "./shared/onboarding";
import localsync from "./shared/localsync";
import notifications from "./shared/notifications";

import pageoptions from "./shared/pageoptions";
import universalpost from "./shared/universalpost";

import vaultpostdata from "./shared/vaultpostdata";

import profilemain from "./profilemain";
import relationships from "./shared/relationships";

import plusmain from "./plusmain";

import exploremain from "./exploremain";

import otheruserprofile from "./shared/otheruserprofile";

import homemain from "./shared/homemain";

import socialmain from "./socialmain";

import homevaultmain from "./homevaultmain";
import gametags from "./shared/gametags";

const reducer = combineReducers({
  errormessage,
  messagemodal,
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
  socialmain,
  localsync,
  notifications,
  universalpost,
  homevaultmain,
  gametags,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootStateType = ReturnType<typeof reducer>;
export type DispatchType = typeof store.dispatch;
export const useAppDispatchType = () => useDispatch<DispatchType>();

export default store;
