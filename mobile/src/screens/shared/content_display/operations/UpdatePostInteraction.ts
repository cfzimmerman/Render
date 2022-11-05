import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { PostViewByPostIDQuery } from "../../../../API";
import { createPostViewTracker } from "../../../../graphql/mutations";

async function UpdatePostInteraction({ postid, currentuserid }) {
  if (typeof postid !== "undefined" && typeof currentuserid !== "undefined") {
    const result = (await API.graphql(
      graphqlOperation(`
            query PostViewByPostID {
                postViewByPostID (
                    limit: 1,
                    postsID: "${postid}",
                    viewerID: { 
                        eq: "${currentuserid}"
                    }
                ) {
                    items {
                        id
                    }
                }
            }
        `)
    )) as GraphQLResult<PostViewByPostIDQuery>;

    const viewarray = result.data.postViewByPostID.items;

    if (viewarray.length === 0) {
      const newinteraction = {
        postsID: postid,
        viewerID: currentuserid,
      };

      await API.graphql(
        graphqlOperation(createPostViewTracker, { input: newinteraction })
      );
    }
  }
}

export default UpdatePostInteraction;
