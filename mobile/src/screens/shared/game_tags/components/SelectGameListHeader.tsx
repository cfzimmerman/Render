import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Environment, Colors, GlobalStyles, Icons } from "../../../../global";
import CoverTileAction, {
  GameCoverTileActionInput,
} from "../operations/CoverTileAction";

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
}: GameCoverTileActionInput) => {
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.headerWrapper]}
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
        style={styles.xButton}
      />
      <Text
        style={[
          GlobalStyles.irregularshadow,
          GlobalStyles.h3text,
          styles.headerText,
        ]}
      >
        No tag
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    marginVertical: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerText: {
    textAlign: "center",
    color: Colors.AccentOn,
  },
  xButton: {
    marginHorizontal: Environment.StandardPadding,
  },
});

export default SelectGameListHeader;
