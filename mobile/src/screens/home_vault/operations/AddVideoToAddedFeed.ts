import { Storage } from "aws-amplify";
import { addVideoToAddedFeed } from "../../../redux/shared/homemain";

async function AddVideoToAddedFeed({ dispatch, index, contentkey }) {
  const signedURL = await Storage.get(contentkey, { expires: 86400 });

  const Update = {
    index,
    signedURL,
  };

  dispatch(addVideoToAddedFeed(Update));
}

export default AddVideoToAddedFeed;
