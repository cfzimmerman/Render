import { addVideoToGalleryData } from "../../../redux/profile/profilemain";
import { Storage } from "aws-amplify";
import { DispatchType } from "../../../redux/store";

// Interface used in profilemain redux slice
export interface AddVideoToGalleryDataType {
  index: number;
  signedurl: string;
}

interface AddVideoProps {
  dispatch: DispatchType;
  index: number;
  contentkey: string;
}

async function AddVideoToGalleryData({
  dispatch,
  index,
  contentkey,
}: AddVideoProps) {
  const signedurl: string = await Storage.get(contentkey, { expires: 86400 });

  const update: AddVideoToGalleryDataType = {
    index: index,
    signedurl: signedurl,
  };

  dispatch(addVideoToGalleryData(update));
}

export default AddVideoToGalleryData;
