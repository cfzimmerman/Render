import { DispatchType } from "../../../redux/store";
import GetGameTitleSearchResults from "../homevault/GameTags/GetGameTitleSearchResults";
import {
  GetSearchableNextToken,
  RemoveSmartApostrophe,
} from "../../../resources/utilities";
import { GameCoverTileType } from "../homevault/GameTags/GameCoverTile";
import {
  addNextPGSearchResults,
  setPGSearchResult,
} from "../../../redux/explore/exploremain";

export interface SetPGSearchResultInputTypes {
  resultsArray: GameCoverTileType[];
  nextNextToken: string | null;
}

interface InputTypes {
  input: string;
  dispatch: DispatchType;
  nextToken: string | null;
}

async function PGSearchTitles({ input, dispatch, nextToken }: InputTypes) {
  try {
    const formattedTitle = RemoveSmartApostrophe(input);
    const resultsLimit = 10;
    const {
      data: { searchGames },
    } = await GetGameTitleSearchResults({
      title: formattedTitle,
      resultsLimit,
      origin: "PGSearchTitles",
      nextToken,
    });

    const gameResults = searchGames.items;
    const nextNextToken = searchGames.nextToken;

    const resultsArray: GameCoverTileType[] = [];

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

    const newResults: SetPGSearchResultInputTypes = {
      resultsArray,
      nextNextToken: GetSearchableNextToken({
        nextToken: nextNextToken,
        items: gameResults,
        resultsLimit,
      }),
    };

    if (nextToken === null) {
      dispatch(setPGSearchResult(newResults));
    } else if (typeof nextToken === "string") {
      // NOTE: This is the old nextToken, not the nextNextToken. This tells us whether or not we're adding to an existing query.
      dispatch(addNextPGSearchResults(newResults));
    }
  } catch (error) {
    console.log(error);
  }
}

export default PGSearchTitles;
