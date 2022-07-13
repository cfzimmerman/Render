import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateNotificationsInput,
  CreateNotificationsMutation,
  CreateUserNotificationsInput,
  CreateUserNotificationsMutation,
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
  // 👉 Amplify has me ridiculously heated rn. Currently, they block creating a parent + child simultansously (legit that's like one of the few redeeming things in graphql AND it's an explicit example in their v2.0 docs). If that ever changes, change this to one API.graphql action

  const notification: CreateNotificationsInput = {
    code: code,
    payload: payloadString,
    postsID: postsID,
  };

  try {
    const {
      data: { createNotifications: newNotification },
    } = (await API.graphql(
      graphqlOperation(createNotifications, { input: notification })
    )) as GraphQLResult<CreateNotificationsMutation>;

    const userNotification: CreateUserNotificationsInput = {
      notificationsID: newNotification.id,
      usersID: targetUserID,
    };
    (await API.graphql(
      graphqlOperation(createUserNotifications, { input: userNotification })
    )) as GraphQLResult<CreateUserNotificationsMutation>;
  } catch (error) {
    console.log("error: " + JSON.stringify(error));
  }
}

export default AddNewNotification;
