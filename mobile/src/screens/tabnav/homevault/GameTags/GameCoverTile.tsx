import { View, Image, Text, StyleSheet } from "react-native";
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

interface GameCoverTilePT {
  item: null | GameCoverTileType;
}

const GameCoverTile = ({ item }: GameCoverTilePT) => {
  return (
    <View
      style={[
        GlobalStyles.shadow,
        {
          width: Environment.HalfBar,
          borderRadius: Environment.StandardRadius,
          backgroundColor: Colors.Primary,
          alignItems: "center",
          justifyContent: "center",
          padding: Environment.StandardPadding,
        },
      ]}
    >
      <View style={GlobalStyles.shadow}>
        <Image
          source={{
            uri:
              item === null
                ? undefined
                : GetGameCoverURL({ coverID: item.coverID }),
          }}
          style={{
            width: Environment.GameCoverWidth,
            height: Environment.GameCoverWidth * (4 / 3),
            borderRadius: Environment.StandardRadius,
          }}
        />
        <View
          style={{
            width: Environment.GameCoverWidth,
          }}
        >
          <Text
            numberOfLines={2}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              {
                color: Colors.AccentOn,
                marginTop: Environment.StandardPadding,
                textAlign: "center",
              },
            ]}
          >
            {item === null ? "Loading" : item.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GameCoverTile;

/*


        
      </View>

*/
