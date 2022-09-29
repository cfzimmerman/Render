import {
  addNextAllGamesArray,
  setNewAllGamesArray,
  SetNewAllGamesArrayPT,
} from "../../../../redux/shared/gametags";
import { DispatchType } from "../../../../redux";
import {
  GetSearchableNextToken,
  RemoveSmartApostrophe,
} from "../../../../resources/utilities";
import { GameCoverTileType } from "../components/GameCoverTile";
import GetGameTitleSearchResults from "./GetGameTitleSearchResults";

interface SearchGameTitlePT {
  title: string;
  dispatch: DispatchType;
  nextToken: string | null;
}

export interface AddNextAllGamesArrayPT {
  nextAllGamesArray: GameCoverTileType[];
  nextAllGamesNextToken: null | string;
}

async function SearchGameTitle({
  title,
  dispatch,
  nextToken,
}: SearchGameTitlePT) {
  const formattedTitle = RemoveSmartApostrophe(title);
  const resultsLimit = 10;
  try {
    const {
      data: { searchGames },
    } = await GetGameTitleSearchResults({
      title: formattedTitle,
      resultsLimit,
      origin: "SearchGameTitle",
      nextToken,
    });

    const gameResults = searchGames.items;
    const newNextToken = searchGames.nextToken;

    const resultsArray = [];

    if (gameResults.length > 0) {
      gameResults.forEach((item) => {
        const gameItem: GameCoverTileType = {
          id: item.id,
          title: item.title,
          coverID: item.coverID,
          backgroundID: item.backgroundID,
        };
        resultsArray.push(gameItem);
      });
    }

    if (nextToken === null) {
      const newAllGamesArray: SetNewAllGamesArrayPT = {
        newAllGamesArray: resultsArray,
        newAllGamesNextToken: GetSearchableNextToken({
          nextToken: newNextToken,
          items: gameResults,
          resultsLimit,
        }),
      };
      dispatch(setNewAllGamesArray(newAllGamesArray));
    } else if (typeof nextToken === "string") {
      const nextAllGamesArray: AddNextAllGamesArrayPT = {
        nextAllGamesArray: resultsArray,
        nextAllGamesNextToken: GetSearchableNextToken({
          nextToken: newNextToken,
          items: gameResults,
          resultsLimit,
        }),
      };
      dispatch(addNextAllGamesArray(nextAllGamesArray));
    }
  } catch (error) {
    console.log(error);
  }
}

export default SearchGameTitle;
