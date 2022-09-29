import { batch } from "react-redux";
import { DispatchType } from "../../../../../redux";
import {
  addToNewNotificationData,
  addToNotificationData,
} from "../../../../../redux/shared/notifications";
import { NotificationDataItem } from "../NotificationLibrary";

interface Code3002PropTypes {
  code: number;
  payload: string | null;
  postsID: null | string;
  createdAt: string;
  notificationID: string;
  dispatch: DispatchType;
}

async function Code3002({
  code,
  payload,
  createdAt,
  notificationID,
  postsID,
  dispatch,
}: Code3002PropTypes) {
  const notificationObject: NotificationDataItem = {
    notificationID,
    code,
    unread: true,
    createdAt,
    payload,
    postsID,
    front: {
      title: "🎙 New comments",
      message: "See what people commented on your post.",
    },
    back: {
      rightIcon: "Comment",
      rightTitle: "View post",
    },
  };

  batch(() => {
    dispatch(addToNotificationData(notificationObject));
    dispatch(addToNewNotificationData(notificationObject));
  });
}

export default Code3002;
