import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DispatchType } from "../../../../redux/store";
import { Colors, GlobalStyles } from "../../../../resources/project";
import { Environment } from "../../../../resources/project";
import { GameCoverTileType } from "./GameCoverTile";
import GetNextCurrentUserGameLibrary from "./GetNextCurrentUserGameLibrary";
import SearchNextGameTitle from "./SearchNextGameTitle";

interface TextButtonPT {
  Action: Function;
  disabled: boolean;
  title: string;
}

const TextButton = ({ Action, disabled, title }: TextButtonPT) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => Action()}
      style={styles.textButtonHolder}
    >
      <Text
        style={[
          GlobalStyles.h4text,
          GlobalStyles.irregularshadow,
          styles.textButtonTitle,
          {
            textDecorationLine: disabled === true ? "none" : "underline",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface ListFooterPT {
  nextToken: null | string;
  listData: GameCoverTileType[];
  searchMode: "library" | "all";
  title: string;
  dispatch: DispatchType;
  currentUserID: string;
}

const GetMore = ({ searchMode, title, dispatch, nextToken, currentUserID }) => {
  if (searchMode === "all") {
    SearchNextGameTitle({ title, dispatch, nextToken });
  } else if (searchMode === "library") {
    GetNextCurrentUserGameLibrary({ dispatch, nextToken, currentUserID });
  }
};

const SelectGameListFooter = ({
  nextToken,
  listData,
  searchMode,
  title,
  dispatch,
  currentUserID,
}: ListFooterPT) => {
  if (listData === null || listData.length === 0 || searchMode === "library") {
    return null;
  } else if (nextToken === null) {
    return (
      <TextButton
        title={"All results displayed"}
        disabled={true}
        Action={() => null}
      />
    );
  } else {
    return (
      <TextButton
        title={"Get more results"}
        disabled={false}
        Action={() =>
          GetMore({ searchMode, title, dispatch, nextToken, currentUserID })
        }
      />
    );
  }
};

const styles = StyleSheet.create({
  textButtonHolder: {
    width: Environment.FullBar,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Environment.CubeSize,
    marginTop: Environment.LargePadding,
  },
  textButtonTitle: {
    color: Colors.AccentOn,
  },
});

export default SelectGameListFooter;
