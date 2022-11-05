import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import {
  Environment,
  GlobalStyles,
  Colors,
  UserDialogue,
} from "../../../global";
import SystemMessageModal from "../../shared/general/components/SystemMessageModal";
import ErrorMessageModal from "../../shared/general/components/ErrorMessageModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import DismissKeyboard from "../../shared/general/operations/DismissKeyboard";
import BackArrow from "../../shared/general/components/BackArrow";
import PastyHalfbarButtons from "../../shared/general/components/PastyHalfbarButtons";
import { DispatchType, RootStateType } from "../../../redux";
import { CurrentUserType } from "../../../global/CommonTypes";
import { setSystemMessageActive } from "../../../redux/shared/messagemodal";
import { setErrorMessageActive } from "../../../redux/shared/errormessage";
import { updateUsers } from "../../../graphql/mutations";
import { setSetPassword } from "../../../redux/profilemain";

async function GetForgotPasswordCode({
  username,
  dispatch,
}: {
  username: string;
  dispatch: DispatchType;
}) {
  try {
    await Auth.forgotPassword(username);
    dispatch(
      setSystemMessageActive(UserDialogue().systemmessage.forgotpasswordsent)
    );
  } catch (error) {
    dispatch(
      setErrorMessageActive(UserDialogue("11").errormessage.systemerror)
    );
    console.log("Error: " + error);
  }
}

interface ConfirmChangePasswordPropTypes {
  username: string;
  code: string;
  new_password: string;
  currentuser: CurrentUserType;
  navigation: any;
  dispatch: DispatchType;
}

async function ConfirmChangePassword({
  username,
  code,
  new_password,
  currentuser,
  navigation,
  dispatch,
}: ConfirmChangePasswordPropTypes) {
  try {
    await Auth.forgotPasswordSubmit(username, code, new_password);
    if (
      currentuser.setpassword === false ||
      currentuser.setpassword === "unknown" ||
      currentuser.setpassword === null
    ) {
      const updatedUser = {
        id: currentuser.id,
        setpassword: true,
      };
      const newUser = await API.graphql(
        graphqlOperation(updateUsers, { input: updatedUser })
      );
      console.log("NewUser: " + JSON.stringify(newUser));
    }
    dispatch(setSetPassword(true));
    navigation.navigate("HomeVault");
    dispatch(
      setSystemMessageActive(UserDialogue().systemmessage.newpasswordsaved)
    );
  } catch (error) {
    console.log("Error: " + error);
    dispatch(
      setSystemMessageActive(UserDialogue().systemmessage.incorrectpasswordcode)
    );
  }
}

// Update redux

async function GetBackground({
  setBackgroundImg,
}: {
  setBackgroundImg: Function;
}) {
  const signedURL = await Storage.get(
    "CompanyStock/forgotpasswordbackground.png",
    {
      expires: 86400,
    }
  );
  setBackgroundImg(signedURL);
}

async function GetUsername({ setUsername }) {
  const { username } = await Auth.currentUserInfo();
  setUsername(username);
}

const ForgotPassword = ({ navigation }) => {
  const [gotBackgroundImg, setGotBackgroundImg] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [username, setUsername] = useState(null);
  const [sentInitialCode, setSentInitialCode] = useState(false);

  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordSatisfied, setPasswordSatisfied] = useState(false);

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  const dispatch = useDispatch();

  if (gotBackgroundImg === false) {
    GetBackground({ setBackgroundImg });
    GetUsername({ setUsername });
    setGotBackgroundImg(true);
  }

  if (sentInitialCode === false && username != null) {
    GetForgotPasswordCode({ dispatch, username });
    setSentInitialCode(true);
  }

  const UpdatePassword = (input) => {
    setPasswordValue(input);
    if (input.length >= 8 && passwordSatisfied === false) {
      setPasswordSatisfied(true);
    } else if (input.length < 8 && passwordSatisfied === true) {
      setPasswordSatisfied(false);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          style={[StyleSheet.absoluteFill, styles.backgroundimage]}
          source={{ uri: backgroundImg }}
          blurRadius={Environment.BlurRadius}
        />
        <SafeAreaView style={styles.safeareacontainer}>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              style={styles.keyboardavoidingwrapper}
              behavior="height"
            >
              <View style={styles.boxwrapper}>
                <View style={styles.labelwrapper}>
                  <Text
                    style={[
                      styles.labelstyle,
                      GlobalStyles.irregularshadow,
                      GlobalStyles.p1text,
                    ]}
                  >
                    {`${"Security code "}`}
                  </Text>
                  <Text
                    style={[
                      styles.sublabelstyle,
                      GlobalStyles.irregularshadow,
                      GlobalStyles.p2text,
                    ]}
                  >
                    (Sent to your email)
                  </Text>
                </View>
                <View style={[GlobalStyles.shadow, styles.inputwrapper]}>
                  <TextInput
                    placeholder="000000"
                    textAlign="center"
                    placeholderTextColor={Colors.PrimaryOff}
                    style={[styles.inputbox, GlobalStyles.h3text]}
                    onChangeText={setCodeValue}
                    value={codeValue}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </View>
              </View>

              <View style={styles.boxwrapper}>
                <View style={styles.labelwrapper}>
                  <Text
                    style={[
                      styles.labelstyle,
                      GlobalStyles.irregularshadow,
                      GlobalStyles.p1text,
                    ]}
                  >
                    {`${"New password "}`}
                  </Text>
                  <Text
                    style={[
                      styles.sublabelstyle,
                      GlobalStyles.irregularshadow,
                      GlobalStyles.p2text,
                    ]}
                  >
                    (8 character min)
                  </Text>
                </View>

                <View style={[GlobalStyles.shadow, styles.inputwrapper]}>
                  <TextInput
                    placeholder="••••••••••"
                    textAlign="center"
                    placeholderTextColor={Colors.PrimaryOff}
                    style={[styles.inputbox, GlobalStyles.h3text]}
                    onChangeText={UpdatePassword}
                    value={passwordValue}
                    keyboardType="default"
                  />
                </View>
              </View>
              <View style={styles.buttonholder}>
                <PastyHalfbarButtons
                  label={"New code"}
                  active={false}
                  disabled={false}
                  Action={() => GetForgotPasswordCode({ username, dispatch })}
                />
                <PastyHalfbarButtons
                  label={"Confirm"}
                  active={passwordSatisfied}
                  disabled={!passwordSatisfied}
                  Action={() =>
                    ConfirmChangePassword({
                      username,
                      code: codeValue,
                      new_password: passwordValue,
                      currentuser,
                      navigation,
                      dispatch,
                    })
                  }
                />
              </View>
            </KeyboardAvoidingView>
            <View style={{ position: "absolute" }}>
              <BackArrow />
            </View>
          </View>
        </SafeAreaView>
        <SystemMessageModal />
        <ErrorMessageModal />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeareacontainer: {
    flex: 1,
  },
  backgroundimage: {
    resizeMode: "cover",
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    opacity: Environment.BackgroundOpacity,
  },
  keyboardavoidingwrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputbox: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    color: Colors.Primary,
    textAlign: "center",
  },
  inputwrapper: {
    backgroundColor: Colors.AccentOff,
    width: Environment.FullBar,
  },
  labelwrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  labelstyle: {
    color: Colors.AccentOn,
    marginBottom: Environment.SmallPadding,
    textAlign: "left",
  },
  sublabelstyle: {
    color: Colors.AccentPartial,
    marginBottom: Environment.SmallPadding,
    textAlign: "left",
  },
  boxwrapper: {
    marginBottom: Environment.LargePadding,
  },
  buttonholder: {
    flexDirection: "row",
    width: Environment.FullBar,
    justifyContent: "space-between",
    marginBottom: Environment.LargePadding,
  },
});

export default ForgotPassword;
