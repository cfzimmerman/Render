import { Image, TouchableOpacity, StyleSheet } from "react-native";

import { GlobalStyles, Environment } from "../../../resources/project";
import ExternalVaultTileInfo from "./ExternalVaultTileInfo";
import TransitionToFullView from "./TransitionToFullView";

const CorrectURI = ({ item }) => {
  if (item.contenttype === "video") {
    return item.thumbnailurl;
  } if (item.contenttype === "image") {
    return item.signedurl;
  }
};

function VaultSectionItem({
  item, navigation, vaultfeeddata, dispatch,
}) {
  const contenturl = CorrectURI({ item });

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.touchablecontainer]}
      onPress={() => TransitionToFullView({
        id: item.id,
        navigation,
        data: vaultfeeddata,
        dispatch,
        usecase: "vault",
      })}
    >
      <Image style={styles.previewimage} source={{ uri: contenturl }} />
      <ExternalVaultTileInfo item={item} origin="sectionitem" />
    </TouchableOpacity>
  );
}

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

export default VaultSectionItem;
