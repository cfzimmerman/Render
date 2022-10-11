import { ObserveInboundLink } from "../../resources/utilities";
import GetCurrentUser from "../tabnav/profile/GetCurrentUser";

const AppStart = ({ dispatch, navigation }) => {
  GetCurrentUser({ dispatch, navigation });
  ObserveInboundLink({ dispatch, navigation });
};

export default AppStart;
