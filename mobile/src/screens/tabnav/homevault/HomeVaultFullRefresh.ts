import { DispatchType } from "../../../redux/store";
import { LSLibraryItemType } from "../../../redux/system/localsync";
import { SyncPreferenceType } from "../../../redux/system/localsync";
import { clearHomeVaultRefresh } from "../../../redux/vault/vaultpostdata";

interface HomeVaultFullRefresh {
  dispatch: DispatchType;
  cognitosub: String;
  syncPreference: SyncPreferenceType;
  localLibrary: Record<string, LSLibraryItemType>;
}

async function HomeVaultFullRefresh({
  dispatch,
  cognitosub,
  syncPreference,
  localLibrary,
}: HomeVaultFullRefresh) {
  try {
    console.log("Do it");
  } catch (error) {
    console.log(error);
  }

  /*
  TODO:

  dispatch(clearHomeVaultRefresh());

  const newHVD = []


  // nextToken: null
  // vaultpostdata: [] (send an empty array)

  // dispatch(setFetchingData(true));

  

    GetVaultData({
      dispatch,
      vaultpostdata: newHVD,
      cognitosub: currentuser.cognitosub,
      nextToken: null,
      syncPreference,
      localLibrary,
      limit: undefined,
    });
  */
}

export default HomeVaultFullRefresh;
