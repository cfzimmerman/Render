import { TouchableOpacity, Text } from "react-native";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../../resources/project";
import CoverTileAction from "./CoverTileAction";
import { GameCoverTileInput } from "./GameCoverTile";

const SelectGameListHeader = ({
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
      style={[
        GlobalStyles.shadow,
        {
          height: Environment.CubeSize,
          width: Environment.FullBar,
          borderRadius: Environment.StandardRadius,
          backgroundColor: Colors.Primary,
          marginVertical: Environment.StandardPadding,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        },
      ]}
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
      <Icons.OriginalSize.X
        stroke={Colors.AccentOn}
        height={Environment.IconSize}
        width={Environment.IconSize}
        style={{ marginHorizontal: Environment.StandardPadding }}
      />
      <Text
        style={[
          GlobalStyles.irregularshadow,
          GlobalStyles.h3text,
          { textAlign: "center", color: Colors.AccentOn },
        ]}
      >
        No tag
      </Text>
    </TouchableOpacity>
  );
};

export default SelectGameListHeader;
