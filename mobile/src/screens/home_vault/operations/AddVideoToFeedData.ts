import * as FileSystem from "expo-file-system";
import { addVideoToFeedData } from "../../../redux/shared/vaultpostdata";
import { Storage } from "aws-amplify";
import { LSLibraryItemType } from "../../../redux/shared/localsync";
import { DispatchType } from "../../../redux";
import LSAddItem from "../../shared/local_sync/operations/LSAddItem";
import { AddVideoToFeedDataType } from "./AddVideoToStories";

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
    const update: AddVideoToFeedDataType = {
      index: index,
      signedURL: contentAddress,
    };
    dispatch(addVideoToFeedData(update));
  } else {
    const signedURL = await Storage.get(contentkey, { expires: 86400 });

    dispatch(addVideoToFeedData({ index, signedURL }));

    if (syncPreference === "All") {
      LSAddItem({
        contentkey,
        signedurl: signedURL,
        localLibrary,
        dispatch,
      });
    }
  }
}

export default AddVideoToFeedData;
