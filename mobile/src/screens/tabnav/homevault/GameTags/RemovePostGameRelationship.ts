import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  GetPostsQuery,
  PostsByUserGamesQuery,
  UpdatePostsInput,
  UserGamesByUsersQuery,
  DeleteUserGamesInput,
} from "../../../../API";
import { deleteUserGames, updatePosts } from "../../../../graphql/mutations";
import { removeLibraryGame } from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { GameCoverTileType } from "./GameCoverTile";

interface InputTypes {
  postID: string;
  currentUserID: string;
  dispatch: DispatchType;
}

async function RemovePostGameRelationship({
  postID,
  currentUserID,
  dispatch,
}: InputTypes) {
  try {
    // Get ID of the game being untagged (before anything is deleted)
    const {
      data: { getPosts: gameResult },
    } = (await API.graphql(
      graphqlOperation(`
          query GetPosts {
              getPosts (
                  id: "${postID}"
              ) {
                  id
                  gamesID
              }
          }
      `)
    )) as GraphQLResult<GetPostsQuery>;

    if (gameResult.gamesID != null) {
      const checkLimit = 3;
      // Check if the user has other posts tagged with that same game. If not, delete the user/game relationship.
      const {
        data: {
          postsByUserGames: { items: postResults },
        },
      } = (await API.graphql(
        graphqlOperation(`
          query PostsByUserGames {
            postsByUserGames (
              limit: ${checkLimit},
              usersID: "${currentUserID}",
              gamesID: {
                eq: "${gameResult.gamesID}"
              },
              filter: {
                cognitosub: {
                    ne: "deleted"
                }
              },
            ) {
              items {
                id
              }
            }
          }
      `)
      )) as GraphQLResult<PostsByUserGamesQuery>;

      if (postResults.length === 1) {
        const {
          data: {
            userGamesByUsers: { items: userGamesResult },
          },
        } = (await API.graphql(
          graphqlOperation(`
            query UserGamesByUsers {
              userGamesByUsers (
                usersID: "${currentUserID}",
                limit: 1,
                gamesID: {
                  eq: "${gameResult.gamesID}"
                }
              ) {
                items {
                  id
                }
              }
            }
          `)
        )) as GraphQLResult<UserGamesByUsersQuery>;

        if (userGamesResult.length > 0) {
          const deleteID: DeleteUserGamesInput = {
            id: userGamesResult[0].id,
          };

          await API.graphql(
            graphqlOperation(deleteUserGames, { input: deleteID })
          );
          dispatch(removeLibraryGame(gameResult.gamesID));
        }
      }

      const updatePostsInput: UpdatePostsInput = {
        id: postID,
        gamesID: null,
      };

      // Finally, release the post/game relationship back to null
      await API.graphql(
        graphqlOperation(updatePosts, { input: updatePostsInput })
      );
    }
    return "success";
  } catch (error) {
    console.log(error);
    throw new Error("RemovePostGameRelationship Error: " + error);
  }
}

export default RemovePostGameRelationship;
