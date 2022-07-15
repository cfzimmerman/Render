import * as FileSystem from "expo-file-system";
import LSCreateNotificationStore from "./LSCreateNotificationStore";
import {
  NotificationDataItem,
  NotificationStoreType,
} from "./NotificationLibrary";

const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

interface LSUpdateNotificationStorePropTypes {
  newNotificationData: NotificationDataItem[];
}

async function LSUpdateNotificationStore({
  newNotificationData,
}: LSUpdateNotificationStorePropTypes) {
  const readNotificationData = [];
  console.log("updateNotificationStore");
  try {
    const storeExists = await FileSystem.getInfoAsync(notificationStoreAddress);
    if (storeExists.exists === false) {
      LSCreateNotificationStore();
    } else {
      // Mark each item as read
      newNotificationData.forEach((item: NotificationDataItem) => {
        const readNotificationItem = { ...item, unread: false };
        readNotificationData.push(readNotificationItem);
      });
      // Then read the current store and parse it into an object
      const notificationStoreString = await FileSystem.readAsStringAsync(
        notificationStoreAddress
      );
      const notificationStoreObject: NotificationStoreType = JSON.parse(
        notificationStoreString
      );

      // Combine the new data with the old
      const updatedNotifications = readNotificationData.concat(
        notificationStoreObject.notificationData
      );

      // Reform store and write it into a string that's sent back to the txt file
      const updatedStore: NotificationStoreType = {
        unreadCutoffDate: notificationStoreObject.unreadCutoffDate,
        notificationData: updatedNotifications,
      };

      const updatedStoreString = JSON.stringify(updatedStore);

      await FileSystem.writeAsStringAsync(
        notificationStoreAddress,
        updatedStoreString
      );

      /*
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
      */
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default LSUpdateNotificationStore;
