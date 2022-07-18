import { DispatchType } from "../../../../redux/store";
import { batch } from "react-redux";
import {
  Code3003PayloadType,
  NotificationDataItem,
} from "../NotificationLibrary";
import {
  addToNewNotificationData,
  addToNotificationData,
} from "../../../../redux/system/notifications";
import { CurrentUserType } from "../../../../resources/CommonTypes";

interface Code3003PropTypes {
  dispatch: DispatchType;
  notificationID: string;
  code: number;
  createdAt: string;
  payload: string | null;
  postsID: string | null;
  currentuserID: string;
}

async function Code3003({
  dispatch,
  notificationID,
  code,
  createdAt,
  payload,
  postsID,
  currentuserID,
}: Code3003PropTypes) {
  const payloadObject: Code3003PayloadType = JSON.parse(payload);
  // The get action for Code 3003 returns a notification to everyone who has commented on the post (through the super nested query). If the newest comment is from the authenticated user, though, we don't want to register a notification. It's ignored if that's the case.
  if (currentuserID != payloadObject.lCUID) {
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
}

export default Code3003;
