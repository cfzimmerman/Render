import {
  View, Text, StyleSheet, TouchableOpacity,
} from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

function SectionGridEmptyComponent({ navigation, firstvaultupload }) {
  if (firstvaultupload === true) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Plus")}>
        <View style={[styles.box, GlobalStyles.shadow]}>
          <Text style={[styles.header, GlobalStyles.h1text]}>📦</Text>
          <Text style={[styles.header, GlobalStyles.h2text]}>
            Your Vault is empty.
          </Text>
          <Text style={[styles.description, GlobalStyles.p1text]}>
            Let's add some content.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Environment.LargePadding,
    alignItems: "center",
  },
  box: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    color: Colors.AccentOn,
  },
  description: {
    color: Colors.AccentPartial,
  },
});

export default SectionGridEmptyComponent;
