import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearPGFullGame } from "../../../redux/explore/exploremain";
import { RootStateType } from "../../../redux/store";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import PGGetFullGame from "./PGGetFullGame";
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

  const { gameID } = route.params;

  const { pgFullGame, pgFullGamePosts } = useSelector(
    (state: RootStateType) => state.exploremain
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (gotFullGame === false) {
      PGGetFullGame({ dispatch, gameID });
      setGotFullGame(true);
    }
    if (typeof pgFullGame.id === "string" && pgFullGame.id != gameID) {
      dispatch(clearPGFullGame());
      setGotFullGame(false);
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Secondary }}>
      <PGLandingHeader fullGameItem={pgFullGame} />
    </View>
  );
};

export default PGLanding;
