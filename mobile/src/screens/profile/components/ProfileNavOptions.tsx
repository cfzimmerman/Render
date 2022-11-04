import { View, StyleSheet } from "react-native";
import { Environment, Icons } from "../../../global";
import CubeSizeButton from "../../shared/general/components/CubeSizeButton";

const IsActive = ({ currentScreen, buttonScreen }) => {
  if (currentScreen === buttonScreen) {
    return true;
  }
  return false;
};

function ProfileNavOptions({ currentScreen, navigation, dispatch }) {
  // currentScreen options: "ProfileLanding", "GalleryMain", "SettingsMain"
  return (
    <View style={styles.cubenavbarwrapper}>
      <View style={styles.buttonwrapper}>
        <CubeSizeButton
          Icon={Icons.OriginalSize.ProfileIcon}
          Action={() => {
            navigation.navigate("ProfileLanding");
          }}
          isactive={IsActive({ currentScreen, buttonScreen: "ProfileLanding" })}
        />
      </View>

      <View style={styles.buttonwrapper}>
        <CubeSizeButton
          Icon={Icons.OriginalSize.Gallery}
          Action={() => {
            navigation.navigate("GalleryMain");
          }}
          isactive={IsActive({ currentScreen, buttonScreen: "GalleryMain" })}
        />
      </View>

      {/* <CubeSizeButton Icon={ Icons.OriginalSize.Saved } Action={() => { dispatch(setSystemmessageActive(UserDialogue().systemmessage.shareconstruction)) }} isactive={false} /> */}

      <View style={styles.buttonwrapper}>
        <CubeSizeButton
          Icon={Icons.OriginalSize.Settings}
          Action={() => {
            navigation.navigate("SettingsMain");
          }}
          isactive={IsActive({ currentScreen, buttonScreen: "SettingsMain" })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cubenavbarwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonwrapper: {
    marginHorizontal: Environment.StandardPadding,
  },
});

export default ProfileNavOptions;
