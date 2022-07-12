import { listNotifications } from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { CurrentUserType } from "../../../resources/CommonTypes";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { NotificationsByDateQuery } from "../../../API";
import NotificationLibrary from "./NotificationLibrary";
import { DispatchType } from "../../../redux/store";
import LSUpdateNotificationStoreDate from "./LSUpdateNotificationStoreDate";
import LSGetNotificationStore from "./LSGetNotificationStore";

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
        notificationsByDate: { items: newNotificationsArray },
      },
    } = (await API.graphql(
      graphqlOperation(`
            query NotificationsByDate {
              notificationsByDate (
                usersID: "${currentuser.id}",
                limit: ${notificationLimit},
                sortDirection: DESC,
                createdAt: {
                  gt: "${unreadCutoffDate}"
                }
              ) {
                  items {
                    id
                    createdAt
                    code
                    payload
                    usersID
                    updatedAt
                  }
              }
          }
    `)
    )) as GraphQLResult<NotificationsByDateQuery>;

    newNotificationsArray.forEach((item) => {
      NotificationLibrary({
        code: item.code,
        payload: item.payload,
        notificationID: item.id,
        postsID: item.postsID,
        dispatch,
      });
    });

    LSUpdateNotificationStoreDate({ newUnreadDate: new Date().toISOString() });
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetNotificationsCloud;
