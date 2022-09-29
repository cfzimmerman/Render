import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CopyToClipboard, ShareLink } from "../../../resources/utilities";
import {
  BackArrow,
  HalfbarButton,
  IconHalfbarButton,
} from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../global";
import { LinkCopyDisplay } from "../../../resources/molecules";

const WebUploadPreview = ({ navigation }) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.pageContainer}>
        <View>
          <BackArrow />
        </View>
        <View>
          <Text style={[GlobalStyles.h2text, styles.pageHeader]}>
            Web upload
          </Text>
        </View>
        <View style={styles.backArrowHolder} pointerEvents={"none"}>
          <BackArrow />
        </View>
      </View>
      <View style={[GlobalStyles.shadow, styles.infoText]}>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.infoTextTitle,
          ]}
        >
          Web upload is the easiest way to quickly send screen captures from
          your PC to your Render Vault.
        </Text>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p2text,
            styles.infoTextDescription,
          ]}
        >
          *An account password is required for web upload. If you forgot yours,
          change it in{" "}
          <Text
            style={styles.inlineLinkText}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Profile / ⚙️ / Password
          </Text>
          .
        </Text>
      </View>
      <LinkCopyDisplay
        setCopied={setCopied}
        copied={copied}
        url={"https://www.app.render.game/"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    paddingVertical: Environment.StandardPadding,
    alignItems: "center",
  },
  pageContainer: {
    width: Environment.FullBar,
    height: Environment.CubeSize,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeader: {
    color: Colors.AccentOn,
  },
  backArrowHolder: {
    opacity: 0,
  },
  infoText: {
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    padding: Environment.StandardPadding,
    alignItems: "center",
    borderRadius: Environment.StandardRadius,
    marginVertical: Environment.StandardPadding,
  },
  infoTextTitle: {
    color: Colors.AccentOn,
  },
  infoTextDescription: {
    color: Colors.Accent90,
    marginTop: Environment.SmallPadding,
  },
  inlineLinkText: {
    textDecorationLine: "underline",
  },
});

export default WebUploadPreview;
