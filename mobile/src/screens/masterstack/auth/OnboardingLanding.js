import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import OnboardingLandingImage from "../../../resources/molecules/OnboardingLandingImage";
import { ErrormessageModal } from "../../../resources/molecules";
import { OnboardingScreenTemplate } from "../../../resources/organisms";
import InitiateAuthFlow from "./InitiateAuthFlow";

async function IsNewUser({ userinfo, navigation, dispatch }) {
  const input3 = userinfo.email.trim();
  const input2 = input3.toLowerCase();
  const username = input2.replace(/\s/g, "");

  if (username.includes("@") === false || username.includes(".") === false) {
    return console.log("Invalid email format");
  }

  InitiateAuthFlow({ username, navigation, dispatch });
}

function OnboardingLanding({ navigation }) {
  // input logs text bar contents
  const [input, setInput] = useState("");

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isActive, setIsActive] = useState(false);

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  // New user object. Password is never used to sign in (but AWS requires it), so a random password is generated
  const newuser = {
    email: input,
    password: `${Math.floor(Math.random() * 1000000)}#Rr`,
  };

  // Animation starts here
  // opacity is the name of the animated value. Perhaps a little confusing, but I just followed along the React Native docs, and that's what they used. Easier to follow along this way.
  const opacity = new Animated.Value(0);

  // Makes next button to confirm email visible
  const animatein = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing,
    }).start(({ finished }) => {
      if (!finished) {
        setTimeout(() => {
          setIsActive(false);
        }, 400);
      }
    });
  };

  // Obscures button to confirm email
  const animateout = (easing) => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      easing,
    }).start();
  };

  // Calculates button transforming from size zero to a standard button size and back
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Environment.CubeSize],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    GlobalStyles.irregularshadow,
  ];

  const bar = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [Environment.FullBar, Environment.TextBarOption],
  });

  const barStyles = [
    styles.bar,
    {
      width: bar,
      height: Environment.CubeSize,
    },
    GlobalStyles.irregularshadow,
  ];

  // Animation ends here

  // Triggers animation to display next button if an email address is likely present
  // Email address is confirmed if an @ is present in the string
  const CheckEmail = () => {
    if (input.includes("@") === true && isActive === false) {
      animatein(Easing.ease);
      setTimeout(() => {
        setIsActive(true);
      }, 200);
    } else if (input.includes("@") === false && isActive === true) {
      animateout(Easing.ease);
      setTimeout(() => {
        setIsActive(false);
      }, 200);
    } else {

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

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <KeyboardAvoidingView style={styles.boxContainer}>
        <Animated.View style={barStyles}>
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
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            IsNewUser({ userinfo: newuser, navigation, dispatch });
          }}
        >
          <Animated.View style={animatedStyles}>
            <IconButton
              icon={Icons.OriginalSize.NextIcon}
              color={Colors.AccentOn}
            />
          </Animated.View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </OnboardingScreenTemplate>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginTop: 32,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOff,
  },
  box: {
    marginTop: 32,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOff,
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
