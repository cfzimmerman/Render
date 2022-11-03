import React from "react";
import { View, Text, Platform, StyleSheet, Image } from "react-native";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Environment, Colors, GlobalStyles } from "../../../../global";
import { FullGameItemType } from "../pages/PGLanding";
import GetGameCoverURL from "../../game_tags/operations/GetGameCoverURL";
import BackArrow from "../../general/components/BackArrow";

interface InputTypes {
  fullGameItem: FullGameItemType;
}

const AreEqual = (previousProps: InputTypes, nextProps: InputTypes) => {
  if (previousProps.fullGameItem.id === nextProps.fullGameItem.id) {
    return true;
  }
  return false;
};

const GameInfoPoints = (fullGameItem: FullGameItemType): string => {
  var gameInfo = ``;
  if (typeof fullGameItem.series === "string") {
    gameInfo = gameInfo + "• Series: " + fullGameItem.series + "\n";
  }
  if (fullGameItem.numUserGames > 0) {
    if (fullGameItem.numUserGames === 1) {
      gameInfo = gameInfo + "• 1 user with game\n";
    } else {
      gameInfo =
        gameInfo + "• " + fullGameItem.numUserGames + " users with game\n";
    }
  }
  if (
    fullGameItem.releaseDate != null &&
    typeof new Date(fullGameItem.releaseDate) === "object"
  ) {
    gameInfo =
      gameInfo +
      "• Release date: " +
      format(new Date(fullGameItem.releaseDate), "PP") +
      "\n";
  }
  return gameInfo;
};

const PGLandingHeader = ({ fullGameItem }: InputTypes) => {
  return (
    <View style={styles.componentContainer}>
      <Image
        style={styles.backgroundImage}
        blurRadius={3}
        source={{
          uri: GetGameCoverURL({
            coverID: fullGameItem.backgroundID,
          }),
        }}
      />
      <View style={styles.contentWrapper} />
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.backArrowBar}>
          <BackArrow />
        </View>
        <View style={styles.dividedContainer}>
          <View style={[GlobalStyles.shadow, styles.coverShadow]}>
            <Image
              style={styles.gameCover}
              source={{
                uri: GetGameCoverURL({ coverID: fullGameItem.coverID }),
              }}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text
              style={[
                GlobalStyles.irregularshadow,
                GlobalStyles.h4text,
                styles.gameTitle,
              ]}
            >
              {fullGameItem.title}
            </Text>
            <Text
              style={[
                GlobalStyles.p1text,
                GlobalStyles.irregularshadow,
                styles.infoPoints,
              ]}
            >
              {GameInfoPoints(fullGameItem)}
            </Text>
          </View>
        </View>
        <View style={styles.backArrowBar} />
      </SafeAreaView>
      <LinearGradient
        colors={["transparent", Colors.Secondary]}
        style={styles.bottomGradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    height: Environment.ScreenWidth + Environment.CubeSize,
    width: Environment.ScreenWidth,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    height: Environment.ScreenWidth + Environment.CubeSize,
    width: Environment.ScreenWidth,
    position: "absolute",
  },
  contentWrapper: {
    height: Environment.ScreenWidth + Environment.CubeSize,
    width: Environment.ScreenWidth,
    position: "absolute",
    backgroundColor: Colors.Background + "20",
  },
  safeAreaWrapper: {
    flex: 1,
    marginTop: Platform.OS === "android" ? Environment.StandardPadding : 0,
    justifyContent: "space-between",
    paddingHorizontal: Environment.SmallPadding,
    marginBottom: -1 * Environment.CubeSize,
  },
  dividedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coverShadow: {
    borderRadius: Environment.StandardRadius,
  },
  gameCover: {
    height: Environment.HalfBar * (4 / 3),
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
  },
  descriptionContainer: {
    width: Environment.HalfBar,
    height: Environment.HalfBar * (4 / 3),
    padding: Environment.SmallPadding,
  },
  gameTitle: {
    color: Colors.AccentOn,
    textDecorationLine: "underline",
  },
  infoPoints: {
    color: Colors.AccentOn,
    marginVertical: Environment.SmallPadding,
    marginLeft: Environment.SmallPadding,
  },
  bottomGradient: {
    height: Environment.CubeSize,
    width: Environment.ScreenWidth,
  },
  backArrowBar: {
    width: Environment.FullBar,
    height: Environment.CubeSize,
    justifyContent: "center",
  },
});

export default React.memo(PGLandingHeader, AreEqual);
