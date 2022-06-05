import { addVideoToFeedData } from "../../../redux/vault/vaultpostdata";
import { Storage } from "aws-amplify";

export interface AddVideoToFeedDataPropsType {
  index: number;
  signedurl: string;
}

async function AddVideoToFeedData({ dispatch, index, contentkey }) {
  const signedurl = await Storage.get(contentkey, { expires: 86400 });

  const update = {
    index: index,
    signedurl: signedurl,
  };

  dispatch(addVideoToFeedData(update));
}

export default AddVideoToFeedData;
