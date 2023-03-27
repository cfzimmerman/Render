import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { setErrorMessageActive } from "../../../../redux/shared/errormessage";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../../global";
import ErrorMessageModal from "../../general/components/ErrorMessageModal";
import OnboardingScreenTemplate from "../components/OnboardingScreenTemplate";
import GetCurrentUser from "../../../profile/operations/GetCurrentUser";

import { getUsers } from "../../../../graphql/queries";
import { updateUsers } from "../../../../graphql/mutations";
import { listUserID } from "../../../../graphql/customqueries";
import { RootStateType } from "../../../../redux";

async function ApproveTOS({ navigation, dispatch }) {
  // Clean this up later (just cut a bunch out here, testing to see how it works)
  UpdateTOS({ navigation, dispatch });
}

async function UpdateTOS({ navigation, dispatch }) {
  const userinfo = await Auth.currentUserInfo();
  const userID = userinfo.attributes["custom:userID"];

  try {
    const updateduser = {
      id: userID,
      acceptedtos: true,
      fullyauthenticated: true,
      pfp: "CompanyStock/defaultpfp.png",
      addedmecount: 0,
      firstvaultupload: false,
      type: "user",
      storagesizeinbytes: 0,
    };

    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));
  } catch (error) {
    dispatch(
      setErrorMessageActive(UserDialogue("10").errormessage.systemerror)
    );
  }

  GetCurrentUser({ dispatch, navigation });

  navigation.navigate("HomeVault");
}

function TOS({ navigation }) {
  // Tracks whether or not the user has accepted the Terms of Service
  const [isAccepted, setIsAccepted] = useState(false);

  const onboardingassets = useSelector(
    (state: RootStateType) => state.onboarding.imageurls
  );

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  const ChangeState = ({ dispatch, navigation }) => {
    setIsAccepted(!isAccepted);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    ApproveTOS({ navigation, dispatch });
  };

  // FRONTEND CONFIG
  // Data sent to OnboardingScreenTemplate to visually customize the screen
  const Items = {
    backgroundimg: onboardingassets.tos,
    headerimg: null,
    primarytext: "Welcome to Render!",
    secondarytext:
      "Review the linked terms and conditions carefully. Then check the box to get started.",
    activebox: 5,
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrorMessageModal />
      <KeyboardAvoidingView style={styles.boxcontainer}>
        <View style={styles.inputbox}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://docs.google.com/document/d/1VHxlEPEX49tW-ngfh4MpbhOpt3AOMEjDfbnj-_2GpvU/edit?usp=sharing"
              );
            }}
          >
            <Text style={[styles.tostext, GlobalStyles.p1text]}>
              I have read and agree to the terms and conditions.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxholder}>
          <TouchableOpacity
            onPress={() => {
              ChangeState({ dispatch, navigation });
            }}
          >
            <View
              style={[
                isAccepted ? styles.boxon : styles.boxoff,
                styles.inputbutton,
                GlobalStyles.shadow,
              ]}
            >
              <IconButton
                icon={
                  isAccepted
                    ? Icons.OriginalSize.Checkmark
                    : Icons.OriginalSize.X
                }
                color={isAccepted ? Colors.Primary : Colors.AccentOn}
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </OnboardingScreenTemplate>
  );
}

const styles = StyleSheet.create({
  boxcontainer: {
    width: Environment.FullBar,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxoff: {
    backgroundColor: Colors.AccentOff,
    width: Environment.CubeSize,
    height: Environment.CubeSize,
  },
  boxholder: {
    width: Environment.CubeSize,
    height: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
  },
  boxon: {
    backgroundColor: Colors.AccentOn,
    width: Environment.CubeSize - Environment.StandardPadding,
    height: Environment.CubeSize - Environment.StandardPadding,
  },
  inputbox: {
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    color: Colors.Primary,
    justifyContent: "center",
  },
  inputbutton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Environment.StandardRadius,
  },
  tostext: {
    color: Colors.AccentOn,
    textDecorationLine: "underline",
  },
});

export default TOS;
