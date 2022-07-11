import { API, graphqlOperation } from "aws-amplify";
import { CreateNotificationsInput } from "../../../API";
import { createNotifications } from "../../../graphql/mutations";

export interface AddNewNotificationPropTypes {
  targetUserID: string;
  // targetUserID is the id of the user *receiving* the notification, not sending it
  code: number;
  payloadString: string;
}

async function AddNewNotification({
  targetUserID,
  code,
  payloadString,
}: AddNewNotificationPropTypes) {
  const newNotification: CreateNotificationsInput = {
    usersID: targetUserID,
    code: code,
    payload: payloadString,
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
