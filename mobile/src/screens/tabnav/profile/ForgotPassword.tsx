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
import { Storage } from "aws-amplify";
import { Environment, GlobalStyles, Colors } from "../../../resources/project";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { DismissKeyboard } from "../../../resources/utilities";
import { BackArrow, HalfbarButton } from "../../../resources/atoms";

const PastyHalfbarButtons = ({ active, label, Action, disabled }) => {
  return (
    <TouchableOpacity onPress={() => Action()} disabled={disabled}>
      <View
        style={[
          GlobalStyles.shadow,
          styles.buttonwrapper,
          { backgroundColor: active ? Colors.AccentOn : Colors.AccentOff },
        ]}
      >
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h3text,
            styles.buttontext,
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

async function GetBackground({
  setBackgroundImg,
}: {
  setBackgroundImg: Function;
}) {
  console.log("Get background img");
  const signedURL = await Storage.get("CompanyStock/forgotpasswordacnh.JPG", {
    expires: 86400,
  });
  setBackgroundImg(signedURL);
}

const ForgotPassword = ({ navigation }) => {
  const [gotBackgroundImg, setGotBackgroundImg] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(null);

  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordSatisfied, setPasswordSatisfied] = useState(false);

  // Accesses Redux store for triggering error messages
  const dispatch = useDispatch();

  if (gotBackgroundImg === false) {
    GetBackground({ setBackgroundImg });
    setGotBackgroundImg(true);
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
                label={"Back"}
                active={false}
                disabled={false}
                Action={() => navigation.goBack()}
              />
              <PastyHalfbarButtons
                label={"Confirm"}
                active={passwordSatisfied}
                disabled={!passwordSatisfied}
                Action={() => console.log("Pressed")}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
  buttonwrapper: {
    height: Environment.CubeSize,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    textAlign: "center",
    color: Colors.Primary,
  },
});

export default ForgotPassword;
