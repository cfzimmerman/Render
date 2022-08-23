import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";

import appstart from "../system/appstart";

import errormessage from "../system/errormessage";
import messagemodal from "../system/messagemodal";
import loadprogressmessage from "../system/loadprogressmessage";
import onboarding from "../system/onboarding";
import localsync from "../system/localsync";
import notifications from "../system/notifications";

import pageoptions from "../general/pageoptions";
import universalpost from "../general/universalpost";

import vaultpostdata from "../vault/vaultpostdata";

import profilemain from "../profile/profilemain";
import relationships from "../profile/relationships";

import plusmain from "../plus/plusmain";

import exploremain from "../explore/exploremain";

import otheruserprofile from "../explore/otheruserprofile";

import homemain from "../home/homemain";

import socialmain from "../social/socialmain";

import homevaultmain from "../homevault/homevaultmain";
import gametags from "../homevault/gametags";

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
