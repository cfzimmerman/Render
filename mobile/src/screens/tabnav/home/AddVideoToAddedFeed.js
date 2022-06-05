import { Storage } from "aws-amplify";
import { addVideoToAddedFeed } from "../../../redux/home/homemain";

async function AddVideoToAddedFeed({ dispatch, index, contentkey }) {
  const signedurl = await Storage.get(contentkey, { expires: 86400 });

  const Update = {
    index,
    signedurl,
  };

  dispatch(addVideoToAddedFeed(Update));
}

export default AddVideoToAddedFeed;
