import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { SearchableGamesFilterInput, SearchGamesQuery } from "../../../../API";
import {
  addNextAllGamesArray,
  setNewAllGamesArray,
  SetNewAllGamesArrayPT,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

interface SearchNextGameTitlePT {
  title: string;
  dispatch: DispatchType;
  nextToken: string;
}

export interface AddNextAllGamesArrayPT {
  nextAllGamesArray: GameCoverTileType[];
  nextAllGamesNextToken: null | string;
}

const GetNextToken = ({ nextToken, items, resultsLimit }) => {
  // Sometimes OpenSearch returns a non-null nextToken, even when we've clearly found all results
  if (nextToken === null || items.length < resultsLimit) {
    return null;
  }
  return nextToken;
};

async function SearchNextGameTitle({
  title,
  dispatch,
  nextToken,
}: SearchNextGameTitlePT) {
  const resultsLimit = 20;
  try {
    const {
      data: { searchGames },
    } = (await API.graphql(
      graphqlOperation(`
        query SearchGames {
            searchGames (
                limit: ${resultsLimit},
                sort: { direction: desc, field: releaseDate },
                nextToken: "${nextToken}",
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

    const nextAllGamesArray: AddNextAllGamesArrayPT = {
      nextAllGamesArray: resultsArray,
      nextAllGamesNextToken: GetNextToken({
        nextToken: newNextToken,
        items: gameResults,
        resultsLimit,
      }),
    };

    dispatch(addNextAllGamesArray(nextAllGamesArray));
  } catch (error) {
    console.log(error);
  }
}

export default SearchNextGameTitle;
