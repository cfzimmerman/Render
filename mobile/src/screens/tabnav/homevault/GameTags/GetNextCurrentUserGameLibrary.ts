import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { UserGamesByUsersQuery } from "../../../../API";
import {
  addNextLibraryGamesArray,
  setNewLibraryGamesArray,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

export interface SetNextLibraryGamesArrayInput {
  nextLibraryGamesArray: GameCoverTileType[];
  nextLibraryGamesNextToken: string | null;
}

interface InputTypes {
  currentUserID: string;
  dispatch: DispatchType;
  nextToken: string;
}

async function GetNextCurrentUserGameLibrary({
  currentUserID,
  dispatch,
  nextToken,
}: InputTypes) {
  try {
    const queryLimit = 1000;
    const result = (await API.graphql(
      graphqlOperation(`
        query UserGamesByUsers {
            userGamesByUsers (
                limit: ${queryLimit},
                usersID: "${currentUserID}",
                nextToken: "${nextToken}"
            ) {
                items {
                    id
                    Games {
                        id
                        title
                        coverID
                        backgroundID
                    }
                }
                nextToken
            }
        }
    `)
    )) as GraphQLResult<UserGamesByUsersQuery>;

    const gameLibrary = [];

    result.data.userGamesByUsers.items.forEach((item) => {
      const gameItem: GameCoverTileType = {
        id: item.Games.id,
        title: item.Games.title,
        coverID: item.Games.coverID,
        backgroundID: item.Games.backgroundID,
      };
      const isDuplicate = gameLibrary.findIndex(
        (element: GameCoverTileType) => element.id === item.Games.id
      );
      if (isDuplicate === -1) {
        gameLibrary.push(gameItem);
      }
    });

    const nextLibraryGamesArray: SetNextLibraryGamesArrayInput = {
      nextLibraryGamesArray: gameLibrary,
      nextLibraryGamesNextToken: result.data.userGamesByUsers.nextToken,
    };

    dispatch(addNextLibraryGamesArray(nextLibraryGamesArray));
  } catch (error) {
    console.log(error);
  }
}

export default GetNextCurrentUserGameLibrary;
