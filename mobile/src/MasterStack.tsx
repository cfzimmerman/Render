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
} from "../old-src/screens/masterstack/auth";
import { ObservePostDB } from "../old-src/resources/utilities";

import VaultPostFullView, {
  VaultPostFullViewUsecaseTypes,
} from "./screens/home_vault/pages/VaultPostFullView";
import VaultPostFocusView from "./screens/shared/content_display/pages/VaultPostFocusView";
import DeletePost from "./screens/home_vault/pages/DeletePost";
import EditPost from "./screens/plus/pages/EditPost";
import CommentsMain from "./screens/shared/content_display/pages/CommentsMain";
import AppStart from "./screens/shared/master_stack/operations/AppStart";
import ForgotPassword from "./screens/profile/pages/ForgotPassword";
import PostMultiDelete from "./screens/home_vault/pages/PostMultiDelete";
import SelectGame from "./screens/shared/game_tags/pages/SelectGame";
import HVSearchLanding from "./screens/shared/game_tags/pages/HVSearchLanding";
import HVGameDisplay from "./screens/shared/game_tags/pages/HVGameDisplay";
import GetStartedLanding from "./screens/shared/onboarding/pages/GetStartedLanding";
import PGLanding from "./screens/shared/public_game/pages/PGLanding";
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
