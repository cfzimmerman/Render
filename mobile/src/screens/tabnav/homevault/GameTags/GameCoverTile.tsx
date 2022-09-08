import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  GlobalStyles,
  Colors,
  Environment,
} from "../../../../resources/project";
import GetGameCoverURL from "./GetGameCoverURL";

export interface GameCoverTileType {
  id: string;
  title: string;
  coverID: string;
  backgroundID: string;
}

interface InputTypes {
  item: GameCoverTileType;
  Action: Function;
}

const GameCoverTile = ({ item, Action }: InputTypes) => {
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.tileWrapper]}
      onPress={() => Action()}
    >
      <View style={GlobalStyles.shadow}>
        <Image
          source={{
            uri:
              item === null
                ? undefined
                : GetGameCoverURL({ coverID: item.coverID }),
          }}
          style={styles.coverImage}
        />
        <View style={styles.textWrapper}>
          <Text
            numberOfLines={2}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              styles.gameTitle,
            ]}
          >
            {item === null ? "Loading" : item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileWrapper: {
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  coverImage: {
    width: Environment.GameCoverWidth,
    height: Environment.GameCoverWidth * (4 / 3),
    borderRadius: Environment.StandardRadius,
  },
  textWrapper: {
    width: Environment.GameCoverWidth,
  },
  gameTitle: {
    color: Colors.AccentOn,
    marginTop: Environment.StandardPadding,
    textAlign: "center",
  },
});

export default GameCoverTile;
