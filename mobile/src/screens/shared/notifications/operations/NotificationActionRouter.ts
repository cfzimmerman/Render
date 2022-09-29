import { DispatchType } from "../../../../redux";
import { CurrentUserType } from "../../../../global/CommonTypes";
import Code3001Action from "./NotificationActions/Code3001Action";
import Code3002Action from "./NotificationActions/Code3002Action";
import Code3003Action from "./NotificationActions/Code3003Action";
import {
  Code3001PayloadType,
  NotificationDataItem,
} from "./NotificationLibrary";

interface NARProps {
  notificationDataItem: NotificationDataItem;
  currentuser: CurrentUserType;
  dispatch: DispatchType;
  navigation: any;
}

const NotificationActionRouter = ({
  notificationDataItem,
  currentuser,
  dispatch,
  navigation,
}: NARProps) => {
  if (notificationDataItem.code === 3001) {
    const payloadObject: Code3001PayloadType = JSON.parse(
      notificationDataItem.payload
    );
    Code3001Action({ payloadObject, dispatch, navigation, currentuser });
  } else if (notificationDataItem.code === 3002) {
    Code3002Action({
      dispatch,
      navigation,
      postID: notificationDataItem.postsID,
    });
  } else if (notificationDataItem.code === 3003) {
    Code3003Action({
      dispatch,
      navigation,
      postID: notificationDataItem.postsID,
    });
  }
};

export default NotificationActionRouter;
