import { Storage } from "aws-amplify";
import { addVideoToOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";

async function AddVideoToOtherUserGallery({ dispatch, index, contentkey }) {
  const signedurl = await Storage.get(contentkey, { expires: 86400 });

  const Update = {
    index,
    signedurl,
  };

  dispatch(addVideoToOtherUserGalleryData(Update));
}

export default AddVideoToOtherUserGallery;
