import { Storage } from "aws-amplify";
import { addVideoToStories } from "../../../redux/home/homemain";

async function AddVideoToStories({ dispatch, index, contentkey }) {
  const signedurl = await Storage.get(contentkey, { expires: 86400 });

  const Update = {
    index,
    signedurl,
  };

  dispatch(addVideoToStories(Update));
}

export default AddVideoToStories;
