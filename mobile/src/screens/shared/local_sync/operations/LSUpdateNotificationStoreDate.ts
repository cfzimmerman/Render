import * as FileSystem from "expo-file-system";
import LSCreateNotificationStore from "./LSCreateNotificationStore";
import {
  NotificationDataItem,
  NotificationStoreType,
} from "../../notifications/operations/NotificationLibrary";

const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

interface LSUNSDPropsType {
  newUnreadDate: string;
}

async function LSUpdateNotificationStoreDate({
  newUnreadDate,
}: LSUNSDPropsType) {
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
      const updatedNotificationStoreObject: NotificationStoreType = {
        ...notificationStoreObject,
        unreadCutoffDate: newUnreadDate,
      };
      const newStoreString = JSON.stringify(updatedNotificationStoreObject);
      await FileSystem.writeAsStringAsync(
        notificationStoreAddress,
        newStoreString
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSUpdateNotificationStoreDate;
