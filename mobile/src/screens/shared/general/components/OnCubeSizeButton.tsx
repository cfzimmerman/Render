import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setPageOptionsInactive } from "../../../../redux/shared/pageoptions";

import { GlobalStyles, Colors, Environment } from "../../../../global";
import { RootStateType } from "../../../../redux";

// <OffCubeSizeButton icon={ Icons.OriginalSizeIcons.List } />
function OnCubeSizeButton({ Icon, dispatch }) {
  const optionsactive = useSelector(
    (state: RootStateType) => state.pageoptions
  );

  if (optionsactive.isactive === true) {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setPageOptionsInactive());
        }}
      >
        <View style={[styles.button, GlobalStyles.shadow]}>
          <Icon
            stroke={Colors.Primary}
            height={Environment.IconSize}
            width={Environment.IconSize}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.AccentOn,
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnCubeSizeButton;
