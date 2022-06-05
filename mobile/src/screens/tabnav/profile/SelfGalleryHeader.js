import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Environment } from "../../../resources/project";
import ProfileNavOptions from "./ProfileNavOptions";

function SelfGalleryHeader({ navigation, dispatch }) {
  return (
    <SafeAreaView style={styles.headerwrapper}>
      <View style={styles.navoptionswrapper}>
        <ProfileNavOptions
          dispatch={dispatch}
          navigation={navigation}
          currentScreen="GalleryMain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerwrapper: {
    width: Environment.ScreenWidth,
    alignItems: "center",
  },
  cubenavbarwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Environment.StandardPadding,
  },
  navoptionswrapper: {
    marginTop: Environment.StandardPadding,
  },
});

export default SelfGalleryHeader;
