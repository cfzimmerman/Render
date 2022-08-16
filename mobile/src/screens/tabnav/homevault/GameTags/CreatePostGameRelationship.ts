import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateUserGamesInput,
  UpdatePostsInput,
  UserGamesByUsersQuery,
} from "../../../../API";
import { createUserGames, updatePosts } from "../../../../graphql/mutations";
import { DispatchType } from "../../../../redux/store";

interface InputTypes {
  gameID: string;
  postID: string;
  userID: string;
  searchMode: "library" | "all" | "unknown";
  dispatch: DispatchType;
}

async function CreatePostGameRelationship({
  gameID,
  postID,
  userID,
  searchMode,
  dispatch,
}: InputTypes) {
  try {
    const updatePostsInput: UpdatePostsInput = {
      id: postID,
      gamesID: gameID,
    };

    const [postResult, relationshipResult] = await Promise.all([
      API.graphql(graphqlOperation(updatePosts, { input: updatePostsInput })),
      API.graphql(
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
      ) as GraphQLResult<UserGamesByUsersQuery>,
    ]);

    if (
      relationshipResult.data.userGamesByUsers.items.length === 0 &&
      typeof userID === "string" &&
      typeof gameID === "string"
    ) {
      const newUserGames: CreateUserGamesInput = {
        usersID: userID,
        gamesID: gameID,
      };

      await API.graphql(
        graphqlOperation(createUserGames, { input: newUserGames })
      );
    }
  } catch (error) {
    console.log(error);
    throw "CreatePostGameRelationship error: " + JSON.stringify(error);
  }
}

export default CreatePostGameRelationship;
