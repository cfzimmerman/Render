import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../resources/project";

function VaultPreview({ vaultheader, navigation }) {
  if (vaultheader === null) {
    return null;
  } if (typeof vaultheader.cognitosub === "undefined") {
    console.log("User unauthenticated or without any posts");
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Vault", { screen: "VaultPostLanding" })}
    >
      <View style={[GlobalStyles.shadow, styles.previewwrapper]}>
        <View style={GlobalStyles.shadow}>
          <Image
            style={styles.previewimage}
            source={{ uri: vaultheader.signedurl }}
          />
        </View>
        <Text
          style={[
            GlobalStyles.h4text,
            GlobalStyles.irregularshadow,
            styles.vaulttext,
          ]}
        >
          {"Vault ->"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  previewwrapper: {
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    marginVertical: Environment.StandardPadding,
  },
  vaulttext: {
    color: Colors.AccentPartial,
    textAlign: "right",
    marginVertical: Environment.SmallPadding,
    marginHorizontal: Environment.StandardPadding,
  },
  previewimage: {
    height: Environment.FullBar - Environment.StandardPadding * 3,
    width: Environment.FullBar,
    resizeMode: "cover",
    borderRadius: Environment.StandardRadius,
  },
});

export default VaultPreview;
