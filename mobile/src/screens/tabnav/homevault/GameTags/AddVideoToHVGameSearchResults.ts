import { DispatchType } from "../../../../redux/store";
import * as FileSystem from "expo-file-system";
import {
  LSLibraryItemType,
  SyncPreferenceType,
} from "../../../../redux/system/localsync";
import { Storage } from "aws-amplify";
import LSAddItem from "../../profile/LSAddItem";
import { addVideoToHVGameSearchResults } from "../../../../redux/homevault/gametags";

export interface AddVideoToHVGameSearchResultsInputTypes {
  signedurl: string;
  index: number;
}

interface InputTypes {
  dispatch: DispatchType;
  index: number;
  contentkey: string;
  syncPreference: SyncPreferenceType;
  localLibrary: Record<string, LSLibraryItemType>;
}

async function AddVideoToHVGameSearchResults({
  dispatch,
  index,
  contentkey,
  syncPreference,
  localLibrary,
}: InputTypes) {
  try {
    const contentAddress =
      FileSystem.documentDirectory + "LocalSync/" + contentkey;
    const { exists } = await FileSystem.getInfoAsync(contentAddress);

    if (exists === true) {
      const update: AddVideoToHVGameSearchResultsInputTypes = {
        index,
        signedurl: contentAddress,
      };
      dispatch(addVideoToHVGameSearchResults(update));
    } else {
      const signedurl = await Storage.get(contentkey, { expires: 86400 });
      const update: AddVideoToHVGameSearchResultsInputTypes = {
        index,
        signedurl,
      };
      dispatch(addVideoToHVGameSearchResults(update));

      if (syncPreference === "All") {
        LSAddItem({
          contentkey,
          signedurl,
          localLibrary,
          dispatch,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default AddVideoToHVGameSearchResults;
