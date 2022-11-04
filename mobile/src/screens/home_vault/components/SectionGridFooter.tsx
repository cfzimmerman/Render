import { View, Text, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../global";

function SectionGridFooter({ length, vaultNextToken }) {
  if (length < 2) {
    return null;
  }
  if (vaultNextToken === null) {
    return (
      <View style={styles.wrapper}>
        <Text
          style={[
            GlobalStyles.p1text,
            GlobalStyles.irregularshadow,
            styles.date,
          ]}
        >
          {" "}
          {length} items{" "}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Text
        style={[GlobalStyles.p1text, GlobalStyles.irregularshadow, styles.date]}
      >
        {" "}
        Loading...{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: Environment.FullBar,
    height: Environment.CubeSize * 2,
    alignItems: "center",
  },
  date: {
    color: Colors.AccentOn,
    padding: Environment.StandardPadding,
    textAlign: "center",
  },
});

export default SectionGridFooter;
