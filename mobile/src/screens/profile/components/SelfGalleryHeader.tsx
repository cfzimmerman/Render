import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryDivider from "../../shared/general/components/PrimaryDivider";

import { Environment, Colors, GlobalStyles } from "../../../global";
import ProfileNavOptions from "./ProfileNavOptions";

const SelfGalleryHeader = ({ navigation, dispatch }) => {
  return (
    <SafeAreaView style={styles.headerwrapper}>
      <View style={styles.navoptionswrapper}>
        <ProfileNavOptions
          dispatch={dispatch}
          navigation={navigation}
          currentScreen="GalleryMain"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text
          style={[
            GlobalStyles.h4text,
            GlobalStyles.irregularshadow,
            styles.galleryHeaderTitle,
          ]}
        >
          Gallery
        </Text>
        <Text
          style={[
            GlobalStyles.p1text,
            GlobalStyles.shadow,
            styles.galleryHeaderDescription,
          ]}
        >
          Your public posts
        </Text>
      </View>
      <PrimaryDivider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerwrapper: {
    width: Environment.ScreenWidth,
    alignItems: "center",
  },
  navoptionswrapper: {
    marginTop: Environment.StandardPadding,
  },
  galleryHeaderTitle: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  galleryHeaderDescription: {
    color: Colors.Accent90,
  },
  textWrapper: {
    marginTop: Environment.LargePadding,
  },
});

export default SelfGalleryHeader;
