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

import VaultPostFullView from "./screens/tabnav/vault/VaultPostFullView";
import VaultPostFocusView from "./screens/tabnav/vault/VaultPostFocusView";
import DeletePost from "./screens/tabnav/vault/DeletePost";
import EditPost from "./screens/tabnav/plus/EditPost";
import AppStart from "./screens/masterstack/AppStart";

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
  VaultPostFullView: {
    startindex: number;
    usecase: string;
  };
  VaultPostFocusView: {
    usecase: string;
  };
  DeletePost: {
    postid: string;
  };
  EditPost: {
    index: number;
    origin: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MasterStack({ navigation }) {
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
    </Stack.Navigator>
  );
}

export default MasterStack;