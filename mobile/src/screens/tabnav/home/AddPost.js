import { Storage } from "aws-amplify";
import AddToAddedFeed from "./AddToAddedFeed";
import AddToPublicFeed from "./AddToPublicFeed";

async function AddPost({ dispatch, item, usecase }) {
  if (usecase === "addedfeed") {
    if (item.contenttype === "video") {
      const signedurl = null;
      const thumbnailurl = await Storage.get(item.thumbnailkey, {
        expires: 86400,
      });
      AddToAddedFeed({
        dispatch, item, signedurl, thumbnailurl,
      });
    } else if (item.contenttype === "image") {
      const signedurl = await Storage.get(item.contentkey, { expires: 86400 });
      const thumbnailurl = null;
      AddToAddedFeed({
        dispatch, item, signedurl, thumbnailurl,
      });
    }
  } else if (usecase === "publicfeed") {
    if (item.contenttype === "video") {
      const signedurl = null;
      const thumbnailurl = await Storage.get(item.thumbnailkey, {
        expires: 86400,
      });
      AddToPublicFeed({
        dispatch, item, signedurl, thumbnailurl,
      });
    } else if (item.contenttype === "image") {
      const signedurl = await Storage.get(item.contentkey, { expires: 86400 });
      const thumbnailurl = null;
      AddToPublicFeed({
        dispatch, item, signedurl, thumbnailurl,
      });
    }
  }
}

export default AddPost;
