import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateUserGamesInput,
  CreateUserGamesMutation,
  GetPostsQuery,
  UpdatePostsInput,
  UserGamesByUsersQuery,
} from "../../../../API";
import { createUserGames, updatePosts } from "../../../../graphql/mutations";
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
      const relationshipResult = (await API.graphql(
        graphqlOperation(`
          query UserGamesByUsers {
            userGamesByUsers (
              usersID: "${userID}",
              limit: 1,
              gamesID: {
                eq: "${gameID}"
              }
            ) {
              items {
                id
              }
            }
          }
        `)
      )) as GraphQLResult<UserGamesByUsersQuery>;

      if (
        relationshipResult.data.userGamesByUsers.items.length === 0 &&
        typeof userID === "string" &&
        typeof gameID === "string"
      ) {
        const newUserGames: CreateUserGamesInput = {
          usersID: userID,
          gamesID: gameID,
        };

        const {
          data: { createUserGames: newRelation },
        } = (await API.graphql(
          graphqlOperation(createUserGames, { input: newUserGames })
        )) as GraphQLResult<CreateUserGamesMutation>;

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
