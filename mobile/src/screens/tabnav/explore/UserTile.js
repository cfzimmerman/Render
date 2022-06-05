import {
  Text, View, Image, TouchableOpacity, StyleSheet,
} from "react-native";
import { Environment, GlobalStyles, Colors } from "../../../resources/project";
import EnterProfileFromSearch from "./EnterProfileFromSearch";

const PrimaryColor = (item) => {
  if (item.relationship === "user") {
    return Colors.AccentPartial;
  }
  return Colors.Primary;
};

const TileInteraction = ({
  item, navigation, dispatch, currentuser,
}) => {
  if (item.relationship === "user") {
    navigation.navigate("Profile", { screen: "ProfileLanding" });
  } else {
    EnterProfileFromSearch({
      item,
      navigation,
      dispatch,
      currentuser,
    });
  }
};

function UserTile({
  item,
  index,
  navigation,
  dispatch,
  cognitosub,
  currentuser,
}) {
  return (
    <TouchableOpacity
      onPress={() => TileInteraction({
        item,
        navigation,
        dispatch,
        currentuser,
      })}
    >
      <View
        style={[
          GlobalStyles.shadow,
          styles.tilebody,
          { backgroundColor: PrimaryColor(item) },
        ]}
      >
        <View style={[GlobalStyles.shadow]}>
          <Image style={styles.previewimage} source={{ uri: item.pfpurl }} />
        </View>
        <View style={styles.bottomwrapper}>
          <View style={styles.textwrapper}>
            <Text
              style={[
                GlobalStyles.p1text,
                GlobalStyles.irregularshadow,
                styles.displayname,
              ]}
            >
              {item.displayname}
            </Text>
            <Text
              style={[
                GlobalStyles.p2text,
                GlobalStyles.irregularshadow,
                styles.gamertag,
              ]}
            >
              @
              {item.gamertag}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tilebody: {
    width: Environment.HalfBar,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
  },
  previewimage: {
    height: Environment.HalfBar - Environment.LargePadding,
    width: Environment.HalfBar - Environment.LargePadding,
    borderRadius: Environment.StandardRadius,
  },
  bottomwrapper: {
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
  },
  textwrapper: {
    width: Environment.HalfBar - Environment.LargePadding,
  },
  displayname: {
    color: Colors.AccentOn,
  },
  gamertag: {
    color: Colors.AccentPartial,
  },
});

export default UserTile;
