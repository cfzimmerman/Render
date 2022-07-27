import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
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
  // rerender if array id or item refrernces the currrent item
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

  const multiSelectActive = false;
  var isSelected = false;

  const ShortPressAction = () => {
    if (multiSelectActive === false) {
      TransitionToFullView({
        id: item.id,
        navigation,
        data: vaultfeeddata,
        usecase: "vault",
      });
    } else {
      if (isSelected === true) {
        isSelected = false;
      } else {
        isSelected = true;
      }
    }
  };

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.touchablecontainer]}
      onPress={ShortPressAction}
      onLongPress={() => (isSelected = true)}
    >
      <Image style={styles.previewimage} source={{ uri: contenturl }} />
      <ExternalVaultTileInfo item={item} origin="sectionitem" />
      <View
        style={[
          styles.checkedTileBackground,
          { opacity: isSelected ? 0.5 : 0 },
        ]}
      >
        <Icons.OriginalSize.Checkmark
          style={{ opacity: 1 }}
          stroke={Colors.Primary}
          height={3 * Environment.IconSize}
          width={3 * Environment.IconSize}
        />
      </View>
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
  checkedTileBackground: {
    backgroundColor: Colors.AccentOn,
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    position: "absolute",
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(VaultSectionItem, AreEqual);
