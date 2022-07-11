import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GetUsersQuery } from "../../../../API";
import { DispatchType } from "../../../../redux/store";
import {
  Code3001PayloadType,
  NotificationDataItem,
} from "../NotificationLibrary";
import Icons from "../../../../resources/project/Icons";
import { addToNewNotificationData } from "../../../../redux/system/notifications";

interface Code3001PropTypes {
  code: number;
  payload: string;
  createdAt: string;
  notificationID: string;
  dispatch: DispatchType;
}

async function Code3001({
  code,
  payload,
  createdAt,
  notificationID,
  dispatch,
}: Code3001PropTypes) {
  try {
    const payloadObject: Code3001PayloadType = JSON.parse(payload);

    const {
      data: { getUsers: user },
    } = (await API.graphql(
      graphqlOperation(`
          query GetUsers {
              getUsers (
                  id: "${payloadObject.ouID}"
              ) {
                  displayname
              }
          }
        `)
    )) as GraphQLResult<GetUsersQuery>;

    const notificationObject: NotificationDataItem = {
      notificationID: "8675309",
      code,
      unread: true,
      createdAt,
      payload,
      front: {
        title: "New follower",
        message: `${user.displayname} added you. Would you like to add back?`,
      },
      back: {
        rightIcon: Icons.OriginalSize.AddUser,
        rightTitle: "Visit profile",
      },
    };
    dispatch(addToNewNotificationData(notificationObject));
  } catch (error) {
    console.log("error: " + error);
  }
}

export default Code3001;
