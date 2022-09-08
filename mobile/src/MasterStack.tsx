import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import TabNav from "./TabNav";
import {
  OnboardingLanding,
  SignupCode,
  LoginCode,
  DisplayName,
  Gamertag,
  Birthday,
  TOS,
} from "./screens/masterstack/auth";
import { ObservePostDB } from "./resources/utilities";

import VaultPostFullView, {
  VaultPostFullViewUsecaseTypes,
} from "./screens/tabnav/vault/VaultPostFullView";
import VaultPostFocusView from "./screens/tabnav/vault/VaultPostFocusView";
import DeletePost from "./screens/tabnav/vault/DeletePost";
import EditPost from "./screens/tabnav/plus/EditPost";
import CommentsMain from "./screens/tabnav/social/CommentsMain";
import AppStart from "./screens/masterstack/AppStart";
import ForgotPassword from "./screens/tabnav/profile/ForgotPassword";
import PostMultiDelete from "./screens/tabnav/homevault/PostMultiDelete";
import SelectGame from "./screens/tabnav/homevault/GameTags/SelectGame";
import HVSearchLanding from "./screens/tabnav/homevault/GameTags/HVSearchLanding";
import HVGameDisplay from "./screens/tabnav/homevault/GameTags/HVGameDisplay";
import GetStartedLanding from "./screens/masterstack/getstarted/GetStartedLanding";
import PGLanding from "./screens/tabnav/explore/PGLanding";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  TabNav: undefined;
  OnboardingLanding: undefined;
  SignupCode: {
    email: string;
    userid: string;
  };
  LoginCode: {
    email: string;
  };
  DisplayName: undefined;
  Gamertag: undefined;
  Birthday: undefined;
  TOS: undefined;
  ForgotPassword: undefined;
  VaultPostFullView: {
    startindex: number;
    usecase: VaultPostFullViewUsecaseTypes;
  };
  VaultPostFocusView: {
    usecase: string;
  };
  DeletePost: {
    postid: string;
  };
  EditPost: {
    index: number;
    origin: "plus" | "homevault";
  };
  CommentsMain: {
    usecase:
      | "gallery"
      | "otherusergallery"
      | "stories"
      | "addedfeed"
      | "publicfeed";
    index: number;
  };
  PostMultiDelete: undefined;
  SelectGame: {
    selection: "single" | "multi";
    origin: "vaultPostEdit" | "vaultMultiSelect";
  };
  HVSearchLanding: undefined;
  HVGameDisplay: {
    gameID: string;
  };
  GetStartedLanding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MasterStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log("calling masterstack");

  AppStart({ dispatch, navigation });

  ObservePostDB({ dispatch });

  return (
    <Stack.Navigator
      initialRouteName="TabNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNav" component={TabNav} />

      <Stack.Screen
        name="OnboardingLanding"
        component={OnboardingLanding}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="SignupCode" component={SignupCode} />
      <Stack.Screen name="LoginCode" component={LoginCode} />
      <Stack.Screen name="DisplayName" component={DisplayName} />
      <Stack.Screen name="Gamertag" component={Gamertag} />
      <Stack.Screen name="Birthday" component={Birthday} />
      <Stack.Screen name="TOS" component={TOS} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen
        name="VaultPostFullView"
        component={VaultPostFullView}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="VaultPostFocusView"
        component={VaultPostFocusView}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="DeletePost"
        component={DeletePost}
        options={{ animation: "fade" }}
      />

      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{ animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="CommentsMain"
        component={CommentsMain}
        options={{ animation: "fade_from_bottom", gestureEnabled: false }}
      />

      <Stack.Screen
        name="PostMultiDelete"
        component={PostMultiDelete}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="SelectGame"
        component={SelectGame}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="HVSearchLanding"
        component={HVSearchLanding}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="HVGameDisplay"
        component={HVGameDisplay}
        options={{ animation: "flip" }}
      />
      <Stack.Screen
        name="GetStartedLanding"
        component={GetStartedLanding}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default MasterStack;
