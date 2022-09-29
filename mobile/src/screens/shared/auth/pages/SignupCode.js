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
import { setErrormessageActive } from "../../../../redux/shared/errormessage";
import { setSystemmessageActive } from "../../../../redux/shared/messagemodal";
import {
  Environment,
  Colors,
  GlobalStyles,
  UserDialogue,
} from "../../../../global";
import {
  ErrormessageModal,
  SystemmessageModal,
} from "../../../../../old-src/resources/molecules";
import { OnboardingScreenTemplate } from "../../../../../old-src/resources/organisms";
import GetCurrentUser from "../../../profile/operations/GetCurrentUser";

import { listUsers, getUsers } from "../../../../graphql/queries";
import { updateUsers } from "../../../../graphql/mutations";

const IsComplete = ({ input, email, navigation, dispatch, userid }) => {
  // If all six boxes are filled, check the code
  if (input.length === 6) {
    ConfirmSignUp({
      input,
      email,
      navigation,
      dispatch,
      userid,
    });
  }
};

async function ConfirmSignUp({ input, email, navigation, dispatch, userid }) {
  // Amplify function confirms user's email, navigates to next screen
  const username = email;
  const code = input;

  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.incorrectcode)
    );
    return;
  }

  SetConfirmed({
    input,
    email,
    navigation,
    dispatch,
    userid,
  });
}

async function SetConfirmed({ input, email, navigation, dispatch, userid }) {
  const usersresult = await API.graphql(
    graphqlOperation(`
    query GetUser {
        getUsers (
            id: "${userid}"
        ) {
            id
            displayname
            password
        }
    }
  `)
  );

  const user = usersresult.data.getUsers;

  const updateduser = {
    id: user.id,
    emailconfirmed: true,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));

    const newuser = await Auth.signIn(email, user.password);

    const currentuser = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(currentuser, {
      "custom:userID": user.id,
    });
  } catch (error) {
    dispatch(setErrormessageActive(UserDialogue("5").errormessage.systemerror));
    console.log(`error: ${error}`);
    return;
  }
  GetCurrentUser({ dispatch });
  navigation.navigate("DisplayName");
}

async function ResendConfirmationCode({ email, dispatch }) {
  // Function passed into RightTextButton component; Auth function re-sends the confirmation code
  try {
    await Auth.resendSignUp(email);
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.resendcodesuccess)
    );
  } catch (err) {
    dispatch(
      setErrormessageActive(UserDialogue("11").errormessage.systemerror)
    );
  }
}

// FRONTEND CONFIG
// Number of input boxes to display
const CellCount = 6;

//  FRONTEND CONFIG
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

function SignupCode({ route }) {
  // Generates navigation instance to pass to the confirmSignUp function
  const navigation = useNavigation();

  // value is the current contents of the filled boxes. Amplify Auth so-far seems comfortable with the string format. Convert to int later if necessary or optimal
  const [value, setValue] = useState("");

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

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
    primarytext: "We sent you an email",
    secondarytext: "Please confirm the enclosed code",
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
              ResendConfirmationCode({ email: route.params.email, dispatch });
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
              userid: route.params.userid,
              navigation,
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
  inputboxcontainer: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
  },
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
  optionbutton: {
    color: Colors.AccentOff,
    textDecorationLine: "underline",
  },
  resendholder: {
    width: Environment.FullBar,
    flexDirection: "row-reverse",
  },
});

export default SignupCode;
