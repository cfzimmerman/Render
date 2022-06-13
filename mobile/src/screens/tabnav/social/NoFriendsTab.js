import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";

function NoFriendsTab({ addedusersfilter, navigation }) {
  if (addedusersfilter.length === 0) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
        <View style={[styles.modalbox, GlobalStyles.shadow]}>
          <Icons.OriginalSize.AddUser
            stroke={Colors.AccentOn}
            height={Environment.IconSize * 2}
            width={Environment.IconSize * 2}
            style={styles.mainicon}
          />
          <Text style={[styles.header, GlobalStyles.h2text]}>Added feed</Text>
          <Text style={[styles.description, GlobalStyles.p1text]}>
            Add friends and view their posts here.
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  modalbox: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.Primary,
    marginVertical: Environment.LargePadding,
  },
  header: {
    color: Colors.AccentOn,
  },
  description: {
    color: Colors.AccentPartial,
  },
  mainicon: {
    marginBottom: Environment.SmallPadding,
  },
});

export default NoFriendsTab;
