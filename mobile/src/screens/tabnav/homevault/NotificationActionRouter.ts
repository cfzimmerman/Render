import { DispatchType } from "../../../redux/store";
import { CurrentUserType } from "../../../resources/CommonTypes";
import Code3001Action from "./NotificationActions/Code3001Action";
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
  }
};

export default NotificationActionRouter;
