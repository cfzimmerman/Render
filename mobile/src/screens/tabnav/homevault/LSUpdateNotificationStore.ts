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
  const readNotificationData: NotificationDataItem[] = [];
  try {
    const storeExists = await FileSystem.getInfoAsync(notificationStoreAddress);
    if (storeExists.exists === false) {
      LSCreateNotificationStore();
    } else {
      // Read the current store and parse it into an object
      const notificationStoreString = await FileSystem.readAsStringAsync(
        notificationStoreAddress
      );
      const notificationStoreObject: NotificationStoreType = JSON.parse(
        notificationStoreString
      );

      // Mark items as read
      newNotificationData.forEach((item: NotificationDataItem) => {
        const readNotificationItem = { ...item, unread: false };
        readNotificationData.push(readNotificationItem);
      });

      // If an update notification is triggered multiple times, clean the store for only one instance (ex. only one item for a new comment on one of my posts)
      // Return a shallow copy of the notification store data with only NotificationID keys that don't conflict with new NotificationID keys
      const uniqueOldStoreData =
        notificationStoreObject.notificationData.filter(
          (parentItem: NotificationDataItem) =>
            -1 ===
            readNotificationData.findIndex(
              (childItem: NotificationDataItem) =>
                parentItem.notificationID === childItem.notificationID
            )
        );

      // Combine the new data with the old
      const updatedNotifications =
        readNotificationData.concat(uniqueOldStoreData);

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
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default LSUpdateNotificationStore;
