import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { setErrormessageActive } from "../../../redux/system/errormessage";
import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../resources/project";
import {
  ErrormessageModal,
  SystemmessageModal,
} from "../../../resources/molecules";
import { OnboardingScreenTemplate } from "../../../resources/organisms";

import { updateUsers } from "../../../graphql/mutations";
import { listUserID } from "../../../graphql/customqueries";

async function AddDisplayName({ input, navigation, dispatch }) {
  // Trim spaces from user input.  Get current user email and pass along with Nav object into change name functions
  const trimmedinput = input.trim();
  const userinfo = await Auth.currentUserInfo();
  const userid = userinfo.attributes["custom:userID"];

  if (trimmedinput.length > 20 || trimmedinput.length < 2) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.impropernameformat),
    );
    return;
  }

  UpdateName({
    displayname: trimmedinput, userid, navigation, dispatch,
  });
}

async function UpdateName({
  displayname, userid, navigation, dispatch,
}) {
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

function DisplayName() {
  // input logs text bar contents
  const [input, setInput] = useState("");

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isActive, setIsActive] = useState(false);

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

  // Imports navigation to use with button
  const navigation = useNavigation();

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

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
    GlobalStyles.shadow,
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
    GlobalStyles.shadow,
  ];

  // Animation ends here

  // Triggers animation to display next button if input matches display name length requirements
  const CheckName = () => {
    if (input.length >= 2 && input.length <= 20 && isActive === false) {
      animatein(Easing.ease);
      setTimeout(() => {
        setIsActive(true);
      }, 200);
    } else if ((input.length < 2 || input.length > 20) && isActive === true) {
      animateout(Easing.ease);
      setTimeout(() => {
        setIsActive(false);
      }, 200);
    } else {

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

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <KeyboardAvoidingView style={styles.boxContainer}>
        <Animated.View style={barStyles}>
          <TextInput
            placeholder="Display name"
            textAlign="left"
            autoCapitalize="none"
            placeholderTextColor={Colors.PrimaryOff}
            style={[styles.inputbox, GlobalStyles.h3text]}
            onChangeText={setInput}
            onKeyPress={CheckName()}
            value={input}
            keyboardType="default"
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            AddDisplayName({
              input,
              navigation,
              dispatch,
            });
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

export default DisplayName;
