import { useSelector } from "react-redux";
import GetCurrentUser from "../tabnav/profile/GetCurrentUser";

async function AppStart({ dispatch, navigation }) {
  GetCurrentUser({ dispatch, navigation });
}

export default AppStart;
