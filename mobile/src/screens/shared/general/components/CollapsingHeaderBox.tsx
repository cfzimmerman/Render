import { View, StyleSheet, Animated } from "react-native";
import { Environment } from "../../../../global";

function CollapsingHeaderBox({ clampedscroll, Filler }) {
  const searchbartranslate = clampedscroll.interpolate({
    inputRange: [0, 50],
    outputRange: [Environment.CubeSize + Environment.LargePadding, 0],
    extrapolate: "clamp",
  });

  const searchbaropacity = clampedscroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.animatedwrapper,
        {
          height: searchbartranslate,
          opacity: searchbaropacity,
        },
      ]}
    >
      <View style={styles.container}>
        <Filler />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.FullBar,
  },
  animatedwrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CollapsingHeaderBox;
