import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { GetPostsQuery } from "../../../../API";
import { DispatchType } from "../../../../redux/store";

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
    const gameResult = (await API.graphql(
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

    if (gameResult.data.getPosts.gamesID != null) {
    }

    console.log(gameResult);
  } catch (error) {
    console.log(error);
    throw new Error(
      "RemovePostGameRelationship Error: " + JSON.stringify(error)
    );
  }
}

export default RemovePostGameRelationship;
