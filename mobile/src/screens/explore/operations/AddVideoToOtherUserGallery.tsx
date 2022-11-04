import { Storage } from "aws-amplify";
import { addVideoToOtherUserGalleryData } from "../../../redux/shared/otheruserprofile";

async function AddVideoToOtherUserGallery({ dispatch, index, contentkey }) {
  const signedURL = await Storage.get(contentkey, { expires: 86400 });

  dispatch(addVideoToOtherUserGalleryData({ signedURL, index }));
}

export default AddVideoToOtherUserGallery;
