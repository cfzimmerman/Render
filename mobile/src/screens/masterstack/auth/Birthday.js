import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format, differenceInCalendarDays } from "date-fns";
import { IconButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
import { IsDarkMode } from "../../../resources/utilities";
import {
  ErrormessageModal,
  SystemmessageModal,
} from "../../../resources/molecules";
import { OnboardingScreenTemplate } from "../../../resources/organisms";

import { updateUsers } from "../../../graphql/mutations";

async function AddBirthday({ input, navigation, dispatch }) {
  const age = differenceInCalendarDays(new Date(), input);
  const birthday = format(input, "yyyy-MM-dd");

  if (age < 365 * 13) {
    dispatch(setSystemmessageActive(UserDialogue().systemmessage.usertooyoung));
    return;
  }

  const userinfo = await Auth.currentUserInfo();

  const userid = userinfo.attributes["custom:userID"];

  UpdateBirthday({
    birthday,
    userid,
    navigation,
    dispatch,
  });
}

async function UpdateBirthday({
  birthday, userid, navigation, dispatch,
}) {
  const updateduser = {
    id: userid,
    birthday,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));
  } catch (error) {
    dispatch(setErrormessageActive(UserDialogue("9").errormessage.systemerror));
    return;
  }

  navigation.navigate("TOS");
}

// FRONTEND CONFIG: Formats text shown in input box
const FormatDateDisplay = (input) => {
  const date = format(input, "PP");
  return date;
};

function Birthday() {
  // input logs text bar contents
  const [input, setInput] = useState(new Date(2002, 4, 1));

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isActive, setIsActive] = useState(false);

  // isUntouched is used to activate the 'next' arrow
  const [isUntouched, setIsUntouched] = useState(true);

  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

  const navigation = useNavigation();

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  const TextColor = () => {
    if (isUntouched === true) {
      return styles.inactivetext;
    }
    return styles.activetext;
  };

  // Closes the datepicker modal
  const HideModal = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  // Opens the datepicker modal
  const OpenModal = () => {
    if (isUntouched === true) {
      animatein(Easing.ease);
    }
    setTimeout(() => {
      setIsUntouched(false), setIsActive(true);
    }, 250);
  };

  // Determines what content to display in the view (that looks like a textbar)
  const BarDisplay = () => {
    if (isUntouched === true) {
      return "Tap here to select";
    }
    const date = FormatDateDisplay(input);
    return date;
  };

  // Saves selected date upon user confirmation
  const DateSelected = (date) => {
    setInput(date);
    HideModal();
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
          animatein(Easing.ease);
        }, 400);
      }
    });
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

  // FRONTEND CONFIG: Data sent to OnboardingScreenTemplate to visually customize the screen
  const Items = {
    backgroundimg: onboardingassets.birthday,
    headerimg: null,
    primarytext: "And finally, when is your birthday?",
    secondarytext: "So we know when to send you cake.",
    activebox: 4,
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <KeyboardAvoidingView style={styles.boxcontainer}>
        <Animated.View style={barStyles}>
          <TouchableOpacity
            onPress={() => {
              OpenModal();
            }}
          >
            <View style={[styles.inputbox]}>
              <Text style={[GlobalStyles.h3text, TextColor()]}>
                {BarDisplay()}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            AddBirthday({
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
      <DateTimePickerModal
        isVisible={isActive}
        date={input}
        mode="date"
        onConfirm={DateSelected}
        onCancel={HideModal}
        display="spinner"
        isDarkModeEnabled={IsDarkMode()}
      />
    </OnboardingScreenTemplate>
  );
}

const styles = StyleSheet.create({
  activetext: {
    color: Colors.Primary,
  },
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
  },
  inactivetext: {
    color: Colors.PrimaryOff,
  },
  inputbox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    color: Colors.Primary,
    justifyContent: "center",
  },
});

export default Birthday;
