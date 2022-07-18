import * as FileSystem from "expo-file-system";
import { NotificationStoreType } from "./NotificationLibrary";

const newStore: NotificationStoreType = {
  unreadCutoffDate: "2022-07-08T21:40:59.857Z",
  notificationData: [],
};
// Old date ensures new devices sync old notifications
const notificationStoreAddress =
  FileSystem.documentDirectory + "NotificationStore.txt";

async function LSCreateNotificationStore() {
  try {
    const storeExists = await FileSystem.getInfoAsync(notificationStoreAddress);
    if (storeExists.exists === false) {
      const contents = JSON.stringify(newStore);
      await FileSystem.writeAsStringAsync(notificationStoreAddress, contents);
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSCreateNotificationStore;
