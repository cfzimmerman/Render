import { View, Image, Platform, StyleSheet } from "react-native";
import { Environment, GlobalStyles } from "../../../../global";

function OnboardingLandingImage() {
  return (
    <View style={styles.container}>
      <View style={[styles.imageholder, GlobalStyles.irregularshadow]}>
        <Image
          style={styles.headerimage}
          source={require("../../../../../assets/adaptive-icon.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.FullBar,
  },
  imageholder: {
    width: Environment.FullBar,
    alignItems: "center",
    justifyContent: "center",
  },
  headerimage: {
    height: Environment.HalfBar * 1.25,
    width: Environment.HalfBar * 1.25,
    borderRadius: Environment.StandardRadius,
  },
});

export default OnboardingLandingImage;
