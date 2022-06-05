import {
  TouchableOpacity, StyleSheet, View, Text,
} from "react-native";
import { Environment, Colors, GlobalStyles } from "../project/index";

// Use example
// <HalfbarButton label={'words'} Action={() => console.log('pressed')} />

function HalfbarButton({ label, Action, active }) {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View
        style={[
          GlobalStyles.shadow,
          styles.buttonwrapper,
          { backgroundColor: active ? Colors.AccentOn : Colors.Primary },
        ]}
      >
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h3text,
            styles.buttontext,
            { color: active ? Colors.Primary : Colors.AccentOn },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

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
  },
});

export default HalfbarButton;
