import react, { useRef, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import VideoPlayer from "expo-video-player";
import TouchableScale from "react-native-touchable-scale";
import GestureRecognizer from "react-native-swipe-gestures";

import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { setTextActive } from "../../../redux/vault/vaultpostdata";
import { ToPortrait, GetPostDimensions } from "../../../resources/utilities";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";

import AddVideoToAddedFeed from "../home/AddVideoToAddedFeed";
import AddVideoToFeedData from "./AddVideoToFeedData";
import AddVideoToGalleryData from "../profile/AddVideoToGalleryData";
import AddVideoToOtherUserGallery from "../explore/AddVideoToOtherUserGallery";
import AddVideoToPublicFeed from "../home/AddVideoToPublicFeed";
import AddVideoToStories from "../home/AddVideoToStories";
import PostOptionsModal from "./PostOptionsModal";
import PostTextModal from "./PostTextModal";
import SetOptions from "./SetOptions";
import VaultPostPublicModal from "../plus/VaultPostPublicModal";

// SetOptions({ postid: xxx, animateactive: true, animateinactive: false, newchangestatus: false, })

function PostTextModalButton({
  dispatch, item, dimensions, index,
}) {
  if (
    typeof item.posttext === "undefined"
    || item.posttext === null
    || item.posttext.length === 0
  ) {
    return null;
  }
  return (
    <View style={[styles.textbuttonwrapper, { width: dimensions.width }]}>
      <TouchableOpacity onPress={() => dispatch(setTextActive(true))}>
        <View style={[GlobalStyles.shadow, styles.textbutton]}>
          <Icons.OriginalSize.Text
            stroke={Colors.AccentPartial}
            height={Environment.IconSize}
            width={Environment.IconSize}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function PostModalFilter({
  index,
  postindex,
  item,
  dispatch,
  navigation,
  usecase,
}) {
  if (index != postindex) {
    return null;
  }
  return (
    <View>
      <PostTextModal dispatch={dispatch} item={item} index={index} />
      <VaultPostPublicModal
        dispatch={dispatch}
        item={item}
        navigation={navigation}
        origin={usecase}
      />
    </View>
  );
}

function FullViewContent({
  item, index, dispatch, navigation, usecase,
}) {
  const dimensions = GetPostDimensions(item.aspectratio);
  const optionstatus = useSelector((state) => state.vaultpostdata.options);
  const textactive = useSelector((state) => state.vaultpostdata.textactive);
  const postindex = useSelector((state) => state.vaultpostdata.activepost);

  if (item.contenttype === "video") {
    if (item.signedurl === null) {
      if (usecase === "vault") {
        AddVideoToFeedData({
          dispatch,
          index,
          contentkey: item.contentkey,
        });
      } else if (usecase === "gallery") {
        AddVideoToGalleryData({
          dispatch,
          index,
          contentkey: item.contentkey,
        });
      } else if (usecase === "otherusergallery") {
        AddVideoToOtherUserGallery({
          dispatch,
          index,
          contentkey: item.contentkey,
        });
      } else if (usecase === "stories") {
        AddVideoToStories({
          dispatch,
          index,
          contentkey: item.contentkey,
        });
      } else if (usecase === "addedfeed") {
        AddVideoToAddedFeed({
          dispatch,
          index,
          contentkey: item.contentkey,
        });
      } else if (usecase === "publicfeed") {
        AddVideoToPublicFeed({ dispatch, index, contentkey: item.contentkey });
      }
    }

    const activepost = useSelector((state) => state.vaultpostdata.activepost);
    const focusview = useSelector((state) => state.vaultpostdata.focusview);

    const PlayVideo = () => {
      const isfocused = useIsFocused();

      if (activepost === index && focusview === false && isfocused === true) {
        return true;
      }
      return false;
    };

    return (
      <GestureRecognizer
        onSwipeDown={() => {
          ToPortrait(), navigation.goBack();
        }}
        onSwipeLeft={() => SetOptions({
          shouldshowoptions: false,
          optionstatus,
          dispatch,
          postid: item.id,
        })}
        onSwipeRight={() => SetOptions({
          shouldshowoptions: false,
          optionstatus,
          dispatch,
          postid: item.id,
        })}
      >
        <TouchableWithoutFeedback
          onPress={() => SetOptions({
            shouldshowoptions: true,
            optionstatus,
            dispatch,
            postid: item.id,
          })}
        >
          <View style={styles.container}>
            <Image
              source={{ uri: item.thumbnailurl }}
              style={[StyleSheet.absoluteFill, styles.backgroundimage]}
              blurRadius={Environment.BlurRadius}
            />
            {/* <BlurView intensity={80} tint={'dark'}  style={StyleSheet.absoluteFill} /> */}

            <SafeAreaView>
              <View style={GlobalStyles.shadow}>
                <View style={styles.videoplayerwrapper}>
                  <VideoPlayer
                    videoProps={{
                      shouldPlay: PlayVideo(),
                      resizeMode: Video.RESIZE_MODE_COVER,
                      source: { uri: item.signedurl },
                      useNativeControls: false,
                    }}
                    style={{
                      height: dimensions.height,
                      width: dimensions.width,
                      borderRadius: Environment.StandardRadius,
                      controlsBackgroundColor: Colors.AccentOn,
                    }}
                    slider={{
                      maximumTrackTintColor: Colors.AccentOn,
                      minimumTrackTintColor: Colors.Primary,
                      thumbTintColor: Colors.Primary,
                      tapToSeek: true,
                      style: {
                        height: Environment.LargePadding * 2,
                      },
                    }}
                    textStyle={{
                      color: Colors.Primary,
                      fontFamily: "Inter_500Medium",
                    }}
                    icon={{
                      color: Colors.Primary,
                    }}
                    fullscreen={{
                      visible: false,
                    }}
                  />
                </View>
              </View>
              <PostTextModalButton
                dispatch={dispatch}
                item={item}
                dimensions={dimensions}
              />
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
        <PostOptionsModal
          navigation={navigation}
          dispatch={dispatch}
          usecase={usecase}
          item={item}
          index={index}
        />
        <PostModalFilter
          index={index}
          postindex={postindex}
          dispatch={dispatch}
          item={item}
          navigation={navigation}
          usecase={usecase}
        />
      </GestureRecognizer>
    );
  }
  return (
    <GestureRecognizer
      onSwipeDown={() => {
        if (textactive === false) {
          ToPortrait(), navigation.goBack();
        }
      }}
      onSwipeLeft={() => SetOptions({
        shouldshowoptions: false,
        optionstatus,
        dispatch,
        postid: item.id,
      })}
      onSwipeRight={() => SetOptions({
        shouldshowoptions: false,
        optionstatus,
        dispatch,
        postid: item.id,
      })}
    >
      <TouchableWithoutFeedback
        onPress={() => SetOptions({
          shouldshowoptions: true,
          optionstatus,
          dispatch,
          postid: item.id,
        })}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.signedurl }}
            style={[StyleSheet.absoluteFill, styles.backgroundimage]}
            blurRadius={Environment.BlurRadius}
          />
          {/* <BlurView intensity={80} tint={'dark'}  style={StyleSheet.absoluteFill} /> */}

          <SafeAreaView>
            <TouchableScale
              tension={250}
              friction={25}
              delayPressIn={750}
              onPress={() => SetOptions({
                shouldshowoptions: true,
                optionstatus,
                dispatch,
                postid: item.id,
              })}
              onLongPress={() => {
                console.log("LongPress");
              }}
            >
              <View
                style={[GlobalStyles.shadow, { backgroundColor: "black" }]}
              >
                <Image
                    style={[
                      styles.postimage,
                      { height: dimensions.height, width: dimensions.width },
                    ]}
                    source={{ uri: item.signedurl }}
                  />
              </View>
            </TouchableScale>

            <PostTextModalButton
              dispatch={dispatch}
              item={item}
              dimensions={dimensions}
            />
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
      <PostOptionsModal
        navigation={navigation}
        dispatch={dispatch}
        usecase={usecase}
        item={item}
        index={index}
      />
      <PostModalFilter
        index={index}
        postindex={postindex}
        dispatch={dispatch}
        item={item}
        navigation={navigation}
        usecase={usecase}
      />
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Environment.ScreenWidth,
    overflow: "hidden",
  },
  backgroundimage: {
    resizeMode: "cover",
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    opacity: Environment.BackgroundOpacity,
  },
  videoplayerwrapper: {
    borderRadius: Environment.StandardRadius,
    overflow: "hidden",
  },
  postimage: {
    borderRadius: Environment.StandardRadius,
  },
  textbuttonwrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textbutton: {
    padding: Environment.SmallPadding,
    backgroundColor: Colors.Primary90,
    marginTop: Environment.StandardPadding,
    borderRadius: Environment.SmallRadius,
  },
});

export default FullViewContent;