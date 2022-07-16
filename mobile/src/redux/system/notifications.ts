import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationDataItem } from "../../screens/tabnav/homevault/NotificationLibrary";

interface NotificationsInitialTypes {
  newNotificationData: any[];
  notificationData: NotificationDataItem[];
  numberUnread: number;
  unreadCutoffDate: null | string;
}

const slice = createSlice({
  name: "notifications",
  initialState: {
    newNotificationData: [],
    notificationData: [],
    numberUnread: 0,
    unreadCutoffDate: null,
  } as NotificationsInitialTypes,
  reducers: {
    clearNotificationData: (state) => {
      state.notificationData.length = 0;
    },
    updateNumberUnread: (state, action: PayloadAction<number>) => {
      state.numberUnread = action.payload + state.numberUnread;
    },
    setUnreadCutoffDate: (state, action: PayloadAction<string>) => {
      state.unreadCutoffDate = action.payload;
    },
    setNotificationData: (
      state,
      action: PayloadAction<NotificationDataItem[]>
    ) => {
      state.notificationData = action.payload;
    },
    addToNotificationData: (
      state,
      action: PayloadAction<NotificationDataItem>
    ) => {
      state.notificationData.push(action.payload);
    },
    addToNewNotificationData: (
      state,
      action: PayloadAction<NotificationDataItem>
    ) => {
      state.newNotificationData.push(action.payload);
    },
  },
});

export const {
  clearNotificationData,
  updateNumberUnread,
  setUnreadCutoffDate,
  setNotificationData,
  addToNotificationData,
  addToNewNotificationData,
} = slice.actions;
export default slice.reducer;
