import { Storage } from "aws-amplify";
import { addVideoToStories } from "../../../redux/shared/homemain";

export interface AddVideoToFeedDataType {
  index: number;
  signedURL: string | null;
}

async function AddVideoToStories({ dispatch, index, contentkey }) {
  const signedURL = await Storage.get(contentkey, { expires: 86400 });
  dispatch(addVideoToStories({ index, signedURL }));
}

export default AddVideoToStories;
