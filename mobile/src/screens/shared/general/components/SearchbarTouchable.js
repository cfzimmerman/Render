import {
  TouchableOpacity,
  View,
  Easing,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { IconButton } from "react-native-paper";

import { Environment, Colors, GlobalStyles, Icons } from "../../../../global";

function SearchbarTouchable({ navigation, destination, clampedscroll }) {
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
        {
          height: searchbartranslate,
          opacity: searchbaropacity,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(destination)}>
          <View style={styles.contentholder}>
            <View style={styles.iconpadding}>
              <Icons.OriginalSize.Search
                stroke={Colors.AccentPartial}
                height={Environment.IconSize}
                width={Environment.IconSize}
              />
            </View>
            <Text style={[styles.placeholder, GlobalStyles.h3text]}>
              Search
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  contentholder: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    padding: Environment.SmallPadding,
    alignItems: "center",
    flexDirection: "row",
  },
  placeholder: {
    color: Colors.AccentPartial,
  },
  iconpadding: {
    margin: Environment.SmallPadding,
  },
});

export default SearchbarTouchable;
