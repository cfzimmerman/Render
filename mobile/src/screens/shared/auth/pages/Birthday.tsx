import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format, differenceInCalendarDays } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { setErrorMessageActive } from "../../../../redux/shared/errormessage";
import { setSystemMessageActive } from "../../../../redux/shared/messagemodal";

import {
  GlobalStyles,
  Environment,
  Colors,
  UserDialogue,
} from "../../../../global";
import IsDarkMode from "../../general/operations/IsDarkMode";
import ErrorMessageModal from "../../general/components/ErrorMessageModal";
import SystemMessageModal from "../../general/components/SystemMessageModal";
import OnboardingScreenTemplate from "../components/OnboardingScreenTemplate";

import { updateUsers } from "../../../../graphql/mutations";
import NextButton from "../components/NextButton";
import { RootStateType } from "../../../../redux";

async function AddBirthday({ input, navigation, dispatch }) {
  const age = differenceInCalendarDays(new Date(), input);
  const birthday = format(input, "yyyy-MM-dd");

  if (age < 365 * 13) {
    dispatch(setSystemMessageActive(UserDialogue().systemmessage.usertooyoung));
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

async function UpdateBirthday({ birthday, userid, navigation, dispatch }) {
  const updateduser = {
    id: userid,
    birthday,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));
  } catch (error) {
    dispatch(setErrorMessageActive(UserDialogue("9").errormessage.systemerror));
    return;
  }

  navigation.navigate("TOS");
}

// FRONTEND CONFIG: Formats text shown in input box
const FormatDateDisplay = (input) => {
  const date = format(input, "PP");
  return date;
};

const Birthday = () => {
  // input logs text bar contents
  const [input, setInput] = useState(new Date(2002, 4, 1));

  // isActive logs whether the inputbar animation is active (for activation logic)
  const [isActive, setIsActive] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const onboardingassets = useSelector(
    (state: RootStateType) => state.onboarding.imageurls
  );

  const navigation = useNavigation();

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  const TextColor = () => {
    if (isValid === false) {
      return styles.inactivetext;
    } else {
      return styles.activetext;
    }
  };

  // Closes the datepicker modal
  const HideModal = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  // Opens the datepicker modal
  const OpenModal = () => {
    if (isValid === false) {
      setIsValid(true);
    }
    setIsActive(true);
  };

  // Determines what content to display in the view (that looks like a textbar)
  const BarDisplay = () => {
    if (isValid === false) {
      return "Tap here to select";
    } else {
      const date = FormatDateDisplay(input);
      return date;
    }
  };

  // Saves selected date upon user confirmation
  const DateSelected = (date) => {
    setInput(date);
    HideModal();
  };

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
      <ErrorMessageModal />
      <SystemMessageModal />
      <KeyboardAvoidingView style={styles.boxcontainer}>
        <View style={[GlobalStyles.shadow, styles.box]}>
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
        </View>
        <NextButton
          Action={() =>
            AddBirthday({
              input,
              navigation,
              dispatch,
            })
          }
          active={isValid}
        />
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
};

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
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOff,
    width:
      Environment.FullBar -
      (Environment.CubeSize + Environment.StandardPadding),
    height: Environment.CubeSize,
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
