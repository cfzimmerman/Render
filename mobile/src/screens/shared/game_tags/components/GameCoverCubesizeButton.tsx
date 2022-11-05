import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { GlobalStyles, Environment, Colors, Icons } from "../../../../global";

interface PropTypes {
  imageURL: null | string;
  Action: Function;
}

const GameCoverCubesizeButton = ({ imageURL, Action }: PropTypes) => {
  if (imageURL === null) {
    return (
      <TouchableOpacity onPress={() => Action()}>
        <View style={[GlobalStyles.irregularshadow, styles.box]}>
          <Icons.OriginalSize.Tag
            stroke={Colors.AccentOn}
            height={Environment.IconSize}
            width={Environment.IconSize}
            style={GlobalStyles.irregularshadow}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View style={[GlobalStyles.shadow, styles.box]}>
        <Image
          source={{ uri: imageURL }}
          style={{
            height: Environment.CubeSize,
            width: Environment.CubeSize,
            borderRadius: Environment.StandardRadius,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
  },
});

export default GameCoverCubesizeButton;
