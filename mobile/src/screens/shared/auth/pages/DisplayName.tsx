import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { setErrormessageActive } from "../../../../redux/shared/errormessage";
import { setSystemmessageActive } from "../../../../redux/shared/messagemodal";
import {
  GlobalStyles,
  Environment,
  Colors,
  UserDialogue,
} from "../../../../global";
import ErrormessageModal from "../../general/components/ErrormessageModal";
import SystemmessageModal from "../../general/components/SystemmessageModal";
import OnboardingScreenTemplate from "../components/OnboardingScreenTemplate";

import { updateUsers } from "../../../../graphql/mutations";
import NextButton from "../components/NextButton";
import { RootStateType } from "../../../../redux";

async function AddDisplayName({ input, navigation, dispatch }) {
  // Trim spaces from user input.  Get current user email and pass along with Nav object into change name functions
  const trimmedinput = input.trim();
  const userinfo = await Auth.currentUserInfo();
  const userid = userinfo.attributes["custom:userID"];

  if (trimmedinput.length > 20 || trimmedinput.length < 2) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.impropernameformat)
    );
    return;
  }

  UpdateName({
    displayname: trimmedinput,
    userid,
    navigation,
    dispatch,
  });
}

async function UpdateName({ displayname, userid, navigation, dispatch }) {
  const userobject = {
    id: userid,
    displayname,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: userobject }));
  } catch (error) {
    dispatch(setErrormessageActive(UserDialogue("7").errormessage.systemerror));
    return;
  }

  navigation.navigate("Gamertag");
}

const DisplayName = () => {
  // input logs text bar contents
  const [input, setInput] = useState("");

  const [isValid, setIsValid] = useState(false);

  const onboardingassets = useSelector(
    (state: RootStateType) => state.onboarding.imageurls
  );

  // Imports navigation to use with button
  const navigation = useNavigation();

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  // Animation ends here

  // Triggers animation to display next button if input matches display name length requirements
  const CheckName = (userInput) => {
    const trimmedInput = userInput.trim();
    if (trimmedInput.length >= 1 && isValid === false) {
      setIsValid(true);
    } else if (trimmedInput.length < 1 && isValid === true) {
      setIsValid(false);
    }
  };

  // FRONTEND CONFIG
  // Data sent to OnboardingScreenTemplate to visually customize the screen
  const Items = {
    backgroundimg: onboardingassets.displayname,
    headerimg: null,
    primarytext: "What should we call you?",
    secondarytext: "This is the changeable name at the top of your profile.",
    activebox: 2,
  };

  const HandleChange = (prop) => {
    setInput(prop);
    CheckName(prop);
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <KeyboardAvoidingView style={styles.boxContainer}>
        <View style={[styles.box, GlobalStyles.shadow]}>
          <TextInput
            placeholder="Display name"
            textAlign="left"
            autoCapitalize="none"
            placeholderTextColor={Colors.PrimaryOff}
            style={[styles.inputbox, GlobalStyles.h3text]}
            onChangeText={HandleChange}
            value={input}
            keyboardType="default"
            maxLength={20}
          />
        </View>
        <NextButton
          Action={() =>
            AddDisplayName({
              input,
              navigation,
              dispatch,
            })
          }
          active={isValid}
        />
      </KeyboardAvoidingView>
    </OnboardingScreenTemplate>
  );
};

const styles = StyleSheet.create({
  bar: {
    marginTop: 32,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOff,
  },
  box: {
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOff,
    width:
      Environment.FullBar -
      (Environment.CubeSize + Environment.StandardPadding),
    height: Environment.CubeSize,
  },
  boxContainer: {
    width: Environment.FullBar,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputbox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    color: Colors.Primary,
  },
});

export default DisplayName;
