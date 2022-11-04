import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Environment, Colors, GlobalStyles, Icons } from "../../../global";

function NoUploads({ navigation, firstvaultupload }) {
  if (firstvaultupload === false) {
    return (
      <View style={styles.boxholder}>
        <TouchableOpacity onPress={() => navigation.navigate("Plus")}>
          <View style={[styles.modalbox, GlobalStyles.shadow]}>
            <Icons.OriginalSize.PlusIcon
              stroke={Colors.AccentOn}
              height={Environment.IconSize * 2}
              width={Environment.IconSize * 2}
              style={styles.mainicon}
            />
            <Text style={[styles.header, GlobalStyles.h2text]}>
              Upload content
            </Text>
            <Text style={[styles.description, GlobalStyles.p1text]}>
              This is the Vault, your private storage library.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  boxholder: {
    width: Environment.ScreenWidth,
    alignItems: "center",
  },
  modalbox: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.Primary,
  },
  header: {
    color: Colors.AccentOn,
  },
  description: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
  mainicon: {
    marginBottom: Environment.SmallPadding,
  },
});

export default NoUploads;
