import { useSelector } from "react-redux";
import GetCurrentUser from "../tabnav/profile/GetCurrentUser";
import GetPfp from "../tabnav/profile/GetPfp";
import GetVaultData from "../tabnav/vault/GetVaultData";

async function AppStart({ dispatch, navigation }) {
  GetCurrentUser({ dispatch, navigation });
}

export default AppStart;
