import React, { useState } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { setErrormessageActive } from "../../../redux/system/errormessage";
import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import {
  Environment,
  Colors,
  GlobalStyles,
  UserDialogue,
} from "../../../resources/project";
import {
  ErrormessageModal,
  SystemmessageModal,
} from "../../../resources/molecules";
import { OnboardingScreenTemplate } from "../../../resources/organisms";
import EmailLoginCode from "./EmailLoginCode";
import GetCurrentUser from "../../tabnav/profile/GetCurrentUser";
import InitiateAuthFlow from "./InitiateAuthFlow";

import { updateUsers } from "../../../graphql/mutations";

const IsComplete = ({
  input, email, navigation, dispatch, cognitoUser,
}) => {
  if (input.length === 6) {
    HandleCode({
      input, email, navigation, dispatch, cognitoUser,
    });
  }
};

async function HandleCode({
  input, email, navigation, dispatch, cognitoUser,
}) {
  try {
    await Auth.sendCustomChallengeAnswer(cognitoUser, input);
  } catch (error) {
    // The user failed three times, boot them back to the email screen so they can start again
    navigation.navigate("OnboardingLanding");
  }

  try {
    // This will throw an error if the user is not yet authenticated:
    await Auth.currentSession();
    GetCurrentUser({ dispatch, navigation });
  } catch (error) {
    console.log(`Error: ${error}`);
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.incorrectcode),
    );
  }
}

const ResendCode = ({ username, dispatch, navigation }) => {
  InitiateAuthFlow({ username, navigation, dispatch });

  try {
    EmailLoginCode(username);
  } catch (error) {
    console.log(`Error resending login code: ${error}`);
  }

  dispatch(
    setSystemmessageActive(UserDialogue().systemmessage.resendcodesuccess),
  );
};

// FRONTEND CONFIG
// Number of input boxes
const CellCount = 6;

// FRONTEND CONFIG
// Generates Animated instance (much code adapted from react-native-confirmation-code-field example)
const { Value, Text: AnimatedText } = Animated;

const animationsColor = [...new Array(CellCount)].map(() => new Value(0));
const animationsScale = [...new Array(CellCount)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

function LoginCode({ navigation, route }) {
  // value is the current contents of the filled boxes. Amplify Auth so-far seems comfortable with the string format. Convert to int later if necessary or optimal
  const [value, setValue] = useState("");

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);
  const cognitoUser = useSelector((state) => state.onboarding.cognitouser);

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  // States referenced by animated boxes
  const ref = useBlurOnFulfill({ value, cellCount: CellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Component + animation styling for each input box
  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.AccentPartial, Colors.AccentOn],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.AccentOff, Colors.AccentOn],
        }),

      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.75, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[GlobalStyles.h2text, styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  // FRONTEND CONFIG
  // Object passes configuration data to the OnboardingScreenTemplate component
  const Items = {
    backgroundimg: onboardingassets.signup,
    headerimg: null,
    primarytext: "Welcome!",
    secondarytext: "Please confirm the code sent to your email.",
    activebox: 0.5,
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <View>
        <View style={styles.resendholder}>
          <TouchableOpacity
            onPress={() => {
              ResendCode({
                username: route.params.email,
                navigation,
                dispatch,
              });
            }}
          >
            <Text style={[styles.optionbutton, GlobalStyles.p1text]}>
              Get new code
            </Text>
          </TouchableOpacity>
        </View>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(input) => {
            setValue(input);
            IsComplete({
              input,
              email: route.params.email,
              // userid: prop.route.params.userid,
              navigation,
              cognitoUser,
              dispatch,
            });
          }}
          cellCount={CellCount}
          rootStyle={styles.inputboxcontainer}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>
    </OnboardingScreenTemplate>
  );
}

const styles = StyleSheet.create({
  cell: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    lineHeight: Environment.CubeSize - 5,
    marginHorizontal: Environment.InputMargin6,
    textAlign: "center",
    borderRadius: Environment.StandardRadius,
    color: Colors.Primary,
    overflow: "hidden",
  },
  inputboxcontainer: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
  },
  optionbutton: {
    color: Colors.AccentOff,
    textDecorationLine: "underline",
  },
  resendholder: {
    width: Environment.FullBar,
    flexDirection: "row-reverse",
  },
});

export default LoginCode;
