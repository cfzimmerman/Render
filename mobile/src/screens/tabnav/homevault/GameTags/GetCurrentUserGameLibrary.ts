import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { UserGamesByUsersQuery } from "../../../../API";
import { setNewLibraryGamesArray } from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

interface InputTypes {
  currentUserID: string;
  dispatch: DispatchType;
}

export interface SetNewLibraryGamesArrayInput {
  newLibraryGamesArray: GameCoverTileType[];
  newLibraryGamesNextToken: string | null;
}

async function GetCurrentUserGameLibrary({
  currentUserID,
  dispatch,
}: InputTypes) {
  try {
    const queryLimit = 100;
    const result = (await API.graphql(
      graphqlOperation(`
        query UserGamesByUsers {
            userGamesByUsers (
                limit: ${queryLimit},
                usersID: "${currentUserID}",
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

    const newLibraryGamesArray: SetNewLibraryGamesArrayInput = {
      newLibraryGamesArray: gameLibrary,
      newLibraryGamesNextToken: result.data.userGamesByUsers.nextToken,
    };

    dispatch(setNewLibraryGamesArray(newLibraryGamesArray));
  } catch (error) {
    console.log(error);
  }
}

export default GetCurrentUserGameLibrary;
