import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalStyles, Environment } from "../../../resources/project";
import ExternalVaultTileInfo from "./ExternalVaultTileInfo";
import TransitionToFullView from "./TransitionToFullView";

const CorrectURI = ({ item }) => {
  if (item.contenttype === "video") {
    return item.thumbnailurl;
  }
  if (item.contenttype === "image") {
    return item.signedurl;
  }
};

const AreEqual = (previousProps, nextProps) => {
  if (
    previousProps.item.contentkey === nextProps.item.contentkey &&
    previousProps.item.publicpost === nextProps.item.publicpost &&
    previousProps.item.posttext === nextProps.item.posttext
  ) {
    return true;
  }
  return false;
};

const VaultSectionItem = ({ item, navigation, vaultfeeddata }) => {
  // SectionItem is getting a version of vaultfeeddata with one fewer items than needed, pushing transitiontofullview to spit out value not found and navigating to the beginning of the array
  const contenturl = CorrectURI({ item });

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.touchablecontainer]}
      onPress={() => {
        TransitionToFullView({
          id: item.id,
          navigation,
          data: vaultfeeddata,
          usecase: "vault",
        });
      }}
    >
      <Image style={styles.previewimage} source={{ uri: contenturl }} />
      <ExternalVaultTileInfo item={item} origin="sectionitem" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previewimage: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
  },
  touchablecontainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default React.memo(VaultSectionItem, AreEqual);
