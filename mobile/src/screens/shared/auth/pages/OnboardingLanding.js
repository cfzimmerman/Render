import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GlobalStyles, Environment, Colors, Icons } from "../../../../global";

import NextButton from "../components/NextButton";

import OnboardingLandingImage from "../../general/components/OnboardingLandingImage";
import ErrormessageModal from "../../general/components/ErrormessageModal";
import OnboardingScreenTemplate from "../components/OnboardingScreenTemplate";
import InitiateAuthFlow from "../operations/InitiateAuthFlow";

import { Auth } from "aws-amplify";

async function IsNewUser({ userinfo, navigation, dispatch }) {
  const input3 = userinfo.email.trim();
  const input2 = input3.toLowerCase();
  const username = input2.replace(/\s/g, "");

  if (username.includes("@") === false || username.includes(".") === false) {
    return console.log("Invalid email format");
  }

  InitiateAuthFlow({ username, navigation, dispatch });
}

const OnboardingLanding = ({ navigation }) => {
  // input logs text bar contents
  const [input, setInput] = useState("");

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isValid, setIsValid] = useState(false);

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

  const dispatch = useDispatch();

  // Triggers animation to display next button if an email address is likely present
  // Email address is confirmed if an @ is present in the string
  const CheckEmail = () => {
    if (
      input.includes("@") === true &&
      input.includes(".") &&
      isValid === false
    ) {
      setIsValid(true);
    } else if (
      (input.includes("@") === false || input.includes(".") === false) &&
      isValid === true
    ) {
      setIsValid(false);
    }
  };

  // FRONTEND CONFIG: Data sent to OnboardingScreenTemplate to visually customize the screen
  const Items = {
    backgroundimg: onboardingassets.onboardinglanding,
    headerimg: OnboardingLandingImage({
      imageurl: onboardingassets.squarelogo,
    }),
    primarytext: "Save forever, share anywhere",
    secondarytext: null,
    activebox: 0,
  };

  // New user object. Password is never used to sign in (but AWS requires it), so a random password is generated
  const newuser = {
    email: input,
    password: `${Math.floor(Math.random() * 1000000)}#Rr`,
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <KeyboardAvoidingView style={styles.boxContainer}>
        <View style={[styles.bar, GlobalStyles.irregularshadow]}>
          <TextInput
            placeholder="Email address"
            textAlign="left"
            autoCapitalize="none"
            placeholderTextColor={Colors.PrimaryOff}
            style={[styles.inputbox, GlobalStyles.h3text]}
            onChangeText={setInput}
            onKeyPress={CheckEmail()}
            value={input}
            keyboardType="email-address"
          />
        </View>
        <NextButton
          Action={() => IsNewUser({ userinfo: newuser, navigation, dispatch })}
          active={isValid}
        />
      </KeyboardAvoidingView>
    </OnboardingScreenTemplate>
  );
};

const styles = StyleSheet.create({
  bar: {
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

export default OnboardingLanding;
