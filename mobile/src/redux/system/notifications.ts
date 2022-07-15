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
    setNumberUnread: (state, action: PayloadAction<number>) => {
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
      state.notificationData.unshift(action.payload);
    },
    addToNewNotificationData: (
      state,
      action: PayloadAction<NotificationDataItem>
    ) => {
      state.newNotificationData.unshift(action.payload);
    },
  },
});

export const {
  clearNotificationData,
  setNumberUnread,
  setUnreadCutoffDate,
  setNotificationData,
  addToNotificationData,
  addToNewNotificationData,
} = slice.actions;
export default slice.reducer;
