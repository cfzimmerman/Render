import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../global";

function OnboardingHomeTab({
  dispatch,
  currentuser,
  onboardingstatus,
  navigation,
}) {
  if (onboardingstatus === null || onboardingstatus === "HomeLanding") {
    return null;
  }
  if (onboardingstatus === "OnboardingLanding") {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(onboardingstatus)}>
        <View style={[GlobalStyles.shadow, styles.wrapper]}>
          <Text style={[GlobalStyles.h2text, styles.header]}>Get started</Text>
          <Text style={[GlobalStyles.p1text, styles.message]}>
            Tap here to log in or sign up
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (
    onboardingstatus === "SignupCode" ||
    onboardingstatus === "DisplayName" ||
    onboardingstatus === "Gamertag" ||
    onboardingstatus === "Birthday"
  ) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(onboardingstatus)}>
        <View style={[GlobalStyles.shadow, styles.wrapper]}>
          <Text style={[GlobalStyles.h2text, styles.header]}>
            Continue onboarding
          </Text>
          <Text style={[GlobalStyles.p1text, styles.message]}>👆 Tap here</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: Colors.AccentOn,
    marginBottom: Environment.StandardPadding,
  },
  message: {
    color: Colors.AccentPartial,
  },
});

export default OnboardingHomeTab;
