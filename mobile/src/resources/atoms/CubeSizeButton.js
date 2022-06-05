import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Environment, GlobalStyles, Colors } from "../project";

function CubeSizeButton({ Action, Icon, isactive }) {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View
        style={[
          GlobalStyles.irregularshadow,
          styles.box,
          { backgroundColor: isactive ? Colors.AccentOn : Colors.Primary },
        ]}
      >
        <Icon
          stroke={isactive ? Colors.Primary : Colors.AccentOn}
          height={Environment.IconSize}
          width={Environment.IconSize}
          style={GlobalStyles.irregularshadow}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: Environment.StandardPadding,
  },
});

export default CubeSizeButton;
