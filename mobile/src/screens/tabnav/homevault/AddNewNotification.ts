import { API, graphqlOperation } from "aws-amplify";
import { CreateNotificationsInput } from "../../../API";
import { createNotifications } from "../../../graphql/mutations";

export interface AddNewNotificationPropTypes {
  targetUserID: string;
  // targetUserID is the id of the user *receiving* the notification, not sending it
  code: number;
  payloadString: string;
  postsID: null | string;
}

async function AddNewNotification({
  targetUserID,
  code,
  payloadString,
  postsID,
}: AddNewNotificationPropTypes) {
  const newNotification: CreateNotificationsInput = {
    usersID: targetUserID,
    code: code,
    payload: payloadString,
    postsID: postsID,
  };

  try {
    await API.graphql(
      graphqlOperation(createNotifications, { input: newNotification })
    );
  } catch (error) {
    console.log("error: " + error);
  }
}

export default AddNewNotification;
