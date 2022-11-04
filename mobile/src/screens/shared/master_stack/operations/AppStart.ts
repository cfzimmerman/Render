import { useSelector } from "react-redux";
import GetCurrentUser from "../../../profile/operations/GetCurrentUser";

async function AppStart({ dispatch, navigation }) {
  GetCurrentUser({ dispatch, navigation });
}

export default AppStart;
