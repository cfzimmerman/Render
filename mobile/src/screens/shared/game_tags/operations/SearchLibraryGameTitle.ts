import { setLibraryGamesSearchResults } from "../../../../redux/shared/gametags";
import { DispatchType } from "../../../../redux";
import { GameCoverTileType } from "../components/GameCoverTile";
import GetNextCurrentUserGameLibrary from "./GetNextCurrentUserGameLibrary";

interface InputTypes {
  title: string;
  libraryGamesArray: GameCoverTileType[];
  libraryGamesNextToken: string | null;
  currentUserID: string;
  dispatch: DispatchType;
}

async function SearchLibraryGameTitle({
  title,
  libraryGamesArray,
  libraryGamesNextToken,
  currentUserID,
  dispatch,
}: InputTypes) {
  try {
    if (libraryGamesNextToken != null) {
      GetNextCurrentUserGameLibrary({
        currentUserID,
        dispatch,
        nextToken: libraryGamesNextToken,
      });
    }
    const filteredResults: GameCoverTileType[] = libraryGamesArray.filter(
      (item: GameCoverTileType) =>
        true === item.title.toUpperCase().includes(title.toUpperCase())
    );

    dispatch(setLibraryGamesSearchResults(filteredResults));
  } catch (error) {
    console.log(error);
  }
}

export default SearchLibraryGameTitle;
