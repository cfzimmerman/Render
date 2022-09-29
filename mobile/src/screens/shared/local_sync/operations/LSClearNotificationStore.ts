import * as FileSystem from "expo-file-system";
import { NotificationStoreType } from "../../notifications/operations/NotificationLibrary";

const newStore: NotificationStoreType = {
  unreadCutoffDate: "2022-07-08T21:40:59.857Z",
  notificationData: [],
};

const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

async function LSClearNotificationStore() {
  try {
    const contents = JSON.stringify(newStore);
    await FileSystem.writeAsStringAsync(notificationStoreAddress, contents);
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSClearNotificationStore;
