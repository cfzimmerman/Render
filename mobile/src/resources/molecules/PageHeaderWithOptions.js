import { View, StyleSheet } from "react-native";
import {
  GlobalStyles, Icons, Colors, Environment,
} from "../project";

import {
  ScreenTitleHeader,
  OffCubeSizeButton,
  OnCubeSizeButton,
} from "../atoms";

function PageHeaderWithOptions({ title, icon, dispatch }) {
  return (
    <View style={styles.container}>
      <ScreenTitleHeader title={title} />
      <OffCubeSizeButton Icon={icon} dispatch={dispatch} />
      <OnCubeSizeButton Icon={icon} dispatch={dispatch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.ScreenWidth,
    paddingHorizontal: Environment.StandardPadding,
    paddingVertical: Environment.SmallPadding,
    backgroundColor: "#111d40",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PageHeaderWithOptions;
