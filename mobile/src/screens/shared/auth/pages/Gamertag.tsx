import React, { useState } from "react";
import {
  TextInput,
  Easing,
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
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
  Icons,
  UserDialogue,
} from "../../../../global";
import ErrormessageModal from "../../general/components/ErrormessageModal";
import SystemmessageModal from "../../general/components/SystemmessageModal";
import OnboardingScreenTemplate from "../components/OnboardingScreenTemplate";

import { updateUsers } from "../../../../graphql/mutations";
import {
  filteredUserByEmail,
  filteredUserByGamertag,
} from "../../../../graphql/customqueries";
import NextButton from "../components/NextButton";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { UserByGamertagQuery } from "../../../../API";
import { RootStateType } from "../../../../redux";

async function AddGamertag({ input, navigation, dispatch }) {
  // Search by Gamertag

  // Checks to ensure name is correctly formatted
  let trimmedinput = input.trim();
  trimmedinput = trimmedinput.toLowerCase();
  trimmedinput = trimmedinput.replace(/[^a-z0-9]+/gi, "-");

  // Checks to ensure name doesn't exceed length limit
  if (trimmedinput.length > 20 || trimmedinput.length < 2) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.impropernameformat)
    );
    return;
  }

  // Checks to ensure sure name isn't already claimed
  const result = (await API.graphql(
    graphqlOperation(filteredUserByGamertag, { gamertag: trimmedinput })
  )) as GraphQLResult<UserByGamertagQuery>;
  const userarray = result.data.userByGamertag.items;

  if (userarray.length > 0) {
    dispatch(
      setSystemmessageActive(UserDialogue().systemmessage.namealreadytaken)
    );
    return;
  }

  const userinfo = await Auth.currentUserInfo();
  const userid = userinfo.attributes["custom:userID"];

  UpdateName({
    gamertag: trimmedinput,
    userid,
    navigation,
    dispatch,
  });
}

async function UpdateName({ gamertag, userid, navigation, dispatch }) {
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

  const [isValid, setIsValid] = useState(false);

  const [isFree, setIsFree] = useState(" ");

  const onboardingassets = useSelector(
    (state: RootStateType) => state.onboarding.imageurls
  );

  // Imports navigation to use with button
  const navigation = useNavigation();

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  // Triggers animation to display next button if input matches display name length requirements
  const CheckName = (filteredname) => {
    if (filteredname.length >= 2 && isValid === false) {
      setIsValid(true);
    } else if (filteredname.length < 2 && isValid === true) {
      setIsValid(false);
    }
  };

  // Queries DB to see if a user has already taken this name. If so, displays taken message and prevents selection.
  async function IsTaken(filteredname) {
    if (filteredname.length > 1) {
      const result = (await API.graphql(
        graphqlOperation(filteredUserByGamertag, { gamertag: filteredname })
      )) as GraphQLResult<UserByGamertagQuery>;
      const userarray = result.data.userByGamertag.items;

      if (userarray.length === 0 && filteredname.length >= 2) {
        setIsFree("Outstanding choice 👏👏");
      } else if (userarray.length > 0) {
        setIsFree("Beans. Some poser already took this name.");
      }
    } else {
      setIsFree(" ");
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

  // Forces user input into selected constraints. Only allows lowercase letters, hyphens, and numbers. No uppercase, spaces, or special characters
  const HandleChange = (userInput) => {
    const scaledname = userInput.toLowerCase();
    const filteredname = scaledname.replace(/[^a-z0-9]+/gi, "-");
    setInput(filteredname);
    CheckName(filteredname);
    IsTaken(filteredname);
  };

  return (
    <OnboardingScreenTemplate options={Items}>
      <ErrormessageModal />
      <SystemmessageModal />
      <View style={styles.contentcontainer}>
        <KeyboardAvoidingView style={styles.boxcontainer}>
          <View style={[GlobalStyles.shadow, styles.box]}>
            <TextInput
              placeholder="@gamertag"
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
              AddGamertag({
                input,
                navigation,
                dispatch,
              })
            }
            active={isValid}
          />
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
    color: Colors.AccentOn,
    marginTop: Environment.StandardPadding,
    marginBottom: -1 * Environment.StandardPadding,
  },
});

export default Gamertag;
