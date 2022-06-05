import {
  TouchableOpacity,
  View,
  Animated,
  Easing,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { setEditTextModalActive } from "../../../redux/plus/plusmain";
import { IsDarkMode } from "../../../resources/utilities";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import { BackArrow, CubeSizeButton } from "../../../resources/atoms";
import ChangePostPublic from "./ChangePostPublic";
import ChangeVaultPostDate from "../vault/ChangeVaultPostDate";
import PostPublic from "./PostPublic";

import {
  PostType,
  CurrentUserType,
  PostHeaderType,
} from "../../../resources/CommonTypes";
import { DispatchType } from "../../../redux/store";

const ShouldHighlight = ({ item }) => {
  if (
    typeof item.posttext === "undefined" ||
    item.posttext === null ||
    item.posttext.length === 0
  ) {
    return false;
  } else {
    return true;
  }
};

interface NewPublicPostPropsType {
  navigation: any;
  dispatch: DispatchType;
  item: PostType;
  currentuser: CurrentUserType;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  gallerydata: PostType[];
}

export interface PostOperationType {
  publicpost: boolean;
  publicpostdate: string;
}

export interface ChangePostPublicPropsType {
  postID: string;
  contentdate: string;
  postOperation: PostOperationType;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  dispatch: DispatchType;
}

const NewPublicPost = ({
  navigation,
  dispatch,
  item,
  currentuser,
  vaultpostdata,
  vaultfeeddata,
  gallerydata,
}: NewPublicPostPropsType) => {
  const isodate = new Date().toISOString();

  const truePostOperation: PostOperationType = {
    publicpost: true,
    publicpostdate: isodate,
  };

  navigation.navigate("TabNav", { screen: "HomeVault" }),
    PostPublic({ dispatch, item, currentuser, isodate, gallerydata }),
    ChangePostPublic({
      postID: item.id,
      contentdate: item.contentdate,
      postOperation: truePostOperation,
      vaultpostdata,
      vaultfeeddata,
      dispatch,
    });
};

interface EditOptionsModalPropsType {
  navigation: any;
  dispatch: DispatchType;
  item: PostType;
  currentuser: CurrentUserType;
  origin: "homevault" | "plus";
  newPostDateActive: boolean;
  setNewPostDateActive: any;
  vaultfeeddata: PostType[];
  vaultpostdata: PostHeaderType[];
  vaultnexttoken: string | null;
  gallerydata: PostType[];
}

const EditOptionsModal = ({
  navigation,
  dispatch,
  item,
  currentuser,
  origin,
  newPostDateActive,
  setNewPostDateActive,
  vaultfeeddata,
  vaultpostdata,
  vaultnexttoken,
  gallerydata,
}: EditOptionsModalPropsType) => {
  const HideModal = () => {
    setTimeout(() => {
      setNewPostDateActive(false);
    }, 200);
  };

  const DateSelected = (date: Date) => {
    HideModal();
    ChangeVaultPostDate({
      date,
      navigation,
      dispatch,
      item,
      vaultfeeddata,
      vaultpostdata,
      vaultnexttoken,
    });
  };

  let opacity = new Animated.Value(0);

  // Makes next button to confirm email visible
  const animatein = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  // Obscures button to confirm email
  const animateout = (easing) => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const primaryWidth = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [Environment.FullBar, 0],
  });

  const secondaryWidth = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Environment.FullBar],
  });

  const primaryAnimatedStyles = [
    styles.animatedfooter,
    GlobalStyles.irregularshadow,
    styles.primaryfooter,
    {
      width: primaryWidth,
    },
  ];

  const secondaryAnimatedStyles = [
    styles.animatedfooter,
    {
      width: secondaryWidth,
    },
  ];

  if (origin === "plus") {
    return (
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.animationwrapper} pointerEvents="box-none">
          <View style={styles.headerwrapper}>
            <View style={styles.animatedheader}>
              <BackArrow />
            </View>
          </View>
          <View style={styles.bottomtabcontainer}>
            <Animated.View style={primaryAnimatedStyles}>
              <CubeSizeButton
                Icon={Icons.OriginalSize.X}
                Action={() => {
                  navigation.goBack();
                }}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Edit}
                Action={() => animatein(Easing.ease)}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Checkmark}
                Action={() =>
                  NewPublicPost({
                    navigation,
                    dispatch,
                    item,
                    currentuser,
                    vaultpostdata,
                    vaultfeeddata,
                    gallerydata,
                  })
                }
                isactive={false}
              />
            </Animated.View>
            <Animated.View style={secondaryAnimatedStyles}>
              <View style={[GlobalStyles.shadow, styles.leftbuttonwrapper]}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.Edit}
                  Action={() => animateout(Easing.ease)}
                  isactive={true}
                />
              </View>
              <View style={[GlobalStyles.shadow, styles.rightbuttoncontainer]}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.Text}
                  Action={() => dispatch(setEditTextModalActive(true))}
                  isactive={ShouldHighlight({ item })}
                />
              </View>
            </Animated.View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={newPostDateActive}
          date={new Date(item.contentdate)}
          mode="date"
          onConfirm={DateSelected}
          onCancel={HideModal}
          display="spinner"
          isDarkModeEnabled={IsDarkMode()}
        />
      </SafeAreaView>
    );
  } else if (origin === "homevault") {
    return (
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.animationwrapper} pointerEvents="box-none">
          <View style={styles.headerwrapper}>
            <View style={styles.animatedheader}>
              <BackArrow />
            </View>
          </View>
          <View style={styles.bottomtabcontainer}>
            <Animated.View style={primaryAnimatedStyles}>
              <CubeSizeButton
                Icon={Icons.OriginalSize.Clock}
                Action={() => setNewPostDateActive(true)}
                isactive={false}
              />
              <CubeSizeButton
                Icon={Icons.OriginalSize.Text}
                Action={() => dispatch(setEditTextModalActive(true))}
                isactive={ShouldHighlight({ item })}
              />
            </Animated.View>

            {/* The view below isn't currently in use, but I'm leaving it for easy implementation later down the road (also helps maintain styling universality) */}
            <Animated.View style={secondaryAnimatedStyles}>
              <View style={[GlobalStyles.shadow, styles.leftbuttonwrapper]}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.Edit}
                  Action={() => animateout(Easing.ease)}
                  isactive={true}
                />
              </View>
              <View style={[GlobalStyles.shadow, styles.rightbuttoncontainer]}>
                <CubeSizeButton
                  Icon={Icons.OriginalSize.Text}
                  Action={() => dispatch(setEditTextModalActive(true))}
                  isactive={ShouldHighlight({ item })}
                />
              </View>
            </Animated.View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={newPostDateActive}
          date={new Date(item.contentdate)}
          mode="date"
          onConfirm={DateSelected}
          onCancel={HideModal}
          display="spinner"
          isDarkModeEnabled={IsDarkMode()}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    position: "absolute",
  },
  animationwrapper: {
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
    overflow: "hidden",
    // width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    // padding: Environment.StandardPadding,
    // paddingVertical: Environment.StandardPadding,
    flexDirection: "row",
  },
  primaryfooter: {
    backgroundColor: Colors.AccentFaint,
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerwrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: Environment.FullBar,
  },
  buttonoptionstyle: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.SmallRadius,
  },
  bottomtabcontainer: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftbuttonwrapper: {
    backgroundColor: Colors.AccentFaint,
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
  },
  rightbuttoncontainer: {
    backgroundColor: Colors.AccentFaint,
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardPadding,
    flexDirection: "row",
    marginLeft: Environment.StandardPadding,
  },
});

export default EditOptionsModal;
