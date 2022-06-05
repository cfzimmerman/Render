import {
  View, TouchableOpacity, Text, StyleSheet,
} from "react-native";
import { Environment, Colors, GlobalStyles } from "../project";

function IconHalfbarButton({
  label, Action, Icon, active,
}) {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View
        style={[
          GlobalStyles.shadow,
          styles.buttonwrapper,
          { backgroundColor: active ? Colors.AccentOn : Colors.Primary },
        ]}
      >
        <Icon
          stroke={active ? Colors.Primary : Colors.AccentPartial}
          height={Environment.IconSize}
          width={Environment.IconSize}
          style={GlobalStyles.irregularshadow}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h3text,
            styles.labelstyle,
            { color: active ? Colors.Primary : Colors.AccentPartial },
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
    flexDirection: "row",
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  labelstyle: {
    textAlign: "center",
  },
});

export default IconHalfbarButton;
