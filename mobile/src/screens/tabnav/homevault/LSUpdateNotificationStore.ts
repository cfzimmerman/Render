import * as FileSystem from "expo-file-system";
import LSCreateNotificationStore from "./LSCreateNotificationStore";
import {
  NotificationDataItem,
  NotificationStoreType,
} from "./NotificationLibrary";

const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

interface LSUpdateNotificationStorePropTypes {
  newItem: NotificationDataItem;
}

async function LSUpdateNotificationStore({
  newItem,
}: LSUpdateNotificationStorePropTypes) {
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
      const foundInArray = notificationStoreObject.notificationData.findIndex(
        (item: NotificationDataItem) =>
          item.notificationID === newItem.notificationID
      );
      if (foundInArray === -1) {
        notificationStoreObject.notificationData.unshift(newItem);
        const newStoreString = JSON.stringify(notificationStoreObject);
        await FileSystem.writeAsStringAsync(
          notificationStoreAddress,
          newStoreString
        );
      }
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default LSUpdateNotificationStore;
