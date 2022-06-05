import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../resources/project";

function OtherUserGalleryEmptyComponent(displayname) {
  return (
    <View style={[styles.modalbox, GlobalStyles.shadow]}>
      <Text style={[styles.header, GlobalStyles.h1text]}>😔</Text>
      <Text style={[styles.header, GlobalStyles.h2text]}>No public posts</Text>
      <Text style={[styles.description, GlobalStyles.p1text]}>
        Tell
        {' '}
        {displayname}
        {' '}
        quit being lame
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalbox: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginVertical: Environment.CubeSize,
  },
  header: {
    color: Colors.AccentOn,
  },
  description: {
    color: Colors.AccentPartial,
  },
});

export default OtherUserGalleryEmptyComponent;
