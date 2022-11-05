import { Storage } from "aws-amplify";
import { addVideoToPublicFeed } from "../../../redux/shared/homemain";

async function AddVideoToPublicFeed({ dispatch, index, contentkey }) {
  const signedURL = await Storage.get(contentkey, { expires: 86400 });

  dispatch(addVideoToPublicFeed({ index, signedURL }));
}

export default AddVideoToPublicFeed;
