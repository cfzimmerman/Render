import { API, graphqlOperation } from "aws-amplify";
import { CurrentUserType } from "../../../../global/CommonTypes";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { UserNotificationsByUsersQuery } from "../../../../API";
import NotificationLibrary from "./NotificationLibrary";
import { DispatchType } from "../../../../redux";
import LSUpdateNotificationStoreDate from "../../local_sync/operations/LSUpdateNotificationStoreDate";
import LSGetNotificationStore from "../../local_sync/operations/LSGetNotificationStore";
import { updateNumberUnread } from "../../../../redux/shared/notifications";
import GetCode3003Notifications from "./NotificationActions/GetCode3003Notifications";

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
  const newUnreadDate = new Date().toISOString();

  GetCode3003Notifications({
    currentuserID: currentuser.id,
    unreadCutoffDate,
    dispatch,
    newUnreadDate,
  });

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
        currentuserID: currentuser.id,
        dispatch,
      });
    });

    LSUpdateNotificationStoreDate({ newUnreadDate });
    setTimeout(() => {
      dispatch(updateNumberUnread(newNotificationsArray.length));
    }, 1000);
    // Local cache is updated when (numberUnread === newNotificationData.length). With other GetCodeXXXXNotifications functions, sometimes those overlap before all functions are finished. A delay updating the number of unread notifications gives time for all to catch up.
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default GetNotificationsCloud;
