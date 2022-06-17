import react, { useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "expo-video-player";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import { ToPortrait } from "../../../resources/utilities";
import { Environment, Colors } from "../../../resources/project";
import ChangeFocusView from "./ChangeFocusView";
import ChangeLandscape from "./ChangeLandscape";

import GestureHandler, {
  PinchGestureHandler,
} from "react-native-gesture-handler";

const ExitFocusView = ({ navigation, dispatch, listener }) => {
  ChangeFocusView({ dispatch, set: false });
  ToPortrait(), ScreenOrientation.removeOrientationChangeListener(listener);
  navigation.goBack();
  ScreenOrientation.unlockAsync();
  // ToPortrait();
};

const VaultPostFocusView = ({ navigation, route }) => {
  const dispatch = useDispatch();

  ScreenOrientation.unlockAsync();

  const index = useSelector((state) => state.vaultpostdata.activepost);
  const orientation = useSelector((state) => state.pageoptions.landscape);

  const feeddata = useSelector((state) => state.vaultpostdata.vaultfeeddata);
  const gallerydata = useSelector((state) => state.profilemain.gallerydata);
  const otherusergallerydata = useSelector(
    (state) => state.otheruserprofile.otherusergallerydata
  );
  const storiesfullview = useSelector(
    (state) => state.homemain.storiesfullview
  );
  const addedfeed = useSelector((state) => state.homemain.addedfeed);
  const publicfeed = useSelector((state) => state.homemain.publicfeed);

  const { usecase } = route.params;

  const listener = ScreenOrientation.addOrientationChangeListener((change) => {
    if (
      change.orientationInfo.orientation === 3 ||
      change.orientationInfo.orientation === 4
    ) {
      ChangeLandscape({ dispatch, set: true });
    } else {
      ChangeLandscape({ dispatch, set: false });
    }
  });

  let scale = new Animated.Value(1);
  const pan = useRef(new Animated.ValueXY()).current;

  const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: false,
  });

  /*
  const onPinchEventBegan = () => {
    console.log("Nice");
  };
  */

  const onPinchStateChange = (event) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 1,
    }).start();

    Animated.spring(
      pan, // Auto-multiplexed
      {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      } // Back to zero
    ).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
  });

  const GetSignedUrl = () => {
    if (usecase === "vault") {
      return feeddata[index].signedurl;
    }
    if (usecase === "gallery") {
      return gallerydata[index].signedurl;
    }
    if (usecase === "otherusergallery") {
      return otherusergallerydata[index].signedurl;
    }
    if (usecase === "stories") {
      return storiesfullview[index].signedurl;
    }
    if (usecase === "addedfeed") {
      return addedfeed[index].signedurl;
    }
    if (usecase === "publicfeed") {
      return publicfeed[index].signedurl;
    }
  };

  // If the user goes super sayan speed mode through posts, sometimes the index doesn't update fast enough. So, the goBack() checks send the user back to fullview to prevent an "TypeError undefined" error
  const ActivePostType = () => {
    if (usecase === "vault") {
      if (typeof feeddata[index] != "undefined") {
        return feeddata[index].contenttype;
      } else {
        return navigation.goBack();
      }
    } else if (usecase === "gallery") {
      if (typeof gallerydata[index] != "undefined") {
        return gallerydata[index].contenttype;
      } else {
        return navigation.goBack();
      }
    } else if (usecase === "otherusergallery") {
      if (typeof otherusergallerydata[index] != "undefined") {
        return otherusergallerydata[index].contenttype;
      } else {
        return navigation.goBack();
      }
    } else if (usecase === "stories") {
      if (typeof storiesfullview[index] != "undefined") {
        return storiesfullview[index].contenttype;
      } else {
        return navigation.goBack();
      }
    } else if (usecase === "addedfeed") {
      if (typeof addedfeed[index] != "undefined") {
        return addedfeed[index].contenttype;
      } else {
        return navigation.goBack();
      }
    } else if (usecase === "publicfeed") {
      if (typeof publicfeed[index] != "undefined") {
        return publicfeed[index].contenttype;
      } else {
        return navigation.goBack();
      }
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
      onSwipeDown={() => {
        ExitFocusView({ navigation, dispatch, listener });
      }}
      onSwipeUp={() => {
        ExitFocusView({ navigation, dispatch, listener });
      }}
      style={styles.gesturewrapper}
    >
      <View style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
          // onBegan={onPinchEventBegan}
        >
          <Animated.Image
            {...panResponder.panHandlers}
            style={[
              //styles.postimage,
              pan.getLayout(),
              {
                transform: [{ scale: scale }],
                height:
                  orientation === true
                    ? Environment.ScreenWidth
                    : Environment.ScreenHeight,
                width:
                  orientation === true
                    ? Environment.ScreenHeight
                    : Environment.ScreenWidth,
              },
            ]}
            resizeMode="contain"
            source={{ uri: GetSignedUrl() }}
          />
        </PinchGestureHandler>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gesturewrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  postimage: {
    flex: 1,
  },
});

export default VaultPostFocusView;
