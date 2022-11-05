import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Environment, GlobalStyles, Colors, Icons } from "../../../global";
import EnterProfileFromSearch from "../../explore/operations/EnterProfileFromSearch";

const TileInteraction = ({ item, navigation, dispatch, currentuser }) => {
  EnterProfileFromSearch({
    item,
    navigation,
    dispatch,
    currentuser,
  });
};

const TileBottom = ({ item }) => {
  return (
    <View style={styles.tbtruewrapper}>
      <View style={styles.tbtruetextwrapper}>
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
          @{item.gamertag}
        </Text>
      </View>
    </View>
  );
};

function RelationUserTile({
  item,
  index,
  navigation,
  dispatch,
  currentuser,
  origin,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        TileInteraction({
          item,
          navigation,
          dispatch,
          currentuser,
        })
      }
    >
      <View style={[GlobalStyles.shadow, styles.container]}>
        <View style={GlobalStyles.shadow}>
          <Image style={styles.userpfp} source={{ uri: item.pfpurl }} />
        </View>
        <TileBottom item={item} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.HalfBar,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
  },
  userpfp: {
    height: Environment.HalfBar - Environment.LargePadding,
    width: Environment.HalfBar - Environment.LargePadding,
    borderRadius: Environment.StandardRadius,
  },
  tbtruewrapper: {
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
  },
  tbfalsewrapper: {
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tbtruetextwrapper: {
    width: Environment.HalfBar - Environment.LargePadding,
  },
  tbfalsetextwrapper: {
    width:
      Environment.HalfBar -
      Environment.LargePadding -
      Environment.StandardPadding -
      Environment.IconSize,
  },
  displayname: {
    color: Colors.AccentOn,
  },
  gamertag: {
    color: Colors.AccentPartial,
  },
  tbiconwrapper: {
    backgroundColor: Colors.AccentOn,
    padding: Environment.SmallPadding,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.SmallRadius,
  },
});

export default RelationUserTile;
