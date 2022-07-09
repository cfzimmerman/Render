import * as FileSystem from "expo-file-system";
import LSCreateNotificationStore from "./LSCreateNotificationStore";
import { batch } from "react-redux";
import {
  setNotificationData,
  setUnreadCutoffDate,
} from "../../../redux/system/notifications";
import { NotificationStoreType } from "./NotificationLibrary";

const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

async function LSGetNotificationStore({ dispatch }) {
  const storeExists = await FileSystem.getInfoAsync(notificationStoreAddress);
  const testFunction = () => {
    return console.log("Try me fam");
  };
  const testFunctionString = JSON.stringify(testFunction);
  console.log(testFunctionString);

  const testFunctionParse = JSON.parse(testFunctionString);
  testFunctionParse();
  if (storeExists.exists === false) {
    LSCreateNotificationStore();
  } else {
    const notificationStoreString = await FileSystem.readAsStringAsync(
      notificationStoreAddress
    );
    const notificationStoreObject: NotificationStoreType = JSON.parse(
      notificationStoreString
    );
    batch(() => {
      dispatch(setNotificationData(notificationStoreObject.notificationData));
      dispatch(setUnreadCutoffDate(notificationStoreObject.unreadCutoffDate));
    });
  }
}

export default LSGetNotificationStore;
