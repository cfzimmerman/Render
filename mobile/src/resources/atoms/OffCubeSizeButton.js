import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "react-native-paper";
import { setPageOptionsActive } from "../../redux/general/pageoptions";

import { GlobalStyles, Colors, Environment } from "../project";

// <OffCubeSizeButton icon={ Icons.OriginalSizeIcons.List } />
function OffCubeSizeButton({ Icon, dispatch }) {
  const optionsactive = useSelector((state) => state.pageoptions);

  if (optionsactive.isactive === false) {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setPageOptionsActive());
        }}
      >
        <View style={[styles.button, GlobalStyles.shadow]}>
          <Icon
            stroke={Colors.AccentOn}
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
    backgroundColor: Colors.Primary,
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OffCubeSizeButton;
