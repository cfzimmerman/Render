import { View, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles, Icons } from "../../../global";

const WrappedIcon = ({ Icon, origin }) => {
  // This distinction was created so that item and section tile icons can be different sizes if that improves the UI. Whether or not this is the case is up for debate atm.
  if (origin === "sectionheader") {
    return (
      <View style={styles.wrappediconholder}>
        <Icon
          stroke={Colors.AccentOn}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize}
          width={Environment.IconSize}
        />
      </View>
    );
  }
  if (origin === "sectionitem") {
    return (
      <View style={styles.wrappediconholder}>
        <Icon
          stroke={Colors.AccentOn}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize}
          width={Environment.IconSize}
        />
      </View>
    );
  }
};

const VideoIcon = ({ item, origin }) => {
  if (item.contenttype === "video") {
    return <WrappedIcon Icon={Icons.OriginalSize.Play} origin={origin} />;
  }
  return null;
};

const PublicPostIcon = ({ item, origin }) => {
  if (item.publicpost === true) {
    return <WrappedIcon Icon={Icons.OriginalSize.PlusIcon} origin={origin} />;
  }
  return null;
};

const PostTextIcon = ({ item, origin }) => {
  if (
    item.posttext != "undefined" &&
    item.posttext != null &&
    item.posttext.length > 0
  ) {
    return <WrappedIcon Icon={Icons.OriginalSize.Text} origin={origin} />;
  }
  return null;
};

// Origin: "sectionheader", "sectionitem"
const ExternalVaultTileInfo = ({ item, origin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconholder}>
        <PostTextIcon item={item} origin={origin} />
        <PublicPostIcon item={item} origin={origin} />
        <VideoIcon item={item} origin={origin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  iconholder: {
    flexDirection: "row",
    margin: Environment.StandardPadding,
  },
  wrappediconholder: {
    marginLeft: Environment.SmallPadding,
  },
});

export default ExternalVaultTileInfo;
