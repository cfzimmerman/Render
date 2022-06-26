import * as FileSystem from "expo-file-system";
import { Storage } from "aws-amplify";
import { setPfpSignedUrl } from "../../../redux/profile/profilemain";
import LSAddItem from "./LSAddItem";
import { LSLibraryItemType } from "../../../redux/system/localsync";
import { DispatchType } from "../../../redux/store";

interface GetPfpPropTypes {
  dispatch: DispatchType;
  pfpkey: string;
  syncPreference: string;
  localLibrary: Record<string, LSLibraryItemType>;
}

async function GetPfp({ dispatch, pfpkey, syncPreference, localLibrary }) {
  const contentAddress = FileSystem.documentDirectory + "LocalSync/" + pfpkey;
  const contentExists = await FileSystem.getInfoAsync(contentAddress);

  if (contentExists.exists === true) {
    dispatch(setPfpSignedUrl(contentAddress));
  } else {
    const pfpsignedurl = await Storage.get(pfpkey, { expires: 86400 });
    dispatch(setPfpSignedUrl(pfpsignedurl));

    if (syncPreference === "Partial" || syncPreference === "All") {
      LSAddItem({
        contentkey: pfpkey,
        signedurl: pfpsignedurl,
        localLibrary,
        dispatch,
      });
      // If local sync is active, add the image so that it can be used next time. We'll use the cloud version rn in case there are issues with saving.
    }
  }
}

export default GetPfp;
