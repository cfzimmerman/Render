import { View, StyleSheet } from "react-native";
import { HalfbarButton, IconHalfbarButton } from "../../../resources/atoms";
import { Environment, Icons, Colors } from "../../../resources/project";

const GalleryIcon = () => {
  return (
    <Icons.OriginalSize.Gallery
      stroke={Colors.AccentPartial}
      height={Environment.IconSize}
      width={Environment.IconSize}
    />
  );
};

const NotificationsIcon = () => {
  return (
    <Icons.OriginalSize.Notification
      stroke={Colors.AccentPartial}
      height={Environment.IconSize}
      width={Environment.IconSize}
    />
  );
};

// Make this a memo component

const HeaderButtons = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <IconHalfbarButton
        label=""
        active={false}
        Action={() =>
          navigation.navigate("Profile", {
            screen: "GalleryMain",
            initial: false,
          })
        }
        origin="HeaderButtons"
        Icon={GalleryIcon}
      />
      <IconHalfbarButton
        label=""
        active={false}
        Action={() => navigation.navigate("NotificationsMain")}
        origin="HeaderButtons"
        Icon={NotificationsIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: Environment.FullBar,
    justifyContent: "space-between",
    marginTop: Environment.LargePadding,
  },
});

export default HeaderButtons;