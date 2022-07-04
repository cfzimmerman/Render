import React, { useState } from "react";
import * as Linking from "expo-linking";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CopyToClipboard } from "../../../resources/utilities";
import {
  BackArrow,
  HalfbarButton,
  IconHalfbarButton,
} from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

async function ShareLink(message: string) {
  if (Platform.OS === "ios") {
    await Share.share({
      url: message,
    });
  } else {
    await Share.share({
      message: message,
    });
  }
}

const WebUploadPreview = () => {
  const [copied, setCopied] = useState("Copy");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: Environment.StandardPadding,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: Environment.FullBar,
          height: Environment.CubeSize,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <BackArrow />
        </View>
        <View>
          <Text style={[GlobalStyles.h2text, { color: Colors.AccentOn }]}>
            Web upload
          </Text>
        </View>
        <View style={{ opacity: 0 }} pointerEvents={"none"}>
          <BackArrow />
        </View>
      </View>
      <View
        style={[
          GlobalStyles.shadow,
          {
            width: Environment.FullBar,
            backgroundColor: Colors.Primary,
            padding: Environment.StandardPadding,
            alignItems: "center",
            borderRadius: Environment.StandardRadius,
            marginVertical: Environment.StandardPadding,
          },
        ]}
      >
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            { color: Colors.AccentOn },
          ]}
        >
          Web upload is the easiest way to quickly send screen captures from
          your PC to your Render Vault.
        </Text>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p2text,
            { color: Colors.Accent90, marginTop: Environment.SmallPadding },
          ]}
        >
          *An account password is required for web upload. If you forgot yours,
          change it in Profile / ⚙️ / Password.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.app.render.game/")}
      >
        <View
          style={[
            GlobalStyles.shadow,
            {
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
          ]}
        >
          <Text
            selectable={true}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h4text,
              {
                color: Colors.AccentOn,
                textDecorationLine: "underline",
              },
            ]}
          >
            https://www.app.render.game/
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: Environment.FullBar,
          marginTop: Environment.LargePadding,
        }}
      >
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

export default WebUploadPreview;
