import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../../global";
import { GameCoverTileType } from "./GameCoverTile";
import GetGameCoverThumbnailURL from "../operations/GetGameCoverThumbnailURL";
import GetGameCoverURL from "../operations/GetGameCoverURL";

interface InputTypes {
  item: GameCoverTileType;
  index: number;
  navigation: any;
}

const HVSearchGameTile = ({ item, index, navigation }: InputTypes) => {
  return (
    <TouchableOpacity
      style={styles.tileWrapper}
      onPress={() => navigation.navigate("HVGameDisplay", { gameID: item.id })}
    >
      <View style={[GlobalStyles.shadow, styles.imageShadow]}>
        <Image
          source={{
            uri: GetGameCoverURL({ coverID: item.coverID }),
          }}
          style={styles.coverImage}
          resizeMode={"cover"}
        />
      </View>
      <View style={[GlobalStyles.shadow, styles.textHolder]}>
        <Text
          numberOfLines={1}
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.titleText,
          ]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileWrapper: {
    width: Environment.HalfBar,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Environment.StandardPadding,
  },
  imageShadow: {
    borderRadius: Environment.StandardRadius,
  },
  coverImage: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
  },
  textHolder: {
    width: Environment.HalfBar,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Environment.StandardPadding,
    paddingHorizontal: Environment.StandardPadding,
    paddingBottom: 0,
  },
  titleText: {
    textAlign: "center",
    color: Colors.AccentOn,
  },
});

export default HVSearchGameTile;
