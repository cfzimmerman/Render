import { useSelector } from "react-redux";
import { ToPortrait } from "../../resources/utilities";
import GetCurrentUser from "../tabnav/profile/GetCurrentUser";

async function AppStart({ dispatch, navigation }) {
  ToPortrait();
  GetCurrentUser({ dispatch, navigation });
}

export default AppStart;
