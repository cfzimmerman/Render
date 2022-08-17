import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { deactivateMultiSelect } from "../../../../redux/homevault/homevaultmain";
import { DispatchType } from "../../../../redux/store";
import { setErrormessageActive } from "../../../../redux/system/errormessage";
import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
} from "../../../../redux/system/loadprogressmessage";
import { LSLibraryItemType } from "../../../../redux/system/localsync";
import { setSystemmessageActive } from "../../../../redux/system/messagemodal";
import { PostHeaderType, PostType } from "../../../../resources/CommonTypes";
import {
  GlobalStyles,
  Colors,
  Environment,
  UserDialogue,
} from "../../../../resources/project";
import CoverTileAction from "./CoverTileAction";
import CreatePostGameRelationship from "./CreatePostGameRelationship";
import GetGameCoverURL from "./GetGameCoverURL";
import ModifyPostGame from "./ModifyPostGame";
import SelectGame from "./SelectGame";

export interface GameCoverTileType {
  id: string;
  title: string;
  coverID: string;
  backgroundID: string;
}

export interface GameCoverTileInput {
  item: null | GameCoverTileType;
  searchMode: "library" | "all";
  // origin: "vaultPostEdit" | "vaultMultiSelect";
  dispatch: DispatchType;
  navigation: any;
  // selection: "single" | "multi";
  selectedPosts: string[];
  currentUserID: string;
  vaultPostData: PostHeaderType[];
  vaultFeedData: PostType[];
  currentUserCognitoSub: string;
  syncPreference: null | "All" | "Partial" | "None";
  localLibrary: Record<string, LSLibraryItemType>;
  deleteTag: boolean;
}

const GameCoverTile = ({
  item,
  searchMode,
  dispatch,
  navigation,
  selectedPosts,
  currentUserID,
  vaultPostData,
  vaultFeedData,
  currentUserCognitoSub,
  syncPreference,
  localLibrary,
  deleteTag,
}: GameCoverTileInput) => {
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.tileWrapper]}
      onPress={() =>
        CoverTileAction({
          item,
          searchMode,
          dispatch,
          navigation,
          selectedPosts,
          currentUserID,
          vaultPostData,
          vaultFeedData,
          currentUserCognitoSub,
          syncPreference,
          localLibrary,
          deleteTag,
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
