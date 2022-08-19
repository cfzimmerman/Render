import { View, StyleSheet, Text, Image } from "react-native";
import {
  Environment,
  GlobalStyles,
  Colors,
} from "../../../../resources/project";
import GetGameCoverURL from "./GetGameCoverURL";
import { GameCoverTileType } from "./GameCoverTile";
import { GetDate } from "../../../../resources/utilities";

interface InputTypes {
  gameObject: null | GameCoverTileType;
  navigation: any;
  resultsLength: number;
  firstDate: string;
  lastDate: string | null;
}

const HVGameDisplayHeader = ({
  gameObject,
  navigation,
  resultsLength,
  firstDate,
  lastDate,
}: InputTypes) => {
  if (gameObject === null) {
    return null;
  }
  return (
    <View style={[GlobalStyles.shadow, styles.headerContainer]}>
      <View style={[GlobalStyles.shadow, styles.coverWrapper]}>
        <Image
          source={{ uri: GetGameCoverURL({ coverID: gameObject.coverID }) }}
          style={styles.gameCover}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h4text,
            styles.gameTitle,
          ]}
        >
          {gameObject.title}
        </Text>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.bulletPoints,
          ]}
        >{`• ${resultsLength} ${
          resultsLength === 1 ? "upload" : "uploads"
        }\n• ${
          resultsLength === 1
            ? GetDate(firstDate)
            : `${GetDate(lastDate)} - ${GetDate(firstDate)}`
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    marginTop: Environment.StandardPadding,
    marginBottom: Environment.LargePadding,
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverWrapper: {
    width: Environment.GameCoverWidth,
    height: Environment.GameCoverWidth * (4 / 3),
    borderRadius: Environment.StandardRadius,
  },
  gameCover: {
    width: Environment.GameCoverWidth,
    height: Environment.GameCoverWidth * (4 / 3),
    borderRadius: Environment.StandardRadius,
  },
  textWrapper: {
    width: Environment.HalfBar,
    height: Environment.GameCoverWidth * (4 / 3),
    padding: Environment.StandardPadding,
  },
  gameTitle: {
    color: Colors.AccentOn,
    marginBottom: Environment.SmallPadding,
  },
  bulletPoints: {
    color: Colors.AccentPartial,
  },
});

export default HVGameDisplayHeader;
