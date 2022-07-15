import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GetUsersQuery } from "../../../../API";
import { DispatchType } from "../../../../redux/store";
import {
  Code3001PayloadType,
  NotificationDataItem,
} from "../NotificationLibrary";
import Icons from "../../../../resources/project/Icons";
import {
  addToNewNotificationData,
  addToNotificationData,
} from "../../../../redux/system/notifications";
import { batch } from "react-redux";

interface Code3001PropTypes {
  code: number;
  payload: string;
  postsID: null | string;
  createdAt: string;
  notificationID: string;
  dispatch: DispatchType;
}

async function Code3001({
  code,
  payload,
  createdAt,
  notificationID,
  postsID,
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
      notificationID,
      code,
      unread: true,
      createdAt,
      payload,
      postsID,
      front: {
        title: "🎉 You've been added",
        message: `${user.displayname} added you. Would you like to add back?`,
      },
      back: {
        rightIcon: "AddUser",
        rightTitle: "Visit profile",
      },
    };
    batch(() => {
      dispatch(addToNotificationData(notificationObject));
      dispatch(addToNewNotificationData(notificationObject));
    });
    const readNotificationItem = { ...notificationObject, unread: false };
  } catch (error) {
    console.log("error: " + error);
  }
}

export default Code3001;
