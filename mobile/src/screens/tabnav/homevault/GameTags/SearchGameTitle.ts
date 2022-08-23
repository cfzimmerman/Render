import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { SearchableGamesFilterInput, SearchGamesQuery } from "../../../../API";
import {
  setNewAllGamesArray,
  SetNewAllGamesArrayPT,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

interface SearchGameTitlePT {
  title: string;
  dispatch: DispatchType;
}

const GetNextToken = ({ nextToken, items, resultsLimit }) => {
  // Sometimes OpenSearch returns a non-null nextToken, even when we've clearly found all results
  if (nextToken === null || items.length < resultsLimit) {
    return null;
  }
  return nextToken;
};

async function SearchGameTitle({ title, dispatch }: SearchGameTitlePT) {
  const resultsLimit = 10;
  try {
    const {
      data: { searchGames },
    } = (await API.graphql(
      graphqlOperation(`
        query SearchGames {
            searchGames (
                limit: ${resultsLimit},
                sort: { direction: desc, field: releaseDate },
                filter: {
                  title: {
                    wildcard: "*${title}*"
                  }
                }

            ) {
                items {
                    id
                    title
                    coverID
                    backgroundID
                }
                nextToken
            }
        }
    `)
    )) as GraphQLResult<SearchGamesQuery>;

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
      newAllGamesNextToken: GetNextToken({
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
