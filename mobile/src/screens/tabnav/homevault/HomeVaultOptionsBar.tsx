import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

const AreEqual = (previousProps, nextProps) => {
  return true;
};

const StringCubesizeButton = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity>
      <View
        style={[
          {
            height: Environment.CubeSize,
            width: Environment.CubeSize,
            borderRadius: Environment.StandardRadius,
            backgroundColor: Colors.AccentOn,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={[GlobalStyles.h2text, { color: Colors.Primary }]}>
          {title}
        </Text>
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

  const dispatch = useDispatch();

  if (multiSelectActive === false) {
    return null;
  } else {
    return (
      <View
        style={{
          height: Environment.ScreenHeight,
          width: Environment.ScreenWidth,
          alignItems: "flex-end",
          justifyContent: "center",
          position: "absolute",
        }}
        pointerEvents={"box-none"}
      >
        <View style={GlobalStyles.shadow}>
          {/* @ts-ignore */}
          <View
            style={{
              width: Environment.CubeSize + Environment.LargePadding,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              margin: Environment.SmallPadding,
            }}
          >
            <BlurView
              tint="default"
              style={[
                {
                  padding: Environment.StandardPadding,
                  borderRadius: Environment.StandardRadius,
                  overflow: "hidden",
                },
              ]}
            >
              <StringCubesizeButton title={selectedPosts.length.toString()} />
              <View
                style={{
                  marginTop: Environment.LargePadding,
                  marginBottom: Environment.StandardPadding,
                }}
              >
                <CubeSizeButton
                  isactive={false}
                  Action={() => console.log("Pressed")}
                  Icon={Icons.OriginalSize.Trash}
                />
              </View>

              <CubeSizeButton
                isactive={false}
                Action={() => dispatch(deactivateMultiSelect())}
                Icon={Icons.OriginalSize.X}
              />
            </BlurView>
          </View>
        </View>
      </View>
    );
  }
};

// export default HomeVaultOptionsBar;
export default React.memo(HomeVaultOptionsBar, AreEqual);
