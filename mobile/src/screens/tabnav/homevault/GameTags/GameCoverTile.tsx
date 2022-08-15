import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DispatchType } from "../../../../redux/store";
import { setErrormessageActive } from "../../../../redux/system/errormessage";
import {
  GlobalStyles,
  Colors,
  Environment,
  UserDialogue,
} from "../../../../resources/project";
import CreatePostGameRelationship from "./CreatePostGameRelationship";
import GetGameCoverURL from "./GetGameCoverURL";
import SelectGame from "./SelectGame";

export interface GameCoverTileType {
  id: string;
  title: string;
  coverID: string;
  backgroundID: string;
}

interface GameCoverTilePT {
  item: null | GameCoverTileType;
  searchMode: "library" | "all";
  origin: "vaultPostEdit" | "vaultMultiSelect";
  dispatch: DispatchType;
  navigation: any;
  selection: "single" | "multi";
  selectedPosts: string[];
  currentUserID: string;
}

async function CoverTileAction({
  item,
  searchMode,
  origin,
  dispatch,
  navigation,
  selection,
  selectedPosts,
  currentUserID,
}: GameCoverTilePT) {
  try {
    if (selection === "single" && selectedPosts.length === 1) {
      CreatePostGameRelationship({
        gameID: item.id,
        postID: selectedPosts[0],
        userID: currentUserID,
        dispatch,
        searchMode,
      });
      // Add backend relationship
      // Update front end data
    } else if (selection === "multi" && selectedPosts.length > 1) {
      console.log("Multi");
      // Add backend relationship
      // Update front end data
    }
    navigation.goBack();
  } catch (error) {
    console.log(error);
    dispatch(
      setErrormessageActive(UserDialogue("13").errormessage.systemerror)
    );
  }
}

const GameCoverTile = ({
  item,
  searchMode,
  dispatch,
  navigation,
  selection,
  selectedPosts,
  currentUserID,
  origin,
}: GameCoverTilePT) => {
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.tileWrapper]}
      onPress={() =>
        CoverTileAction({
          item,
          searchMode,
          origin,
          dispatch,
          navigation,
          selection,
          selectedPosts,
          currentUserID,
        })
      }
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
