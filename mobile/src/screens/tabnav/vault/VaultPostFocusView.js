import { View, Image, StyleSheet } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "expo-video-player";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import { ToPortrait } from "../../../resources/utilities";
import { Environment, Colors } from "../../../resources/project";
import ChangeFocusView from "./ChangeFocusView";
import ChangeLandscape from "./ChangeLandscape";

const ExitFocusView = ({ navigation, dispatch, listener }) => {
  ChangeFocusView({ dispatch, set: false });
  ToPortrait(), ScreenOrientation.removeOrientationChangeListener(listener);
  navigation.goBack();
  // ScreenOrientation.unlockAsync();
  // ToPortrait()
};

function VaultPostFocusView({ navigation, route }) {
  const dispatch = useDispatch();

  ScreenOrientation.unlockAsync();

  const index = useSelector((state) => state.vaultpostdata.activepost);
  const orientation = useSelector((state) => state.pageoptions.landscape);

  const feeddata = useSelector((state) => state.vaultpostdata.vaultfeeddata);
  const gallerydata = useSelector((state) => state.profilemain.gallerydata);
  const otherusergallerydata = useSelector(
    (state) => state.otheruserprofile.otherusergallerydata,
  );
  const storiesfullview = useSelector(
    (state) => state.homemain.storiesfullview,
  );
  const addedfeed = useSelector((state) => state.homemain.addedfeed);
  const publicfeed = useSelector((state) => state.homemain.publicfeed);

  const { usecase } = route.params;

  const listener = ScreenOrientation.addOrientationChangeListener((change) => {
    if (
      change.orientationInfo.orientation === 3
      || change.orientationInfo.orientation === 4
    ) {
      ChangeLandscape({ dispatch, set: true });
    } else {
      ChangeLandscape({ dispatch, set: false });
    }
  });

  const GetSignedUrl = () => {
    if (usecase === "vault") {
      return feeddata[index].signedurl;
    } if (usecase === "gallery") {
      return gallerydata[index].signedurl;
    } if (usecase === "otherusergallery") {
      return otherusergallerydata[index].signedurl;
    } if (usecase === "stories") {
      return storiesfullview[index].signedurl;
    } if (usecase === "addedfeed") {
      return addedfeed[index].signedurl;
    } if (usecase === "publicfeed") {
      return publicfeed[index].signedurl;
    }
  };

  const ActivePostType = () => {
    if (usecase === "vault") {
      return feeddata[index].contenttype;
    } if (usecase === "gallery") {
      return gallerydata[index].contenttype;
    } if (usecase === "otherusergallery") {
      return otherusergallerydata[index].contenttype;
    } if (usecase === "stories") {
      return storiesfullview[index].contenttype;
    } if (usecase === "addedfeed") {
      return addedfeed[index].contenttype;
    } if (usecase === "publicfeed") {
      return publicfeed[index].contenttype;
    }
  };

  if (ActivePostType() === "video") {
    return (
      <GestureRecognizer
        onSwipe={() => {
          ExitFocusView({ navigation, dispatch, listener });
        }}
        style={styles.gesturewrapper}
      >
        <View style={styles.container}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: { uri: GetSignedUrl() },
              useNativeControls: false,
            }}
            style={{
              height:
                orientation === true
                  ? Environment.ScreenWidth
                  : Environment.ScreenHeight,
              width:
                orientation === true
                  ? Environment.ScreenHeight
                  : Environment.ScreenWidth,
              controlsBackgroundColor: Colors.AccentOn,
            }}
            slider={{
              maximumTrackTintColor: Colors.AccentOn,
              minimumTrackTintColor: Colors.Primary,
              thumbTintColor: Colors.Primary,
              tapToSeek: true,
              style: {
                margin: Environment.LargePadding,
                padding: Environment.StandardPadding,
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
      </GestureRecognizer>
    );
  }
  return (
    <GestureRecognizer
      onSwipe={() => {
        ExitFocusView({ navigation, dispatch, listener });
      }}
      style={styles.gesturewrapper}
    >
      <View style={styles.container}>
        <Image
          style={styles.postimage}
          resizeMode="contain"
          source={{ uri: GetSignedUrl() }}
        />
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  gesturewrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  postimage: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

export default VaultPostFocusView;
