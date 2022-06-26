import * as FileSystem from "expo-file-system";
import { addVideoToGalleryData } from "../../../redux/profile/profilemain";
import { Storage } from "aws-amplify";
import { LSLibraryItemType } from "../../../redux/system/localsync";
import { DispatchType } from "../../../redux/store";
import LSAddItem from "./LSAddItem";

// Interface used in profilemain redux slice
export interface AddVideoToGalleryDataType {
  index: number;
  signedurl: string;
}

interface AddVideoProps {
  dispatch: DispatchType;
  index: number;
  contentkey: string;
  syncPreference: "All" | "Partial" | "None";
  localLibrary: Record<string, LSLibraryItemType>;
}

async function AddVideoToGalleryData({
  dispatch,
  index,
  contentkey,
  localLibrary,
  syncPreference,
}: AddVideoProps) {
  const contentAddress =
    FileSystem.documentDirectory + "LocalSync/" + contentkey;
  const contentExists = await FileSystem.getInfoAsync(contentAddress);

  if (contentExists.exists === true) {
    const signedurl = contentAddress;

    const update: AddVideoToGalleryDataType = {
      index: index,
      signedurl: signedurl,
    };

    dispatch(addVideoToGalleryData(update));
  } else {
    const signedurl: string = await Storage.get(contentkey, { expires: 86400 });

    const update: AddVideoToGalleryDataType = {
      index: index,
      signedurl: signedurl,
    };

    dispatch(addVideoToGalleryData(update));

    if (syncPreference === "All") {
      LSAddItem({
        contentkey,
        signedurl,
        localLibrary,
        dispatch,
      });
    }
  }
}

export default AddVideoToGalleryData;
