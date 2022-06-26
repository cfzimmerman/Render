// Viewer discretion advised
// After posts are sentenced by DeletePost.js, they're executed here 30 days later
// The delay allows them time to get their affairs in order and say goodbye.

import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { DeletePostsMutation } from "../../../API";
import { deletePosts } from "../../../graphql/mutations";

async function ExecutePost({ postID }) {
  try {
    const deletePostResult = (await API.graphql(
      graphqlOperation(deletePosts, { input: { id: postID } })
    )) as GraphQLResult<DeletePostsMutation>;

    const deletedPost = deletePostResult.data.deletePosts;

    if (deletedPost != undefined) {
      if (deletedPost.contenttype === "video") {
        await Promise.all([
          Storage.remove(deletedPost.contentkey),
          Storage.remove(deletedPost.thumbnailkey),
        ]);
      } else if (deletedPost.contenttype === "image") {
        await Storage.remove(deletedPost.contentkey);
      }
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default ExecutePost;
