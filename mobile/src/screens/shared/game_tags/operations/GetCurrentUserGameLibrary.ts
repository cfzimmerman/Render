import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { UserGamesByUsersQuery } from "../../../../API";
import { setNewLibraryGamesArray } from "../../../../redux/shared/gametags";
import { DispatchType } from "../../../../redux";
import { GameCoverTileType } from "../components/GameCoverTile";
import GetNextCurrentUserGameLibrary from "./GetNextCurrentUserGameLibrary";

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
    const queryLimit = 1000;
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

    const nextToken = result.data.userGamesByUsers.nextToken;
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
      newLibraryGamesNextToken: nextToken,
    };

    dispatch(setNewLibraryGamesArray(newLibraryGamesArray));

    if (nextToken != null) {
      GetNextCurrentUserGameLibrary({ currentUserID, dispatch, nextToken });
    }
  } catch (error) {
    console.log(error);
  }
}

export default GetCurrentUserGameLibrary;
