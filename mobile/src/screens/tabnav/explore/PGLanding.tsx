import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPGFullGame,
  clearPGFullGamePosts,
  setPGFullGamePostSearchActive,
} from "../../../redux/explore/exploremain";
import { RootStateType } from "../../../redux/store";
import { FlatListFooterSpacer } from "../../../resources/atoms";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import PostTile from "../home/PostTile";
import PGGetFullGame from "./PGGetFullGame";
import PGGetGamePosts from "./PGGetGamePosts";
import PGLandingHeader from "./PGLandingHeader";

export interface FullGameItemType {
  id: string | null;
  title: string | null;
  coverID: string | null;
  backgroundID: string | null;
  series: string | null;
  releaseDate: string | null;
  numUserGames: number | null;
}

// series, releaseDate, numUserGames ("")
const fullGameItem: FullGameItemType = {
  id: "6a16a3a9-327a-4ac9-bd20-7dd07d3c00c4",
  title: "Teslagrad 2",
  coverID: "co54c7",
  backgroundID: "sciijh",
  series: "Teslagrad",
  releaseDate: "2023-06-30T00:00:00.000Z",
  numUserGames: 2,
};

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

  useEffect(() => {
    if (gotFullGame === false) {
      dispatch(clearPGFullGamePosts());
      PGGetFullGame({ dispatch, gameID });
      setGotFullGame(true);
    }
    if (typeof pgFullGame.id === "string" && pgFullGame.id != gameID) {
      dispatch(clearPGFullGamePosts());
      dispatch(clearPGFullGame());
      setGotFullGame(false);
    }
    if (
      gotFullGamePosts === false &&
      gotFullGame === true &&
      typeof fullGameItem.id === "string" &&
      pgFullGamePosts.length === 0 &&
      pgFullGamePostSearchActive === false
    ) {
      PGGetGamePosts({
        gameID,
        nextToken: pgFullGamePostsNextToken,
        dispatch,
        coverID: fullGameItem.coverID,
        title: fullGameItem.title,
      });
      setGotFullGamePosts(true);
      dispatch(setPGFullGamePostSearchActive(true));
    }
  });

  const ListHeader = () => {
    if (gotFullGame === false || typeof pgFullGame.coverID != "string") {
      return null;
    }
    return <PGLandingHeader fullGameItem={pgFullGame} />;
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

  return (
    <FlatList
      data={pgFullGamePosts}
      ListHeaderComponent={ListHeader}
      renderItem={renderItem}
      ListFooterComponent={ListFooter}
      style={styles.flatlistStyle}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
});

export default PGLanding;
