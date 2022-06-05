import { Storage } from "aws-amplify";
import { setPfpSignedUrl } from "../../../redux/profile/profilemain";

async function GetPfp({ dispatch, pfpkey }) {
  const pfpsignedurl = await Storage.get(pfpkey, { expires: 86400 });

  dispatch(setPfpSignedUrl(pfpsignedurl));
}

export default GetPfp;
