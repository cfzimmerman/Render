import React from "react";
import { StyleSheet, View } from "react-native";
import { HalfByFullDisplayBox } from "../../../resources/atoms";
import { Environment } from "../../../global";

interface InputTypes {
  navigation: any;
  fullyOnboarded: boolean;
}

const AreEqual = (previousProps: InputTypes, nextProps: InputTypes) => {
  if (previousProps.fullyOnboarded === nextProps.fullyOnboarded) {
    return true;
  }
  return false;
};

const GetStartedHeaderBox = ({ navigation, fullyOnboarded }: InputTypes) => {
  if (fullyOnboarded === false) {
    const NavigateToGetStarted = () => {
      navigation.navigate("GetStartedLanding");
    };
    return (
      <View style={styles.wrapper}>
        <HalfByFullDisplayBox
          Action={NavigateToGetStarted}
          header={"🥳"}
          title={"Hello there!"}
          description={"Tap here to learn more about Render."}
          disabled={false}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Environment.StandardPadding,
  },
});

export default React.memo(GetStartedHeaderBox, AreEqual);
