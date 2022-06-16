import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { GlobalStyles, Colors, Environment } from "../project";

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

const styles = StyleSheet.create({
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

export default PastyHalfbarButtons;
