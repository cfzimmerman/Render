/*

What just happened?
    * 3002: One or more people have commented on a post made by the current user. Ask the user if they would like to view the post.
I'm an ordinary user. I make a comment on someone's post. We need to make sure the owner of the post is notified.

Simplest: When I create a comment, create a notification, link it to the user
More complicated: When I comment, check if a notification already exists. If not, create it. If it does, update the createdAt timestamp
Previous notification status can be ascertained by the length of the notification thread. Just make sure to not count any comments made by the poster!



*/

import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { DispatchType } from "../../../../../redux";
import {
  NotificationsByCodeQuery,
  UpdateUserNotificationsInput,
} from "../../../../../API";
import { CurrentUserType } from "../../../../../global/CommonTypes";
import AddNewNotification from "../AddNewNotification";
import { Code3001PayloadType } from "../NotificationLibrary";
import { updateUserNotifications } from "../../../../../graphql/mutations";

interface CreateCode3002NotificationPropsType {
  postID: string;
  currentuser: CurrentUserType;
  postUserID: string;
}

async function CreateCode3002Notification({
  postID,
  currentuser,
  postUserID,
}: CreateCode3002NotificationPropsType) {
  try {
    if (currentuser.id != postUserID) {
      // Make sure user doesn't get a notification for their own comment
      const {
        data: {
          notificationsByCode: { items: existingNotifications },
        },
      } = (await API.graphql(
        graphqlOperation(`
            query NotificationsByCode {
                notificationsByCode (
                    limit: 1,
                    postsID: "${postID}",
                    code: { 
                        eq: 3002
                    }
                ) {
                    items {
                        id
                        UserNotifications (
                            limit: 100,
                            filter: {
                                usersID: {
                                    eq: "${postUserID}"
                                }
                            }
                        ) {
                            items {
                                id
                            }
                        }
                    }
                }
            }
        `)
      )) as GraphQLResult<NotificationsByCodeQuery>;

      if (existingNotifications.length === 0) {
        // Create instance
        const Code3002Payload: Code3001PayloadType = null;
        AddNewNotification({
          targetUserID: postUserID,
          postsID: postID,
          code: 3002,
          payloadString: JSON.stringify(Code3002Payload),
        });
      } else {
        const userNotificationsUpdate: UpdateUserNotificationsInput = {
          // Reasoning on this: There should only be one Code 3002 notification for a single post, and it only pertains to the owner of the post. If it exists, it should have a single UserNotifications child. That's what we'll update, as that's what's queried on app start. The limit: 100 is just a precation in case additional children to this code 3002 instance get added later on. Filter only works on results within the limit (it doesn't scan the whole DB)
          // @ts-ignore
          id: existingNotifications[0].UserNotifications.items[0].id,
          createdAt: new Date().toISOString(),
        };
        await API.graphql(
          graphqlOperation(updateUserNotifications, {
            input: userNotificationsUpdate,
          })
        );
      }
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default CreateCode3002Notification;
