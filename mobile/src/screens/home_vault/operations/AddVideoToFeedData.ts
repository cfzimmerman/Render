import * as FileSystem from "expo-file-system";
import { addVideoToFeedData } from "../../../redux/shared/vaultpostdata";
import { Storage } from "aws-amplify";
import { LSLibraryItemType } from "../../../redux/shared/localsync";
import { DispatchType } from "../../../redux";
import LSAddItem from "../../shared/local_sync/operations/LSAddItem";

export interface AddVideoToFeedDataPropsType {
  index: number;
  signedurl: string;
}

async function AddVideoToFeedData({
  dispatch,
  index,
  contentkey,
  syncPreference,
  localLibrary,
}: {
  dispatch: DispatchType;
  index: number;
  contentkey: string;
  syncPreference: "All" | "Partial" | "None";
  localLibrary: {} | Record<string, LSLibraryItemType>;
}) {
  const contentAddress =
    FileSystem.documentDirectory + "LocalSync/" + contentkey;
  const contentExists = await FileSystem.getInfoAsync(contentAddress);

  if (contentExists.exists === true) {
    const update: AddVideoToFeedDataPropsType = {
      index: index,
      signedurl: contentAddress,
    };
    dispatch(addVideoToFeedData(update));
  } else {
    const signedurl = await Storage.get(contentkey, { expires: 86400 });

    const update: AddVideoToFeedDataPropsType = {
      index: index,
      signedurl: signedurl,
    };

    dispatch(addVideoToFeedData(update));

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

export default AddVideoToFeedData;
