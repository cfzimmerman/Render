import { API, graphqlOperation } from "aws-amplify";
import { UpdatePostsInput } from "../../../../API";
import { updatePosts } from "../../../../graphql/mutations";
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
    await API.graphql(
      graphqlOperation(updatePosts, { input: updatePostsInput })
    );
    // Check if user/game relationship exists
    // Add gameID to post object
  } catch (error) {
    console.log(error);
    throw "CreatePostGameRelationship error: " + JSON.stringify(error);
  }
}

export default CreatePostGameRelationship;
