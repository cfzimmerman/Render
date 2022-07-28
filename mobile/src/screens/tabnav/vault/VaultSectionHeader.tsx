import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import ExternalVaultTileInfo from "./ExternalVaultTileInfo";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
import TransitionToFullView from "./TransitionToFullView";
import { DispatchType } from "../../../redux/store";
import {
  FindIsSelected,
  LongPressAction,
  ShortPressAction,
} from "../homevault/SectionGridItemActions";

const CorrectURI = ({ contenttype, section }) => {
  if (contenttype === "video") {
    return section.header.post.thumbnailurl;
  }
  if (contenttype === "image") {
    return section.header.post.signedurl;
  }
};

interface VaultSecttionHeaderPropsType {
  section: PostHeaderType;
  navigation: any;
  vaultfeeddata: PostType[];
  selectedPosts: string[];
  multiSelectActive: boolean;
  dispatch: DispatchType;
}

/*
const AreEqual = (previousProps, nextProps) => {
  if (
    previousProps.section.header.post.contentkey ===
      nextProps.section.header.post.contentkey &&
    previousProps.section.header.post.publicpost ===
      nextProps.section.header.post.publicpost &&
    previousProps.section.header.post.posttext ===
      nextProps.section.header.post.posttext
  ) {
    return true;
  }
  return false;
};
*/

const AreEqual = (
  previousProps: VaultSecttionHeaderPropsType,
  nextProps: VaultSecttionHeaderPropsType
) => {
  // This might be confusing. Be sure to note that returning false rerenders the post.
  const previousHeaderPost = previousProps.section.header.post;
  const nextHeaderPost = nextProps.section.header.post;
  if (
    previousProps.multiSelectActive === false &&
    nextProps.multiSelectActive === false
  ) {
    // If multi select was and is not active, only rerender the item if the post data changes. This covers the vast majority of cases
    if (
      previousHeaderPost.contentkey === nextHeaderPost.contentkey &&
      previousHeaderPost.publicpost === nextHeaderPost.publicpost &&
      previousHeaderPost.posttext === nextHeaderPost.posttext
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
      previousHeaderPost.id
    );
    const isSelected: boolean = nextProps.selectedPosts.includes(
      nextHeaderPost.id
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

const VaultSectionHeader = ({
  section,
  navigation,
  vaultfeeddata,
  selectedPosts,
  multiSelectActive,
  dispatch,
}: VaultSecttionHeaderPropsType) => {
  const contenturl = CorrectURI({
    contenttype: section.header.post.contenttype,
    section,
  });

  const isSelected = FindIsSelected({
    postID: section.header.post.id,
    multiSelectActive,
    selectedPosts,
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerwrapper}>
        <Text style={[GlobalStyles.h4text, styles.headertext]}>
          {section.header.title}
        </Text>
        <TouchableOpacity
          style={[GlobalStyles.shadow, styles.touchablecontainer]}
          onPress={() =>
            ShortPressAction({
              multiSelectActive,
              vaultfeeddata,
              navigation,
              isSelected,
              postID: section.header.post.id,
              dispatch,
            })
          }
          onLongPress={() => {
            LongPressAction({
              dispatch,
              multiSelectActive,
              postID: section.header.post.id,
            });
          }}
        >
          <Image style={styles.previewimage} source={{ uri: contenturl }} />
          <ExternalVaultTileInfo
            item={section.header.post}
            origin="sectionheader"
          />
          <View
            style={[
              styles.checkedTileBackground,
              { opacity: isSelected ? 0.5 : 0 },
            ]}
          >
            <Icons.OriginalSize.Checkmark
              style={styles.checkmarkStyle}
              stroke={Colors.Primary}
              height={6 * Environment.IconSize}
              width={6 * Environment.IconSize}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  checkedTileBackground: {
    backgroundColor: Colors.AccentOn,
    height: Environment.FullBar,
    width: Environment.FullBar,
    position: "absolute",
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkStyle: {
    opacity: 1,
  },
});

export default React.memo(VaultSectionHeader, AreEqual);
