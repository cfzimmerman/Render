import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import * as Linking from "expo-linking";
import {
  CopyToClipboard,
  ShareLink,
} from "../../../../../old-src/resources/utilities";
import { HalfbarButton } from "../atoms";
import { Colors, Environment, GlobalStyles } from "../../../../global";

interface InputTypes {
  setCopied: Function;
  copied: boolean;
  url: string;
}

const LinkCopyDisplay = ({ setCopied, copied, url }: InputTypes) => {
  const ShareURL = () => {
    ShareLink(url);
  };
  const CopyURL = () => {
    CopyToClipboard(url);
    if (copied === false) {
      setCopied(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <View style={[GlobalStyles.shadow, styles.linkWrapper]}>
          <Text
            selectable={true}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h4text,
              styles.linkText,
            ]}
          >
            {url}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonHolder}>
        <HalfbarButton
          label={copied === true ? "Copied" : "Copy"}
          active={false}
          Action={CopyURL}
        />
        <HalfbarButton label={"Share"} active={false} Action={ShareURL} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkWrapper: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    borderWidth: Environment.StandardPadding / 3,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.Accent90,
    backgroundColor: Colors.AccentFaint,
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
  },
  linkText: {
    color: Colors.AccentOn,
    textDecorationLine: "underline",
  },
});

export default LinkCopyDisplay;
