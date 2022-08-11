import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { GetGamesQuery } from "../../../../API";
import {
  Colors,
  Environment,
  GlobalStyles,
} from "../../../../resources/project";
import GameCoverTile, { GameCoverTileType } from "./GameCoverTile";
import GetGameCoverURL from "./GetGameCoverURL";
import SelectGameHeader from "./SelectGameHeader";

const SelectGame = () => {
  const [gotSampleGame, setGotSampleGame] = useState(false);
  const [sampleGame, setSampleGame] = useState(null);

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

  const sampleData = [sampleGame];

  const renderItem = ({ item, index }) => <GameCoverTile item={item} />;
  const ListHeader = () => <SelectGameHeader />;

  return (
    <FlatList
      data={sampleData}
      style={styles.flatlistWrapper}
      contentContainerStyle={styles.flatlistContentContainer}
      columnWrapperStyle={styles.flatlistColumnWrapper}
      numColumns={2}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
    />
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
});

export default SelectGame;
