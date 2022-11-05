import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPGFullGame,
  clearPGFullGamePosts,
  setPGFullGamePostSearchActive,
} from "../../../../redux/exploremain";
import { RootStateType } from "../../../../redux";
import FlatListFooterSpacer from "../../general/components/FlatListFooterSpacer";
import { Colors, Environment, GlobalStyles } from "../../../../global";
import PostTile from "../../../home_vault/components/PostTile";
import PGGetFullGame from "../operations/PGGetFullGame";
import PGGetGamePosts from "../operations/PGGetGamePosts";
import PGLandingEmptyComponent from "../components/PGLandingEmptyComponent";
import PGLandingHeader from "../components/PGLandingHeader";

export interface FullGameItemType {
  id: string | null;
  title: string | null;
  coverID: string | null;
  backgroundID: string | null;
  series: string | null;
  releaseDate: string | null;
  numUserGames: number | null;
}

const PGLanding = ({ navigation, route }) => {
  const [gotFullGame, setGotFullGame] = useState<boolean>(false);
  const [gotFullGamePosts, setGotFullGamePosts] = useState<boolean>(false);

  const { gameID } = route.params;

  const {
    pgFullGame,
    pgFullGamePosts,
    pgFullGamePostsNextToken,
    pgFullGamePostSearchActive,
  } = useSelector((state: RootStateType) => state.exploremain);

  const dispatch = useDispatch();

  const resultsLimit = 10;

  useEffect(() => {
    if (gotFullGame === false) {
      dispatch(clearPGFullGamePosts());
      PGGetFullGame({ dispatch, gameID });
      setGotFullGame(true);
    }
    if (typeof pgFullGame.id === "string" && pgFullGame.id != gameID) {
      dispatch(clearPGFullGamePosts());
      dispatch(clearPGFullGame());
      console.log("Fallback deletion. Try to prevent this.");
      setGotFullGame(false);
    }
    if (
      gotFullGamePosts === false &&
      gotFullGame === true &&
      typeof pgFullGame.id === "string" &&
      pgFullGamePosts.length === 0 &&
      pgFullGamePostSearchActive === false
    ) {
      PGGetGamePosts({
        gameID,
        nextToken: pgFullGamePostsNextToken,
        dispatch,
        coverID: pgFullGame.coverID,
        title: pgFullGame.title,
        resultsLimit,
      });
      setGotFullGamePosts(true);
      dispatch(setPGFullGamePostSearchActive(true));
    }
  });

  const ListHeader = () => {
    if (
      gotFullGame === true &&
      pgFullGame.id === gameID &&
      typeof pgFullGame.coverID === "string"
    ) {
      return <PGLandingHeader fullGameItem={pgFullGame} />;
    }

    return null;
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostTile
        item={item}
        index={index}
        dispatch={dispatch}
        navigation={navigation}
        selectedfeed={"PGLanding"}
      />
    );
  };

  const ListFooter = () => {
    return <FlatListFooterSpacer />;
  };

  const ListEmpty = () => {
    if (
      gotFullGame === true &&
      typeof pgFullGame.coverID === "string" &&
      gotFullGamePosts === true &&
      pgFullGamePosts.length === 0 &&
      pgFullGamePostSearchActive === false &&
      pgFullGamePostsNextToken === null
    ) {
      return <PGLandingEmptyComponent />;
    }
    return null;
  };

  const EndReached = () => {
    if (
      typeof pgFullGame.id === "string" &&
      pgFullGame.id === gameID &&
      pgFullGamePosts.length > resultsLimit - 1 &&
      typeof pgFullGamePostsNextToken === "string" &&
      pgFullGamePostSearchActive === false
    ) {
      PGGetGamePosts({
        gameID,
        nextToken: pgFullGamePostsNextToken,
        dispatch,
        coverID: pgFullGame.coverID,
        title: pgFullGame.title,
        resultsLimit,
      });
    }
  };

  return (
    <FlatList
      data={pgFullGamePosts}
      ListHeaderComponent={ListHeader()}
      renderItem={renderItem}
      ListFooterComponent={ListFooter()}
      ListEmptyComponent={ListEmpty()}
      onEndReached={EndReached}
      style={styles.flatlistStyle}
      contentContainerStyle={styles.containerStyle}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  containerStyle: {
    alignItems: "center",
  },
});

export default PGLanding;
