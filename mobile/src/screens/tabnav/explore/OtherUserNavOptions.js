import { View, StyleSheet } from "react-native";
import { Environment, Icons } from "../../../resources/project";
import { CubeSizeButton } from "../../../resources/atoms";

const IsActive = ({ currentScreen, buttonScreen }) => {
  if (currentScreen === buttonScreen) {
    return true;
  }
  return false;
};

// currentScreen: "OtherUserProfileLanding", 'OtherUserGalleryMain'
function OtherUserNavOptions({ currentScreen, navigation }) {
  return (
    <View style={styles.cubenavbarwrapper}>
      <View style={styles.buttonwrapper}>
        <CubeSizeButton
          Icon={Icons.OriginalSize.ProfileIcon}
          Action={() => {
            navigation.navigate("OtherUserProfileLanding");
          }}
          isactive={IsActive({
            currentScreen,
            buttonScreen: "OtherUserProfileLanding",
          })}
        />
      </View>

      <View style={styles.buttonwrapper}>
        <CubeSizeButton
          Icon={Icons.OriginalSize.Gallery}
          Action={() => {
            navigation.navigate("OtherUserGalleryMain");
          }}
          isactive={IsActive({
            currentScreen,
            buttonScreen: "OtherUserGalleryMain",
          })}
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

export default OtherUserNavOptions;
