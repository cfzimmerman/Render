import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateNotificationsInput,
  NotificationsByCodeQuery,
  UpdateNotificationsInput,
} from "../../../../API";
import {
  createNotifications,
  updateNotifications,
} from "../../../../graphql/mutations";
import { Code3003PayloadType } from "../NotificationLibrary";

interface CreateCode3003NotificationPropsType {
  postID: string;
  lastCommentUserID: string;
}

async function CreateCode3003Notification({
  postID,
  lastCommentUserID,
}: CreateCode3003NotificationPropsType) {
  // Created when someone comments on a post
  const payloadObject: Code3003PayloadType = {
    lCUID: lastCommentUserID,
  };
  const notificationCode = 3003;

  try {
    const {
      data: {
        notificationsByCode: { items: notificationsArray },
      },
    } = (await API.graphql(
      graphqlOperation(`
        query NotificationsByCode {
            notificationsByCode (
                postsID: "${postID}",
                sortDirection: DESC,
                code: {
                    eq: ${notificationCode}
                }
            ) {
                items {
                    id
                    createdAt
                }
            }
        }
    `)
    )) as GraphQLResult<NotificationsByCodeQuery>;

    if (notificationsArray.length === 0) {
      // Create notification
      const newNotification: CreateNotificationsInput = {
        code: notificationCode,
        payload: JSON.stringify(payloadObject),
        postsID: postID,
      };

      await API.graphql(
        graphqlOperation(createNotifications, { input: newNotification })
      );
    } else {
      // Update notification (createdAt and payload) so it shows up in new timestamp-filtered GetCode3003Notification queries
      const updatedNotification: UpdateNotificationsInput = {
        id: notificationsArray[0].id,
        payload: JSON.stringify(payloadObject),
        createdAt: new Date().toISOString(),
        code: notificationCode,
      };
      await API.graphql(
        graphqlOperation(updateNotifications, { input: updatedNotification })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default CreateCode3003Notification;
