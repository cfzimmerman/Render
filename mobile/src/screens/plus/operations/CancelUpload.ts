import { Storage, API, graphqlOperation } from "aws-amplify";
import { deletePosts } from "../../../graphql/mutations";

import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
  setUploadObject,
  setUploadCanceledTrue,
} from "../../../redux/shared/loadprogressmessage";

async function CancelUpload({ dispatch, uploadobject }) {
  dispatch(setUploadCanceledTrue());

  console.log("Cancel Upload");

  const videoUpload = uploadobject.video;
  const thumbnailUpload = uploadobject.thumbnail;

  try {
    Storage.cancel(videoUpload);
    Storage.cancel(thumbnailUpload);

    const [s3Video, s3Thumbnail] = await Promise.all([
      Storage.get(uploadobject.video.key),
      Storage.get(uploadobject.thumbnail.key),
    ]);

    if (typeof s3Video !== "undefined" && s3Video != null) {
      await Storage.remove(uploadobject.video.key);
    }

    if (typeof s3Thumbnail !== "undefined" && s3Thumbnail != null) {
      await Storage.remove(uploadobject.thumbnail.key);
    }

    const postResult = await API.graphql(
      graphqlOperation(`
            query PostsByContentKey {
                postsByContentKey (
                    contentkey: "${uploadobject.video.key}"
                ) {
                    items {
                        id
                    }
                }
            }
        `)
    );
    // @ts-ignore 🛑 Fix this later
    if (postResult.data.postsByContentKey.items.length > 0) {
      await API.graphql(
        graphqlOperation(deletePosts, { id: uploadobject.video.key })
      );
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  dispatch(setPercentComplete("Canceled"));
  setTimeout(() => {
    dispatch(setLoadProgressInactive());
  }, 1000);
}

export default CancelUpload;
