import { View, Text, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

function GalleryFooter({ length }) {
  if (length < 2) {
    return null;
  }
  return (
    <View style={styles.footerwrapper}>
      <Text
        style={[
          GlobalStyles.p1text,
          GlobalStyles.irregularshadow,
          styles.description,
        ]}
      >
        {" "}
        {length}
        {' '}
        posts in Gallery
        {" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerwrapper: {
    width: Environment.FullBar,
    height: Environment.CubeSize * 2,
    alignItems: "center",
  },
  description: {
    color: Colors.AccentOn,
    padding: Environment.StandardPadding,
    textAlign: "center",
  },
});

export default GalleryFooter;
