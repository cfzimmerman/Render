import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetGamesQuery } from "../../../../API";
import { BackArrow, HalfbarButton } from "../../../../resources/atoms";
import {
  Colors,
  Environment,
  GlobalStyles,
  Icons,
} from "../../../../resources/project";
import GameCoverTile, { GameCoverTileType } from "./GameCoverTile";
import GetGameCoverURL from "./GetGameCoverURL";

const SelectGame = () => {
  const [gotSampleGame, setGotSampleGame] = useState(false);
  const [sampleGame, setSampleGame] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  async function GetSampleGame() {
    try {
      const {
        data: { getGames: gameResult },
      } = (await API.graphql(
        graphqlOperation(`
            query GetGames {
                getGames (
                    id: "73473ab0-e84f-40e3-929b-e543cc631c76"
                ) {
                    id
                    backgroundID
                    coverID
                    title
                }
            }
        `)
      )) as GraphQLResult<GetGamesQuery>;

      const sampleGame: GameCoverTileType = {
        id: gameResult.id,
        title: gameResult.title,
        coverID: gameResult.coverID,
        backgroundID: gameResult.backgroundID,
      };

      setSampleGame(sampleGame);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (gotSampleGame === false && sampleGame === null) {
      GetSampleGame();
      setGotSampleGame(true);
    }

    if (sampleGame != null) {
      console.log(sampleGame);
    }
  });

  const opacity = new Animated.Value(0);

  const animatein = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing,
    }).start(({ finished }) => {
      if (!finished) {
        setTimeout(() => {
          animatein(Easing.ease);
        }, 2000);
      }
    });
  };

  // Obscures button to confirm email
  const animateout = (easing) => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      easing,
    }).start();
  };

  // Calculates button transforming from size zero to a standard button size and back
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Environment.CubeSize],
  });

  const animatedStyles = [
    styles.xButton,
    {
      opacity,
      width: size,
      height: size,
    },
    GlobalStyles.shadow,
  ];

  const bar = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Environment.FullBar - Environment.CubeSize,
      Environment.TextBarOption - Environment.CubeSize,
    ],
  });

  const barStyles = [
    styles.searchBar,
    {
      width: bar,
    },
    GlobalStyles.shadow,
  ];

  const sampleData = [sampleGame];

  const renderItem = ({ item, index }) => <GameCoverTile item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerWrapper]}>
        <View style={styles.topHeaderContent}>
          <View style={styles.backArrowWrapper}>
            <BackArrow />
          </View>
          <Animated.View style={barStyles}>
            <TextInput
              placeholder="Search titles"
              textAlign="left"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={Colors.AccentPartial}
              style={[styles.inputBox, GlobalStyles.h3text, styles.inputText]}
              onChangeText={setSearchInput}
              value={searchInput}
              onFocus={() => animatein(Easing.ease)}
              keyboardType="default"
            />
          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              animateout(Easing.ease), Keyboard.dismiss();
            }}
          >
            {/* @ts-ignore */}
            <Animated.View style={animatedStyles}>
              <Icons.OriginalSize.X
                stroke={Colors.AccentOn}
                height={Environment.IconSize}
                width={Environment.IconSize}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonHolder}>
          <HalfbarButton
            label="Your library"
            active={false}
            Action={() => console.log("Your games")}
          />
          <HalfbarButton
            label="All games"
            active={false}
            Action={() => console.log("All games")}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={sampleData}
          style={styles.flatlistWrapper}
          contentContainerStyle={styles.flatlistContentContainer}
          columnWrapperStyle={styles.flatlistColumnWrapper}
          numColumns={2}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatlistWrapper: {
    flex: 1,
  },
  flatlistContentContainer: {
    alignItems: "center",
  },
  flatlistColumnWrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    marginBottom: Environment.StandardPadding,
  },
  columnwrapper: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
  },
  container: {
    paddingTop: Environment.StandardPadding,
    flex: 1,
    alignItems: "center",
  },
  headerWrapper: {
    width: Environment.FullBar,
  },
  topHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Environment.FullBar,
    marginVertical: Environment.SmallPadding,
  },
  backArrowWrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonHolder: {
    width: Environment.FullBar,
    marginTop: Environment.SmallPadding,
    marginBottom: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
  },
  inputText: {
    color: Colors.AccentOn,
  },
  xButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  searchBar: {
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
});

export default SelectGame;
