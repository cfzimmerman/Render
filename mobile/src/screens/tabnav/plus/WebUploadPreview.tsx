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
import * as Linking from "expo-linking";
import { CopyToClipboard, ShareLink } from "../../../resources/utilities";
import {
  BackArrow,
  HalfbarButton,
  IconHalfbarButton,
} from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

const WebUploadPreview = ({ navigation }) => {
  const [copied, setCopied] = useState("Copy");

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
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.app.render.game/")}
      >
        <View style={[GlobalStyles.shadow, styles.linkWrapper]}>
          <Text
            selectable={true}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h4text,
              styles.linkText,
            ]}
          >
            https://www.app.render.game/
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonHolder}>
        <HalfbarButton
          label={copied}
          active={false}
          Action={() => {
            CopyToClipboard("https://www.app.render.game/");
            if (copied != "Copied") {
              setCopied("Copied");
            }
          }}
        />
        <HalfbarButton
          label={"Share"}
          active={false}
          Action={() => ShareLink("https://www.app.render.game/")}
        />
      </View>
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
    marginTop: Environment.LargePadding,
  },
  linkText: {
    color: Colors.AccentOn,
    textDecorationLine: "underline",
  },
});

export default WebUploadPreview;
