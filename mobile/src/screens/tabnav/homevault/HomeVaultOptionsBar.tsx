import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CubeSizeButton } from "../../../resources/atoms";
import { deactivateMultiSelect } from "../../../redux/homevault/homevaultmain";
import { RootStateType } from "../../../redux/store";
import { BlurView } from "expo-blur";
import {
  Colors,
  Environment,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import { useNavigation } from "@react-navigation/native";
import GameCoverCubesizeButton from "./GameTags/GameCoverCubesizeButton";

const AreEqual = (previousProps, nextProps) => {
  return true;
};

const StringCubesizeButton = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity>
      <View style={[styles.scbWrapper, GlobalStyles.shadow]}>
        <Text style={[GlobalStyles.h2text, styles.scbTitle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeVaultOptionsBar = () => {
  const multiSelectActive = useSelector(
    (state: RootStateType) => state.homevaultmain.multiSelectActive
  );
  const selectedPosts = useSelector(
    (state: RootStateType) => state.homevaultmain.selectedPosts
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (multiSelectActive === false) {
    return null;
  } else {
    return (
      <View style={styles.fullScreenContainer} pointerEvents={"box-none"}>
        <View style={[GlobalStyles.shadow, styles.shadowWrapper]}>
          <BlurView
            tint="default"
            style={styles.blurViewWrapper}
            intensity={60}
          >
            <StringCubesizeButton title={selectedPosts.length.toString()} />
            <View style={styles.buttonSpacer}>
              <CubeSizeButton
                isactive={false}
                Action={() => {
                  if (selectedPosts.length > 0) {
                    // @ts-ignore
                    navigation.navigate("PostMultiDelete");
                  }
                }}
                Icon={Icons.OriginalSize.Trash}
              />
            </View>

            <View style={styles.bottomMargin}>
              <CubeSizeButton
                isactive={false}
                Action={() => dispatch(deactivateMultiSelect())}
                Icon={Icons.OriginalSize.X}
              />
            </View>

            <GameCoverCubesizeButton
              imageURL={null}
              Action={() => console.log("Hello bruv")}
            />
          </BlurView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
  },
  shadowWrapper: {
    marginRight: Environment.SmallPadding,
    borderRadius: Environment.StandardRadius,
    backgroundColor:
      Platform.OS === "android" ? Colors.AccentPartial : "transparent",
  },
  blurViewWrapper: {
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    overflow: "hidden",
  },
  buttonSpacer: {
    marginTop: Environment.LargePadding,
    marginBottom: Environment.StandardPadding,
  },
  bottomMargin: {
    marginBottom: Environment.StandardPadding,
  },
  scbWrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOn,
    alignItems: "center",
    justifyContent: "center",
  },
  scbTitle: {
    color: Colors.Primary,
  },
});

// export default HomeVaultOptionsBar;
export default React.memo(HomeVaultOptionsBar, AreEqual);
