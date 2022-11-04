import { batch } from "react-redux";
import { Auth } from "aws-amplify";
import * as Updates from "expo-updates";
import LSClearStorage from "../../shared/local_sync/operations/LSClearStorage";
import GetCurrentUser from "./GetCurrentUser";
import LSClearNotificationStore from "../../shared/local_sync/operations/LSClearNotificationStore";

async function LogOut({ dispatch, navigation }) {
  LSClearStorage({ dispatch, setGotStorageInfo: undefined });
  LSClearNotificationStore();

  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
    return;
  }

  try {
    await Updates.reloadAsync();
  } catch (error) {
    console.log("Error");
  }
}

export default LogOut;
