import { DispatchType } from "../../../../redux/store";
import { batch } from "react-redux";
import { NotificationDataItem } from "../NotificationLibrary";
import {
  addToNewNotificationData,
  addToNotificationData,
} from "../../../../redux/system/notifications";

interface Code3003PropTypes {
  dispatch: DispatchType;
  notificationID: string;
  code: number;
  createdAt: string;
  payload: string | null;
  postsID: string | null;
}

async function Code3003({
  dispatch,
  notificationID,
  code,
  createdAt,
  payload,
  postsID,
}: Code3003PropTypes) {
  const notificationObject: NotificationDataItem = {
    notificationID,
    code,
    unread: true,
    createdAt,
    payload,
    postsID,
    front: {
      title: "💭 Jump back in",
      message: "New comments on a post you responded to.",
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

export default Code3003;
