import { Storage } from "aws-amplify";
import { addVideoToPGFullGamePosts } from "../../../redux/explore/exploremain";
import { DispatchType } from "../../../redux/store";

export interface AddVideoToPGFullGamePostsPT {
  index: number;
  signedURL: string;
}

interface InputTypes {
  dispatch: DispatchType;
  contentkey: string;
  index: number;
}

async function AddVideoToPGPosts({ dispatch, contentkey, index }: InputTypes) {
  try {
    const signedURL = await Storage.get(contentkey, { expires: 86400 });

    dispatch(addVideoToPGFullGamePosts({ signedURL, index }));
  } catch (error) {
    console.log(error);
  }
}

export default AddVideoToPGPosts;
