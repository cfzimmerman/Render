import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHVGameSearchResults,
  setHVGameSearchActive,
} from "../../../../redux/homevault/gametags";
import { RootStateType } from "../../../../redux/store";
import { BackArrow, FlatListFooterSpacer } from "../../../../resources/atoms";
import {
  Colors,
  Environment,
  GlobalStyles,
} from "../../../../resources/project";
import { GameCoverTileType } from "./GameCoverTile";
import HVGameDisplayHeader from "./HVGameDisplayHeader";
import HVGetGamePosts from "./HVGetGamePosts";
import HVGetNoGamePosts from "./HVGetNoGamePosts";
import HVPostResultTile from "./HVPostResultTile";

const noTag: GameCoverTileType = {
  id: null,
  title: null,
  coverID: null,
  backgroundID: null,
};

type LocalGameObject = GameCoverTileType | null;

const GetBarLabel = (gameObject: LocalGameObject) => {
  if (gameObject === null) {
    return "";
  } else if (gameObject.id === null) {
    return "No tag";
  } else {
    return gameObject.title;
  }
};

const HVGameDisplay = ({ navigation, route }) => {
  const [gotGame, setGotGame] = useState<boolean>(false);
  const [gameObject, setGameObject] = useState<LocalGameObject>(null);

  const [gotPosts, setGotPosts] = useState<boolean>(false);

  const dispatch = useDispatch();

  const libraryGamesArray = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesArray
  );
  const hvGameSearchResults = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchResults
  );
  const hvGameSearchNextToken = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchNextToken
  );
  const hvGameSearchActive = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchActive
  );
  const currentUserID = useSelector(
    (state: RootStateType) => state.profilemain.currentuser.id
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );

  const gameID = route.params.gameID;

  useEffect(() => {
    if (
      gameObject === null &&
      gotGame === false &&
      libraryGamesArray != null &&
      libraryGamesArray.length > 0
    ) {
      dispatch(clearHVGameSearchResults());
      const gameIndex = libraryGamesArray.findIndex(
        (item: GameCoverTileType) => item.id === gameID
      );
      if (gameIndex > -1) {
        setGameObject(libraryGamesArray[gameIndex]);
      } else {
        setGameObject(noTag);
      }
      setGotGame(true);
    }
    if (
      gameObject != null &&
      typeof gameObject.id === "string" &&
      gotPosts === false &&
      hvGameSearchActive === false
    ) {
      HVGetGamePosts({
        currentUserID,
        gameID,
        dispatch,
        coverID: gameObject.coverID,
        title: gameObject.title,
        vaultfeeddata,
        hvGameSearchNextToken,
      });
      dispatch(setHVGameSearchActive(true));
      setGotPosts(true);
    } else if (
      gameObject != null &&
      gotPosts === false &&
      hvGameSearchActive === false &&
      gameObject.id === null
    ) {
      HVGetNoGamePosts({
        currentUserID,
        dispatch,
        vaultfeeddata,
        hvGameSearchNextToken,
      });
      dispatch(setHVGameSearchActive(true));
      setGotPosts(true);
    }
  });

  const ListHeader = () => {
    const resultsLength = hvGameSearchResults.length;
    return (
      <HVGameDisplayHeader
        gameObject={gameObject}
        resultsLength={resultsLength}
        firstDate={
          resultsLength > 0
            ? hvGameSearchResults[resultsLength - 1].contentdate
            : null
        }
        lastDate={resultsLength > 0 ? hvGameSearchResults[0].contentdate : null}
        hvGameSearchActive={hvGameSearchActive}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <HVPostResultTile item={item} index={index} navigation={navigation} />
    );
  };

  const ListFooter = () => {
    return <FlatListFooterSpacer />;
  };

  const EndReached = () => {
    if (
      gotPosts === true &&
      hvGameSearchNextToken != null &&
      hvGameSearchActive === false &&
      gameObject != null
    ) {
      if (typeof gameObject.id === "string") {
        dispatch(setHVGameSearchActive(true));
        HVGetGamePosts({
          currentUserID,
          gameID,
          dispatch,
          coverID: gameObject.coverID,
          title: gameObject.title,
          vaultfeeddata,
          hvGameSearchNextToken,
        });
      } else if (gameObject.id === null) {
        dispatch(setHVGameSearchActive(true));
        HVGetNoGamePosts({
          currentUserID,
          dispatch,
          vaultfeeddata,
          hvGameSearchNextToken,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backArrowWrapper}>
          <BackArrow />
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[GlobalStyles.shadow, styles.searchBar]}
        >
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h3text,
              styles.searchBarText,
            ]}
          >
            {GetBarLabel(gameObject)}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={hvGameSearchResults}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          renderItem={renderItem}
          numColumns={2}
          style={styles.flatlistWrapper}
          contentContainerStyle={styles.flatlistContentContainer}
          columnWrapperStyle={styles.flatlistColumnWrapper}
          onEndReachedThreshold={1}
          onEndReached={EndReached}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? Environment.StandardPadding : 0,
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Environment.StandardPadding,
  },
  backArrowWrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  searchBar: {
    height: Environment.CubeSize,
    width: Environment.FullBar - Environment.CubeSize,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    justifyContent: "center",
  },
  searchBarText: {
    color: Colors.AccentPartial,
  },
  flatlistWrapper: {
    flex: 1,
  },
  flatlistContentContainer: {
    alignItems: "center",
  },
  flatlistColumnWrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
  },
});

export default HVGameDisplay;
