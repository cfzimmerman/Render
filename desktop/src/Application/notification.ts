import { Notification } from "electron";

// display files added notification
export const notifyFilesAdded = (size: number) => {
  const notif = new Notification({
    title: "Files added",
    body: `${size} file(s) has been successfully added.`,
  });

  notif.show();
};
