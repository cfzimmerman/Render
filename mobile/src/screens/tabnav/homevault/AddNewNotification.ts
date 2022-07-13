import { API, graphqlOperation } from "aws-amplify";
import {
  CreateNotificationsInput,
  CreateUserNotificationsInput,
} from "../../../API";
import {
  createNotifications,
  createUserNotifications,
} from "../../../graphql/mutations";

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
  /*
  const newNotification: CreateNotificationsInput = {
    usersID: targetUserID,
    code: code,
    payload: payloadString,
    postsID: postsID,
  };
  */

  const notification = {
    usersID: targetUserID,
    Notifications: {
      code: code,
      payload: payloadString,
      postsID: postsID,
    },
  };

  try {
    /*
    const createdUN = await API.graphql(
      graphqlOperation(createUserNotifications, { input: notification })
    );
    */
    const createdUN = await API.graphql(
      graphqlOperation(`
        mutation createUserNotifications {
          createUserNotifications () {
            usersID: "${targetUserID}"
            Notifications: {
              code: ${code}
              payload: "${payloadString}"
              postsID: "${postsID}"
            }
          }
      }
      
   `)
    );
    console.log(JSON.stringify(createdUN));
    // Copy the version in mutations and remove the TS declaration
    /*
    await API.graphql(
      graphqlOperation(createNotifications, { input: newNotification })
    );
    */
  } catch (error) {
    console.log("error: " + error);
  }
}

export default AddNewNotification;
