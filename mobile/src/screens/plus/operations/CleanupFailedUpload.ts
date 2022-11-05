import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { PostsByContentKeyQuery } from "../../../API";
import { deletePosts } from "../../../graphql/mutations";

async function CleanupFailedUpload({
  origin,
  imagename,
  videoname,
  thumbnailname,
  contenttype,
  contentkey,
}) {
  // Origins: "UploadImage", "UploadVideo", "AddToDB"
  if (origin === "UploadImage") {
    await Storage.remove(imagename);
  } else if (origin === "UploadVideo") {
    await Promise.all([
      Storage.remove(videoname),
      Storage.remove(thumbnailname),
    ]);
  } else if (origin === "AddToDB") {
    const postResult = (await API.graphql(
      graphqlOperation(`
            query PostsByContentKey {
                postsByContentKey (
                    contentkey: "${contentkey}"
                ) {
                    items {
                        id
                    }
                }
            }
        `)
    )) as GraphQLResult<PostsByContentKeyQuery>;

    if (postResult.data.postsByContentKey.items.length > 0) {
      await API.graphql(graphqlOperation(deletePosts, { id: contentkey }));
    }

    await Storage.remove(contentkey);

    if (contenttype === "video") {
      await Storage.remove(thumbnailname);
    }
  }
}

export default CleanupFailedUpload;
