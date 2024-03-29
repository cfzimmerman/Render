import react, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "expo-video-player";
import { BlurView } from "expo-blur";
import TouchableScale from "react-native-touchable-scale";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import GestureRecognizer from "react-native-swipe-gestures";
import GetPostDimensions from "../../shared/general/operations/GetPostDimensions";
import { Environment, Colors, GlobalStyles } from "../../../global";

import AddVideoToFeedData from "../../home_vault/operations/AddVideoToFeedData";
import EditOptionsModal from "../../shared/edit_content/components/EditOptionsModal";
import EditTextModal from "../../shared/edit_content/components/EditTextModal";
import { RootStateType } from "../../../redux";
import { PostType } from "../../../global/CommonTypes";

const EditPost = ({ route, navigation }) => {
  const [newPostDateActive, setNewPostDateActive] = useState(false);

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const publicfeeddata = useSelector(
    (state: RootStateType) => state.homemain.publicfeed
  );
  const edittextmodalactive = useSelector(
    (state: RootStateType) => state.plusmain.edittextmodalactive
  );
  const gallerydata = useSelector(
    (state: RootStateType) => state.profilemain.gallerydata
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );

  const dispatch = useDispatch();

  const { index } = route.params;
  const { origin } = route.params;

  const item: PostType = vaultfeeddata[index];

  if (typeof item === "undefined" || typeof item.aspectratio === "undefined") {
    return null;
  }
  const dimensions = GetPostDimensions(item.aspectratio);

  if (item.contenttype === "video") {
    if (item.signedurl === null) {
      AddVideoToFeedData({
        dispatch,
        index,
        contentkey: item.contentkey,
        localLibrary,
        syncPreference: localConfig.syncPreference,
      });
    }

    return (
      <GestureRecognizer
        style={styles.gesturewrapper}
        onSwipeDown={() => {
          if (edittextmodalactive != true) {
            navigation.goBack();
          }
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.thumbnailurl }}
            style={[StyleSheet.absoluteFill, styles.backgroundimage]}
            blurRadius={Environment.BlurRadius}
          />
          {/* <BlurView intensity={80} tint={'dark'}  style={StyleSheet.absoluteFill} /> */}

          <SafeAreaView>
            <View style={[GlobalStyles.shadow]}>
              <View style={styles.videowrapper}>
                <VideoPlayer
                  videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_COVER,
                    source: { uri: item.signedurl },
                    useNativeControls: false,
                  }}
                  style={{
                    height: dimensions.height,
                    width: dimensions.width,
                    // @ts-ignore
                    borderRadius: Environment.StandardRadius,
                    controlsBackgroundColor: Colors.AccentOn,
                  }}
                  slider={{
                    maximumTrackTintColor: Colors.AccentOn,
                    minimumTrackTintColor: Colors.Primary,
                    thumbTintColor: Colors.Primary,
                    tapToSeek: true,
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
          </SafeAreaView>

          <EditOptionsModal
            navigation={navigation}
            dispatch={dispatch}
            item={item}
            currentuser={currentuser}
            origin={origin}
            newPostDateActive={newPostDateActive}
            setNewPostDateActive={setNewPostDateActive}
            vaultfeeddata={vaultfeeddata}
            vaultpostdata={vaultpostdata}
            vaultnexttoken={vaultnexttoken}
            gallerydata={gallerydata}
            publicfeeddata={publicfeeddata}
          />
        </View>
        <EditTextModal
          dispatch={dispatch}
          item={item}
          vaultpostdata={vaultpostdata}
          vaultfeeddata={vaultfeeddata}
        />
      </GestureRecognizer>
    );
  }
  if (item.contenttype === "image") {
    return (
      <GestureRecognizer
        style={styles.gesturewrapper}
        onSwipeDown={() => {
          if (edittextmodalactive != true) {
            navigation.goBack();
          }
        }}
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
              onPress={() => console.log("pressed")}
            >
              <View style={GlobalStyles.shadow}>
                <Image
                  style={[
                    styles.imagestyle,
                    { height: dimensions.height, width: dimensions.width },
                  ]}
                  source={{ uri: item.signedurl }}
                />
              </View>
            </TouchableScale>
          </SafeAreaView>
          <EditOptionsModal
            navigation={navigation}
            dispatch={dispatch}
            item={item}
            currentuser={currentuser}
            origin={origin}
            newPostDateActive={newPostDateActive}
            setNewPostDateActive={setNewPostDateActive}
            vaultfeeddata={vaultfeeddata}
            vaultpostdata={vaultpostdata}
            vaultnexttoken={vaultnexttoken}
            gallerydata={gallerydata}
            publicfeeddata={publicfeeddata}
          />
        </View>
        <EditTextModal
          dispatch={dispatch}
          item={item}
          vaultpostdata={vaultpostdata}
          vaultfeeddata={vaultfeeddata}
        />
      </GestureRecognizer>
    );
  }
};

const styles = StyleSheet.create({
  gesturewrapper: {
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Environment.ScreenWidth,
    overflow: "hidden",
    backgroundColor: Colors.Background,
  },
  backgroundimage: {
    resizeMode: "cover",
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    opacity: Environment.BackgroundOpacity,
  },
  videowrapper: {
    borderRadius: Environment.StandardRadius,
    overflow: "hidden",
  },
  imagestyle: {
    borderRadius: Environment.StandardRadius,
  },
});

export default EditPost;
