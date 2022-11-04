import { Storage } from "aws-amplify";
import { addVideoToPublicFeed } from "../../../redux/shared/homemain";

async function AddVideoToPublicFeed({ dispatch, index, contentkey }) {
  const signedurl = await Storage.get(contentkey, { expires: 86400 });

  const update = {
    index,
    signedurl,
  };

  dispatch(addVideoToPublicFeed(update));
}

export default AddVideoToPublicFeed;
