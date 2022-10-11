import { useState } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrow, BulletListComponent } from "../../../resources/atoms";
import { LinkCopyDisplay } from "../../../resources/molecules";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
// accentOn,
const bulletStyle = [
  GlobalStyles.p1text,
  {
    color: Colors.AccentOn,
  },
];

const BackupMain = () => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.headerHolder}>
        <BackArrow />
        <Text
          style={[GlobalStyles.h2text, GlobalStyles.shadow, styles.whiteText]}
        >
          Backup uploads
        </Text>
        <View pointerEvents="none" style={styles.backArrowCounterweight}>
          <BackArrow />
        </View>
      </View>
      <View style={[GlobalStyles.shadow, styles.infoBox]}>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.whiteText,
          ]}
        >
          Use the link below to download all Render uploads to your PC's
          downloads folder.
        </Text>
        <Text
          style={[
            GlobalStyles.h4text,
            GlobalStyles.irregularshadow,
            styles.infoSubHeader,
          ]}
        >
          Recommendations:{" "}
        </Text>
        <BulletListComponent bulletStyle={bulletStyle}>
          Use a PC (not phone) for downloads.
        </BulletListComponent>
        <BulletListComponent bulletStyle={bulletStyle}>
          Google Chrome handles downloads best.
        </BulletListComponent>
        <BulletListComponent bulletStyle={bulletStyle}>
          Use this service rarely. It is time and resource intensive.
        </BulletListComponent>
      </View>
      <LinkCopyDisplay
        copied={copiedLink}
        setCopied={setCopiedLink}
        url={"https://www.backup.render.game/"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Platform.OS === "android" ? Environment.SmallPadding : 0,
  },
  headerHolder: {
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  whiteText: {
    color: Colors.AccentOn,
  },
  backArrowCounterweight: {
    opacity: 0,
  },
  infoBox: {
    width: Environment.FullBar,
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardPadding,
    marginVertical: Environment.StandardPadding,
  },
  infoSubHeader: {
    color: Colors.Accent90,
    marginTop: Environment.StandardPadding,
    textDecorationLine: "underline",
  },
});

export default BackupMain;
