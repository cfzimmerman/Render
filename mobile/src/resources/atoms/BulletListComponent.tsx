import { View, Text, StyleSheet } from "react-native";
import { Environment, GlobalStyles, Colors } from "../project";

interface InputTypes {
  children: string;
  bulletStyle: Object[];
}

const BulletListComponent = ({ children, bulletStyle }: InputTypes) => {
  return (
    <View style={styles.lineContainer}>
      <Text style={bulletStyle}>{"•  "}</Text>
      <Text style={bulletStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: Environment.SmallPadding / 4,
  },
});

export default BulletListComponent;
