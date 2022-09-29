import { DispatchType } from "../../../redux";
import { LSLibraryItemType } from "../../../redux/shared/localsync";
import { SyncPreferenceType } from "../../../redux/shared/localsync";
import { clearHomeVaultRefresh } from "../../../redux/shared/vaultpostdata";
import GetVaultData from "./GetVaultData";

interface HomeVaultFullRefresh {
  dispatch: DispatchType;
  cognitosub: string;
  syncPreference: SyncPreferenceType;
  localLibrary: Record<string, LSLibraryItemType>;
}

// Next, hook up multi refresh flow
// Ensure data is passed in properly
// Run and test

async function HomeVaultFullRefresh({
  dispatch,
  cognitosub,
  syncPreference,
  localLibrary,
}: HomeVaultFullRefresh) {
  try {
    const newHVD = [];
    // Redux action essentially resets vault store to initial log in. Fetch data starts from beginning (allows us to re-sort new uploads in cloud instead of locally. This is a costly move, but local sync at least reduces S3 intensity. Definitely consider replacing with a better alternative if one arises)
    // Following up, multi-uploads integrated into the ModifyVaultData sequence, as ModifyVaultData uses (I believe) a deep copy of vaultpostdata to inject content. After the first piece of content is injected, the correct Redux copy and the incorrect ModifyVaultData copies get out of sync and introduce bugs.
    dispatch(clearHomeVaultRefresh());

    GetVaultData({
      dispatch,
      vaultpostdata: newHVD,
      cognitosub,
      nextToken: null,
      syncPreference,
      localLibrary,
      limit: undefined,
    });
  } catch (error) {
    console.log(error);
  }
}

export default HomeVaultFullRefresh;
