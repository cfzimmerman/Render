import react, { useState } from "react";
import {
  View,
  Text,
  Easing,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import {
  setShareActive,
  setPostPublicModal,
} from "../../../redux/vault/vaultpostdata";
import { BackArrow, CubeSizeButton } from "../../../resources/atoms";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
  UserDialogue,
} from "../../../resources/project";
import ChangeFocusView from "./ChangeFocusView";
import PostShareModal from "./PostShareModal";
import { DispatchType, RootStateType } from "../../../redux/store";
import { VaultPostFullViewUsecaseTypes } from "./VaultPostFullView";
import GameCoverCubesizeButton from "../homevault/GameTags/GameCoverCubesizeButton";
import { PostType } from "../../../resources/CommonTypes";

import GetGameCoverThumbnailURL from "../homevault/GameTags/GetGameCoverThumbnailURL";
import { setGameInfoModal } from "../../../redux/homevault/homevaultmain";
import { setSystemmessageActive } from "../../../redux/system/messagemodal";

interface EnterCommentsPropTypes {
  index: number;
  usecase: VaultPostFullViewUsecaseTypes;
  navigation: any;
}

const EnterComments = ({
  index,
  usecase,
  navigation,
}: EnterCommentsPropTypes) => {
  // Usecases are explicitly checked as opposed to != "vault" to ensure we've correctly configured CommentsMain for every necessary case
  if (
    usecase === "gallery" ||
    usecase === "otherusergallery" ||
    usecase === "stories" ||
    usecase === "addedfeed" ||
    usecase === "publicfeed" ||
    usecase === "universal"
  ) {
    navigation.navigate("CommentsMain", { usecase, index });
  }
};

interface PostOptionsModalInput {
  navigation: any;
  dispatch: DispatchType;
  usecase: VaultPostFullViewUsecaseTypes;
  item: PostType;
  index: number;
}

const PostOptionsModal = ({
  navigation,
  dispatch,
  usecase,
  item,
  index,
}: PostOptionsModalInput) => {
  const postoptions = useSelector(
    (state: RootStateType) => state.vaultpostdata.options
  );

  const ActivateShare = ({ dispatch }) => {
    dispatch(setShareActive(true));
  };

  // if-else filters so only the current active post's options are displayed

  if (
    postoptions.postid != item.id ||
    typeof postoptions.postid === "undefined" ||
    typeof item.id === "undefined"
  ) {
    return null;
  }
  // Animation starts here
  // opacity is the name of the animated value. Perhaps a little confusing, but I just followed along the React Native docs, and that's what they used. Easier to follow along this way.
  const opacity = new Animated.Value(0);

  const animatein = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const animateout = (easing) => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const moreoptions = new Animated.Value(0);

  const animateoptionsin = (easing) => {
    moreoptions.setValue(0);
    Animated.timing(moreoptions, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const animateoptionsout = (easing) => {
    moreoptions.setValue(1);
    Animated.timing(moreoptions, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  // Calculates button transforming from size zero to a standard button size and back
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Environment.CubeSize + Environment.LargePadding],
  });

  const originalBarWidth = moreoptions.interpolate({
    inputRange: [0, 1],
    outputRange: [Environment.FullBar, 0],
  });

  const optionsBarWidth = moreoptions.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Environment.FullBar],
  });

  const animatedStyles = [
    styles.animatedcontainer,
    {
      opacity,
    },
  ];

  const animatedStylesHeader = [
    styles.animatedheader,
    {
      height: size,
    },
  ];

  const animatedStylesFooter = [
    styles.animatedfooter,
    {
      height: size,
    },
  ];

  const animatedStylesFooterMain = [
    GlobalStyles.irregularshadow,
    styles.animatedfootermain,
    {
      width: originalBarWidth,
    },
  ];

  const animatedStylesOptions = [
    GlobalStyles.shadow,
    styles.animatedoptions,
    {
      width: optionsBarWidth,
    },
  ];

  if (postoptions.active === false && postoptions.changestatus === true) {
    animateout(Easing.ease);
  } else if (postoptions.active === true && postoptions.changestatus === true) {
    animatein(Easing.ease);
  }

  if (usecase === "vault") {
    return (
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <Animated.View style={animatedStyles} pointerEvents="box-none">
          <View style={styles.profileheader}>
            <Animated.View style={animatedStylesHeader}>
              <BackArrow />
            </Animated.View>
            <Text style={[GlobalStyles.h4text, styles.displayname]}>
              {format(new Date(item.contentdate), "PP")}
            </Text>
          </View>

          <Animated.View style={animatedStylesFooter}>
            <Animated.View style={animatedStylesFooterMain}>
              <CubeSizeButton
                Icon={Icons.OriginalSize.Trash}
                Action={() => {
                  navigation.navigate("DeletePost", {
                    postid: postoptions.postid,
                  });
                }}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Edit}
                Action={() =>
                  navigation.navigate("EditPost", {
                    index,
                    origin: "homevault",
                  })
                }
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Download}
                Action={() => ActivateShare({ dispatch })}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.PlusIcon}
                Action={() => dispatch(setPostPublicModal(true))}
                isactive={item.publicpost}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.FullScreen}
                Action={() => {
                  ChangeFocusView({ dispatch, set: true }),
                    navigation.navigate("VaultPostFocusView", {
                      usecase: "vault",
                    });
                }}
                isactive={false}
              />
              {/* <ButtonOption Icon={Icons.OriginalSize.More} Action={() => animateoptionsin(Easing.ease)} /> */}
            </Animated.View>

            <Animated.View style={animatedStylesOptions}>
              <View style={styles.optionswrapper}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.More}
                  Action={() => animateoptionsout(Easing.ease)}
                  isactive
                />
              </View>
              <View style={[styles.optionswrapper, styles.secondaryoptions]}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.X}
                  Action={() => console.log("Pressed")}
                  isactive={false}
                />
                <CubeSizeButton
                  Icon={Icons.OriginalSize.X}
                  Action={() => console.log("Pressed")}
                  isactive={false}
                />
                <CubeSizeButton
                  Icon={Icons.OriginalSize.X}
                  Action={() => console.log("Pressed")}
                  isactive={false}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <PostShareModal dispatch={dispatch} item={item} />
      </SafeAreaView>
    );
  }
  if (usecase === "gallery" || usecase === "HVGameSearch") {
    return (
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <Animated.View style={animatedStyles} pointerEvents="box-none">
          <View style={styles.noprofileheader}>
            <Animated.View style={animatedStylesHeader}>
              <BackArrow />
            </Animated.View>
          </View>

          <Animated.View style={animatedStylesFooter}>
            <Animated.View style={animatedStylesFooterMain}>
              {/* <ButtonOption Icon={Icons.OriginalSize.VaultIcon} Action={() => { console.log('unpublish')}} /> */}
              <CubeSizeButton
                Icon={Icons.OriginalSize.PlusIcon}
                Action={() => dispatch(setPostPublicModal(true))}
                isactive={item.publicpost}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Download}
                Action={() => ActivateShare({ dispatch })}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Comment}
                Action={() => EnterComments({ index, navigation, usecase })}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.FullScreen}
                Action={() => {
                  ChangeFocusView({ dispatch, set: true }),
                    navigation.navigate("VaultPostFocusView", {
                      usecase: usecase,
                    });
                }}
                isactive={false}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <PostShareModal dispatch={dispatch} item={item} />
      </SafeAreaView>
    );
  }
  // Public post general view
  return (
    <SafeAreaView style={styles.container} pointerEvents="box-none">
      <Animated.View style={animatedStyles} pointerEvents="box-none">
        <View style={styles.profileheader}>
          <Animated.View style={animatedStylesHeader}>
            <BackArrow />
          </Animated.View>
          <TouchableOpacity onPress={() => console.log("Go to profile")}>
            <Text style={[GlobalStyles.h4text, styles.displayname]}>
              {item.displayname}
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={animatedStylesFooter}>
          <Animated.View style={animatedStylesFooterMain}>
            <GameCoverCubesizeButton
              imageURL={
                item.coverID === null
                  ? null
                  : GetGameCoverThumbnailURL({ coverID: item.coverID })
              }
              Action={() => {
                if (
                  typeof item.coverID === "string" &&
                  typeof item.title === "string"
                ) {
                  dispatch(
                    setGameInfoModal({
                      active: true,
                      gameID: item.gamesID,
                      title: item.title,
                      coverID: item.coverID,
                    })
                  );
                } else {
                  dispatch(
                    setSystemmessageActive(
                      UserDialogue().systemmessage.noGameTagged
                    )
                  );
                }
              }}
            />
            <CubeSizeButton
              Icon={Icons.OriginalSize.Comment}
              Action={() => EnterComments({ index, navigation, usecase })}
              isactive={false}
            />
            <CubeSizeButton
              Icon={Icons.OriginalSize.Download}
              Action={() => ActivateShare({ dispatch })}
              isactive={false}
            />
            <CubeSizeButton
              Icon={Icons.OriginalSize.FullScreen}
              Action={() => {
                ChangeFocusView({ dispatch, set: true }),
                  navigation.navigate("VaultPostFocusView", {
                    usecase,
                  });
              }}
              isactive={false}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <PostShareModal dispatch={dispatch} item={item} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    position: "absolute",
  },
  noprofileheader: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: Environment.FullBar,
  },
  profileheader: {
    flexDirection: "row",
    alignItems: "center",
    width: Environment.FullBar,
  },
  displayname: {
    color: Colors.AccentPartial,
    marginLeft: Environment.SmallPadding,
  },
  animatedcontainer: {
    width: Environment.ScreenWidth,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  animatedheader: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedfooter: {
    flexDirection: "row",
  },
  animatedfootermain: {
    overflow: "hidden",
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentFaint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: Environment.StandardPadding,
  },
  animatedoptions: {
    overflow: "hidden",
    flexDirection: "row",
  },
  buttonoptionwrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.SmallRadius,
    marginHorizontal: Environment.SmallPadding,
  },
  activebuttonoptionwrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    backgroundColor: Colors.AccentOn,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.SmallRadius,
    marginHorizontal: Environment.SmallPadding,
  },
  optionswrapper: {
    backgroundColor: Colors.AccentFaint,
    borderRadius: Environment.StandardRadius,
    paddingVertical: Environment.StandardPadding,
    paddingHorizontal: Environment.SmallPadding,
  },
  secondaryoptions: {
    marginLeft: Environment.StandardPadding,
    flexDirection: "row",
  },
});

export default PostOptionsModal;
