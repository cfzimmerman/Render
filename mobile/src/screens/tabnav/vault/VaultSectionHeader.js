import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from "react-native";

import { GlobalStyles, Environment, Colors } from "../../../resources/project";
import ExternalVaultTileInfo from "./ExternalVaultTileInfo";
import TransitionToFullView from "./TransitionToFullView";

const CorrectURI = ({ contenttype, section }) => {
  if (contenttype === "video") {
    return section.header.post.thumbnailurl;
  } if (contenttype === "image") {
    return section.header.post.signedurl;
  }
};

function VaultSectionHeader({
  section,
  navigation,
  vaultfeeddata,
  dispatch,
}) {
  const contenturl = CorrectURI({
    contenttype: section.header.post.contenttype,
    section,
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerwrapper}>
        <Text style={[GlobalStyles.h4text, styles.headertext]}>
          {section.header.title}
        </Text>
        <TouchableOpacity
          style={[GlobalStyles.shadow, styles.touchablecontainer]}
          onPress={() => TransitionToFullView({
            id: section.header.post.id,
            navigation,
            data: vaultfeeddata,
            dispatch,
            usecase: "vault",
          })}
        >
          <Image style={styles.previewimage} source={{ uri: contenturl }} />
          <ExternalVaultTileInfo
            item={section.header.post}
            origin="sectionheader"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.ScreenWidth,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Environment.StandardPadding,
  },
  headerwrapper: {
    width: Environment.FullBar,
  },
  headertext: {
    textAlign: "right",
    color: Colors.AccentOn,
    marginVertical: Environment.StandardPadding,
  },
  previewimage: {
    height: Environment.FullBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  touchablecontainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default VaultSectionHeader;
