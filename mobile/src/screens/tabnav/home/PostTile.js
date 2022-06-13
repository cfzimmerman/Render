import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { GetPostDimensions } from "../../../resources/utilities";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import PostTextDisplay from "../social/PostTextDisplay";

const EnterFullView = ({ navigation, index, selectedfeed }) => {
  navigation.navigate("VaultPostFullView", {
    startindex: index,
    usecase: selectedfeed,
  });
};

const PostContent = ({ item, newHeight, navigation, index, selectedfeed }) => {
  if (item.contenttype === "image") {
    return (
      <TouchableOpacity
        onPress={() => EnterFullView({ navigation, index, selectedfeed })}
      >
        <View style={GlobalStyles.shadow}>
          <Image
            source={{ uri: item.signedurl }}
            style={[styles.postimage, { height: newHeight }]}
          />
        </View>
      </TouchableOpacity>
    );
  }
  if (item.contenttype === "video") {
    return (
      <View style={GlobalStyles.shadow}>
        <TouchableOpacity
          onPress={() => EnterFullView({ navigation, index, selectedfeed })}
        >
          <View style={[styles.playvideooverlay, { height: newHeight }]}>
            <TouchableOpacity
              onPress={() => EnterFullView({ navigation, index, selectedfeed })}
            >
              <View style={[GlobalStyles.shadow, styles.playiconwrapper]}>
                <Icons.OriginalSize.Play
                  height={Environment.CubeSize}
                  width={Environment.CubeSize}
                  stroke={Colors.Accent90}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: item.thumbnailurl }}
            style={[styles.videopreview, { height: newHeight }]}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const AreEqual = (previousProps, nextProps) => {
  if (
    previousProps.item.contentkey === nextProps.item.contentkey &&
    previousProps.selectedfeed === nextProps.selectedfeed
  ) {
    return true;
  }
  return false;
};

const PostTile = ({
  item,
  index,
  dispatch,
  navigation,
  addedfeed,
  selectedfeed,
}) => {
  const postDimensions = GetPostDimensions(item.aspectratio);

  const DisplaySize = () => {
    if (postDimensions.comp === "standard") {
      return postDimensions.height;
    }
    if (postDimensions.comp === "oversize") {
      return Environment.FullBar;
    }
  };

  const newHeight = DisplaySize();

  return (
    <View style={styles.tilewrapper}>
      <View style={styles.headerwrapper}>
        <TouchableOpacity>
          <Text
            style={[
              GlobalStyles.h4text,
              GlobalStyles.shadow,
              styles.displayname,
            ]}
          >
            {item.displayname}
          </Text>
        </TouchableOpacity>
      </View>

      <PostContent
        item={item}
        newHeight={newHeight}
        dispatch={dispatch}
        navigation={navigation}
        index={index}
        addedfeed={addedfeed}
        selectedfeed={selectedfeed}
      />
      <PostTextDisplay
        item={item}
        Action={() => EnterFullView({ navigation, index, selectedfeed })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tilewrapper: {
    marginTop: Environment.StandardPadding,
  },
  headerwrapper: {
    marginVertical: Environment.SmallPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  displayname: {
    color: Colors.AccentPartial,
  },
  postimage: {
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  playvideooverlay: {
    position: "absolute",
    width: Environment.FullBar,
    zIndex: 1,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  playiconwrapper: {
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary90,
    borderRadius: Environment.StandardRadius,
  },
  videopreview: {
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  textwrapper: {
    width: Environment.FullBar,
    padding: Environment.StandardPadding,
    marginTop: Environment.SmallPadding,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  posttextstyle: {
    color: Colors.AccentOn,
  },
});

export default React.memo(PostTile, AreEqual);

// export default PostTile;
// export default React.memo(PostTile, AreEqual);
