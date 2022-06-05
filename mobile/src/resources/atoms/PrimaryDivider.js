import { View, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles } from "../project";

function PrimaryDivider() {
  return <View style={[GlobalStyles.shadow, styles.divider]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: Environment.SmallPadding,
    width: Environment.FullBar,
    borderRadius: Environment.SmallRadius,
    backgroundColor: Colors.Primary,
    marginVertical: Environment.StandardPadding,
  },
});

export default PrimaryDivider;
