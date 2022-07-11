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
  try {
    const storeExists = await FileSystem.getInfoAsync(notificationStoreAddress);

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
  } catch (error) {
    console.log("error: " + error);
  }
}

export default LSGetNotificationStore;
