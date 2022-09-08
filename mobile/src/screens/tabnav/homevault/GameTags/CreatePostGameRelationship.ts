import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateUserGamesInput,
  CreateUserGamesMutation,
  GetGamesQuery,
  GetPostsQuery,
  GetUserGamesQuery,
  UpdateGamesInput,
  UpdateGamesMutation,
  UpdatePostsInput,
  UserGamesByUsersQuery,
} from "../../../../API";
import {
  createUserGames,
  updateGames,
  updatePosts,
} from "../../../../graphql/mutations";
import { addNewLibraryGame } from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

interface InputTypes {
  gameID: string;
  postID: string;
  userID: string;
  searchMode: "library" | "all" | "unknown";
  dispatch: DispatchType;
  selectedPostsIndex: number;
}

async function CreatePostGameRelationship({
  gameID,
  postID,
  userID,
  searchMode,
  dispatch,
  selectedPostsIndex,
}: InputTypes) {
  try {
    const {
      data: {
        getPosts: { contentdate: postContentDate },
      },
    } = (await API.graphql(
      graphqlOperation(`
              query GetPosts {
                  getPosts (
                      id: "${postID}"
                  ) {
                      contentdate
                  }
              }
          `)
    )) as GraphQLResult<GetPostsQuery>;

    const updatePostsInput: UpdatePostsInput = {
      id: postID,
      gamesID: gameID,
      contentdate: postContentDate,
    };

    await API.graphql(
      graphqlOperation(updatePosts, { input: updatePostsInput })
    );

    if (selectedPostsIndex === 0 && gameID != null) {
      // Only query whether to add a relationship for the first post in an array. Every other post will have the same gameID based on this structure.
      const relationshipResult = (await API.graphql(
        graphqlOperation(`
          query GetGames {
              getGames (
                  id: "${gameID}"
              ) {
                  id
                  title
                  numUserGames
                  UserGames (
                      usersID: {
                          eq: "${userID}"
                      }
                  ) {
                      items {
                          id
                          usersID
                      }
                  }
              }
          }
      `)
      )) as GraphQLResult<GetGamesQuery>;

      if (
        relationshipResult.data.getGames.UserGames.items.length === 0 &&
        typeof userID === "string" &&
        typeof gameID === "string"
      ) {
        const newUserGames: CreateUserGamesInput = {
          usersID: userID,
          gamesID: gameID,
        };

        const currentNumUserGames =
          relationshipResult.data.getGames.numUserGames;

        const GetUpdatedGame = () => {
          if (currentNumUserGames === null) {
            return {
              id: gameID,
              numUserGames: 1,
              type: "games",
            };
          } else {
            return {
              id: gameID,
              numUserGames: currentNumUserGames + 1,
            };
          }
        };

        const [
          {
            data: { createUserGames: newRelation },
          },
          updateGamesResult,
        ] = await Promise.all([
          API.graphql(
            graphqlOperation(createUserGames, { input: newUserGames })
          ) as GraphQLResult<CreateUserGamesMutation>,
          API.graphql(
            graphqlOperation(updateGames, { input: GetUpdatedGame() })
          ) as GraphQLResult<UpdateGamesMutation>,
        ]);

        const newLibraryGame: GameCoverTileType = {
          id: gameID,
          title: newRelation.Games.title,
          coverID: newRelation.Games.coverID,
          backgroundID: newRelation.Games.backgroundID,
        };
        dispatch(addNewLibraryGame(newLibraryGame));
      }
    }
    return "success";
  } catch (error) {
    console.log(error);
    throw "CreatePostGameRelationship error: " + JSON.stringify(error);
  }
}

export default CreatePostGameRelationship;
