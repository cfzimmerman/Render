import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Environment,
  Icons,
  GlobalStyles,
  Colors,
} from "../../../resources/project";

const NextButton = ({ Action, active }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (active === true) {
          Action();
        }
      }}
    >
      <View
        style={[
          styles.boxstyle,
          GlobalStyles.shadow,
          { backgroundColor: active ? Colors.AccentOn : Colors.AccentOff },
        ]}
      >
        <Icons.OriginalSize.NextIcon
          stroke={active ? Colors.Primary : Colors.PrimaryOff}
          height={Environment.IconSize}
          width={Environment.IconSize}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxstyle: {
    width: Environment.CubeSize,
    height: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.StandardRadius,
  },
});

export default NextButton;
