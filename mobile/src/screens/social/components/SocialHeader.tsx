import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Environment, GlobalStyles, Colors } from "../../../global";
import HalfbarButton from "../../shared/general/components/HalfbarButton";
import { setSelectedFeed } from "../../../redux/shared/homemain";

const IsActive = ({ selectedfeed, buttonid }) => {
  if (selectedfeed === buttonid) {
    return true;
  }
  return false;
};

function FeedSelector({ dispatch, selectedfeed }) {
  return (
    <View style={styles.feedselectorbox}>
      <HalfbarButton
        Action={() => dispatch(setSelectedFeed("addedfeed"))}
        label="Added"
        active={IsActive({ buttonid: "addedfeed", selectedfeed })}
      />
      <HalfbarButton
        Action={() => dispatch(setSelectedFeed("publicfeed"))}
        label="All"
        active={IsActive({ buttonid: "publicfeed", selectedfeed })}
      />
    </View>
  );
}

function SocialHeader({ navigation, currentuser, selectedfeed, dispatch }) {
  return (
    <SafeAreaView style={styles.container}>
      <FeedSelector dispatch={dispatch} selectedfeed={selectedfeed} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.FullBar,
    alignItems: "center",
    marginTop: Environment.StandardPadding,
  },
  searchbartext: {
    color: Colors.AccentPartial,
  },
  logowrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: Environment.CubeSize * 1.25,
    width: Environment.CubeSize * 1.25,
  },
  feedselectorbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Environment.FullBar,
  },
});

export default SocialHeader;
