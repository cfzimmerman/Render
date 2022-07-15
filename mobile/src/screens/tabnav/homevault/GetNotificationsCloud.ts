import { API, graphqlOperation } from "aws-amplify";
import { CurrentUserType } from "../../../resources/CommonTypes";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { UserNotificationsByUsersQuery } from "../../../API";
import NotificationLibrary from "./NotificationLibrary";
import { DispatchType } from "../../../redux/store";
import LSUpdateNotificationStoreDate from "./LSUpdateNotificationStoreDate";
import LSGetNotificationStore from "./LSGetNotificationStore";
import { setNumberUnread } from "../../../redux/system/notifications";

interface GNCPropTypes {
  currentuser: CurrentUserType;
  unreadCutoffDate: null | string;
  dispatch: DispatchType;
}

async function GetNotificationsCloud({
  currentuser,
  unreadCutoffDate,
  dispatch,
}: GNCPropTypes) {
  const notificationLimit = 100;
  LSGetNotificationStore({ dispatch });
  try {
    const {
      data: {
        userNotificationsByUsers: { items: newNotificationsArray },
      },
    } = (await API.graphql(
      graphqlOperation(`
            query UserNotificationsByUsers {
              userNotificationsByUsers (
                    limit: ${notificationLimit},
                    usersID: "${currentuser.id}",
                    sortDirection: DESC,
                    createdAt: {
                      gt: "${unreadCutoffDate}"
                    }
                ) {
                    items {
                        Notifications {
                          id
                          createdAt
                          code
                          payload
                          updatedAt
                          postsID
                        }
                    }
                }
            }
        `)
    )) as GraphQLResult<UserNotificationsByUsersQuery>;

    newNotificationsArray.forEach((item) => {
      // @ts-ignore
      const notificationItem = item.Notifications;
      NotificationLibrary({
        code: notificationItem.code,
        payload: notificationItem.payload,
        notificationID: notificationItem.id,
        postsID: notificationItem.postsID,
        createdAt: notificationItem.createdAt,
        dispatch,
      });
    });

    LSUpdateNotificationStoreDate({ newUnreadDate: new Date().toISOString() });
    dispatch(setNumberUnread(newNotificationsArray.length));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetNotificationsCloud;
