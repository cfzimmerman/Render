import ObserveInboundLink from "../../linking/operations/ObserveInboundLink";
import GetCurrentUser from "../../../profile/operations/GetCurrentUser";

async function AppStart({ dispatch, navigation }) {
  GetCurrentUser({ dispatch, navigation });
  ObserveInboundLink({ dispatch, navigation });
}

export default AppStart;
