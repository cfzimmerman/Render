import React, { useState } from "react";
import {
  TextInput,
  Easing,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
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
import {
  filteredUserByEmail,
  filteredUserByGamertag,
} from "../../../graphql/customqueries";

async function AddGamertag({ input, navigation, dispatch }) {
  // Search by Gamertag

  // Checks to ensure name is correctly formatted
  let trimmedinput = input.trim();
  trimmedinput = trimmedinput.toLowerCase();
  trimmedinput = trimmedinput.replace(/[^a-z0-9]+/gi, "-");

  // Checks to ensure name doesn't exceed length limit
  if (trimmedinput.length > 20 || trimmedinput.length < 2) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.impropernameformat),
    );
    return;
  }

  // Checks to ensure sure name isn't already claimed
  const result = await API.graphql(
    graphqlOperation(filteredUserByGamertag, { gamertag: trimmedinput }),
  );
  const userarray = result.data.userByGamertag.items;

  if (userarray.length > 0) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.namealreadytaken),
    );
    return;
  }

  const userinfo = await Auth.currentUserInfo();
  const userid = userinfo.attributes["custom:userID"];

  UpdateName({
    gamertag: trimmedinput, userid, navigation, dispatch,
  });
}

async function UpdateName({
  gamertag, userid, navigation, dispatch,
}) {
  const updateduser = {
    id: userid,
    gamertag,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));
  } catch (error) {
    dispatch(setErrormessageActive(UserDialogue("8").errormessage.systemerror));
    return;
  }

  navigation.navigate("Birthday");
}

function Gamertag() {
  // input logs text bar contents
  const [input, setInput] = useState("");

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isActive, setIsActive] = useState(false);

  const [isFree, setIsFree] = useState(" ");

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

  // Forces user input into selected constraints. Only allows lowercase letters, hyphens, and numbers. No uppercase, spaces, or special characters
  const ScaleName = () => {
    const scaledname = input.toLowerCase();
    const filteredname = scaledname.replace(/[^a-z0-9]+/gi, "-");
    if (filteredname != input) {
      setInput(filteredname);
    }
    CheckName(filteredname);
    IsTaken(filteredname);
  };

  // Triggers animation to display next button if input matches display name length requirements
  const CheckName = (filteredname) => {
    if (
      filteredname.length >= 2
      && filteredname.length <= 20
      && isActive === false
    ) {
      animatein(Easing.ease);
      setTimeout(() => {
        setIsActive(true);
      }, 200);
    } else if (
      (filteredname.length < 2 || filteredname.length > 20)
      && isActive === true
    ) {
      animateout(Easing.ease);
      setTimeout(() => {
        setIsActive(false);
      }, 200);
    }
  };
  // Queries DB to see if a user has already taken this name. If so, displays taken message and prevents selection.
  async function IsTaken(filteredname) {
    if (filteredname.length > 1) {
      const result = await API.graphql(
        graphqlOperation(filteredUserByGamertag, { gamertag: filteredname }),
      );
      const userarray = result.data.userByGamertag.items;

      if (userarray.length === 0 && filteredname.length >= 2) {
        setIsFree("Outstanding choice 👏👏");
      } else if (userarray.length > 0) {
        setIsFree("Beans. Some poser already took this name.");
      } else if (filteredname.length < 2) {
        setIsFree(" ");
      } else {

      }
    }
  }

  // FRONTEND CONFIG
  // Data sent to OnboardingScreenTemplate to visually customize the screen
  const Items = {
    backgroundimg: onboardingassets.gamertag,
    headerimg: null,
    primarytext: "Now claim a unique @gamertag.",
    secondarytext: "This is the name others can use to find you.",
    activebox: 3,
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <View style={styles.contentcontainer}>
        <KeyboardAvoidingView style={styles.boxcontainer}>
          <Animated.View style={barStyles}>
            <TextInput
              placeholder="@gamertag"
              textAlign="left"
              autoCapitalize="none"
              placeholderTextColor={Colors.PrimaryOff}
              style={[styles.inputbox, GlobalStyles.h3text]}
              onChangeText={setInput}
              onKeyPress={ScaleName()}
              value={input}
              keyboardType="default"
            />
          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              AddGamertag({
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
        <Text style={[styles.takenlabel, GlobalStyles.p1text]}>{isFree}</Text>
      </View>
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
  boxcontainer: {
    width: Environment.FullBar,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Environment.LargePadding,
  },
  contentcontainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  inputbox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    color: Colors.Primary,
  },
  takenlabel: {
    textAlign: "center",
    height: 0,
    color: Colors.AccentOn,
    marginTop: Environment.StandardPadding,
    marginBottom: -1 * Environment.StandardPadding,
  },
});

export default Gamertag;
