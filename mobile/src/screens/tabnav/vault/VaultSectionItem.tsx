import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  ShortPressAction,
  LongPressAction,
  FindIsSelected,
} from "../homevault/SectionGridItemActions";
import { DispatchType } from "../../../redux/store";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import ExternalVaultTileInfo from "./ExternalVaultTileInfo";

const CorrectURI = ({ item }) => {
  if (item.contenttype === "video") {
    return item.thumbnailurl;
  }
  if (item.contenttype === "image") {
    return item.signedurl;
  }
};

interface VaultSectionItemPropTypes {
  item: PostType;
  navigation: any;
  vaultfeeddata: PostType[];
  multiSelectActive: boolean;
  selectedPosts: string[];
  dispatch: DispatchType;
}

const AreEqual = (
  previousProps: VaultSectionItemPropTypes,
  nextProps: VaultSectionItemPropTypes
) => {
  // This might be confusing. Be sure to note that returning false rerenders the post.
  if (
    previousProps.multiSelectActive === false &&
    nextProps.multiSelectActive === false
  ) {
    // If multi select was and is not active, only rerender the item if the post data changes. This covers the vast majority of cases
    if (
      previousProps.item.contentkey === nextProps.item.contentkey &&
      previousProps.item.publicpost === nextProps.item.publicpost &&
      previousProps.item.posttext === nextProps.item.posttext
    ) {
      return true;
    }
    return false;
  } else if (
    previousProps.multiSelectActive === true &&
    nextProps.multiSelectActive === true
  ) {
    // If multi select was and is active...
    // Multi select should not change any underlying post elements while active. It should only be used to set an array of selected posts which can be acted upon as a group (in an action performed while multi select is turned off again)
    const wasSelected: boolean = previousProps.selectedPosts.includes(
      previousProps.item.id
    );
    const isSelected: boolean = nextProps.selectedPosts.includes(
      nextProps.item.id
    );

    if (wasSelected === isSelected) {
      // If the post remains selected or remains unselected, the post should not be rerendered (the same === true)
      return true;
    }
    // If the post was either added or removed from the selected array, rerender
    return false;
  } else if (previousProps.multiSelectActive != nextProps.multiSelectActive) {
    // This could logically be left to just a concluding return, but I'm leaving it as a catch for errors in my logic and for greater clarity
    // If multi-select changes, the purpose of an onPress event changes. When inactive, enter post fullview. When active, select post. Rerendering passes a new multiSelectActive prop, enabling this
    return false;
  }
};

const VaultSectionItem = ({
  item,
  navigation,
  vaultfeeddata,
  multiSelectActive,
  selectedPosts,
  dispatch,
}: VaultSectionItemPropTypes) => {
  // SectionItem is getting a version of vaultfeeddata with one fewer items than needed, pushing transitiontofullview to spit out value not found and navigating to the beginning of the array
  const contenturl = CorrectURI({ item });

  const isSelected = FindIsSelected({
    postID: item.id,
    multiSelectActive,
    selectedPosts,
  });

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.touchablecontainer]}
      onPress={() =>
        ShortPressAction({
          multiSelectActive,
          postID: item.id,
          vaultfeeddata,
          navigation,
          isSelected,
          dispatch,
          selectedPostsLength: selectedPosts.length,
        })
      }
      onLongPress={() =>
        LongPressAction({ dispatch, multiSelectActive, postID: item.id })
      }
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
          style={styles.checkmarkStyle}
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
  checkmarkStyle: {
    opacity: 1,
  },
});

export default React.memo(VaultSectionItem, AreEqual);
