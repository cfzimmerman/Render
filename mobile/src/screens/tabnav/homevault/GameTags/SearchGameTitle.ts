import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { SearchableGamesFilterInput, SearchGamesQuery } from "../../../../API";
import {
  setNewAllGamesArray,
  SetNewAllGamesArrayPT,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import {
  GetSearchableNextToken,
  RemoveSmartApostrophe,
} from "../../../../resources/utilities";
import { GameCoverTileType } from "./GameCoverTile";
import GetGameTitleSearchResults from "./GetGameTitleSearchResults";

interface SearchGameTitlePT {
  title: string;
  dispatch: DispatchType;
  nextToken: string | null;
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

    const newAllGamesArray: SetNewAllGamesArrayPT = {
      newAllGamesArray: resultsArray,
      newAllGamesNextToken: GetSearchableNextToken({
        nextToken: newNextToken,
        items: gameResults,
        resultsLimit,
      }),
    };

    dispatch(setNewAllGamesArray(newAllGamesArray));
  } catch (error) {
    console.log(error);
  }
}

export default SearchGameTitle;
