import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DispatchType } from "../../../../redux/store";
import { TextButton } from "../../../../resources/atoms";
import { Colors, GlobalStyles } from "../../../../resources/project";
import { Environment } from "../../../../resources/project";
import { GameCoverTileType } from "./GameCoverTile";
import GetNextCurrentUserGameLibrary from "./GetNextCurrentUserGameLibrary";
import SearchGameTitle from "./SearchGameTitle";

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
    SearchGameTitle({ title, dispatch, nextToken });
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
    return <TextButton title={""} disabled={true} Action={() => null} />;
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

export default SelectGameListFooter;
