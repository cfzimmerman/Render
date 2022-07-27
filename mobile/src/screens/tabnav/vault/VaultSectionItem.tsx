import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  addSelectedPost,
  removeSelectedPost,
} from "../../../redux/homevault/homevaultmain";
import { DispatchType } from "../../../redux/store";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
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

interface VaultSectionItemPropTypes {
  item: PostType;
  navigation: any;
  vaultfeeddata: PostHeaderType[];
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
    // If multi select was and is not active, only rerender the item if the post data changes
    if (
      previousProps.item.contentkey === nextProps.item.contentkey &&
      previousProps.item.publicpost === nextProps.item.publicpost &&
      previousProps.item.posttext === nextProps.item.posttext
    ) {
      return true;
    }
    return false;
  } else {
    // The top part is separated because it is by-far the most likely to occur. The others only trigger if multi select is involved.
    // Multi select should not change any underlying post elements while active. It should only be used to set an array of selected posts which can be acted upon as a group (in an action performed while multi select is turned off again)
    const wasSelected: boolean = previousProps.selectedPosts.includes(
      previousProps.item.id
    );
    const isSelected: boolean = nextProps.selectedPosts.includes(
      nextProps.item.id
    );

    if (
      previousProps.multiSelectActive === true &&
      nextProps.multiSelectActive === false
    ) {
      // If multi select has been canceled, rerender the post if it was formerly selected (to remove selected UI elements)
      if (wasSelected === false) {
        return true;
      }
      return false;
    } else {
      // If multi select was and is active...
      // OR if multi-select has just been activated
      if (wasSelected === isSelected) {
        // If the post remains selected or remains unselected, the post should not be rerendered (the same === true)
        return true;
      }
      // If the post was either added or removed from the selected array, rerender
      return false;
    }
  }
};

const FindIsSelected = ({ item, multiSelectActive, selectedPosts }) => {
  // Only performing the .includes operation if multi select is active cuts out a huge number of unnecessary array operations
  if (multiSelectActive === false) {
    return false;
  } else {
    return selectedPosts.includes(item.id);
  }
};

const ShortPressAction = ({
  multiSelectActive,
  item,
  vaultfeeddata,
  navigation,
  isSelected,
  dispatch,
}) => {
  if (multiSelectActive === false) {
    TransitionToFullView({
      id: item.id,
      navigation,
      data: vaultfeeddata,
      usecase: "vault",
    });
  } else {
    if (isSelected === true) {
      dispatch(removeSelectedPost(item.id));
    } else {
      dispatch(addSelectedPost(item.id));
    }
  }
};

const LongPressAction = () => {
  console.log("Hey 😉");
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

  const isSelected = FindIsSelected({ item, multiSelectActive, selectedPosts });

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.touchablecontainer]}
      onPress={() =>
        ShortPressAction({
          multiSelectActive,
          item,
          vaultfeeddata,
          navigation,
          isSelected,
          dispatch,
        })
      }
      // onLongPress={() => (isSelected = true)}
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
