import { API, graphqlOperation } from "aws-amplify";
import { updateNumberUnread } from "../../../../../redux/shared/notifications";
import NotificationLibrary, {
  NotificationLibraryPropTypes,
} from "../NotificationLibrary";

async function GetCode3003Notifications({
  currentuserID,
  newUnreadDate,
  unreadCutoffDate,
  dispatch,
}) {
  const searchlimit = 100;
  const targetCode = 3003;
  try {
    // Returns Code 3003 notifications made since the last time I logged in from posts that I have commented on
    const {
      // @ts-ignore
      data: {
        commentsByUsersID: { items: newNotifications },
      },
    } = await API.graphql(
      graphqlOperation(`
        query CommentsByUsersID {
          commentsByUsersID (
                usersID: "${currentuserID}"
                limit: ${searchlimit},
                sortDirection: DESC,
            ) {
                items {
                  Posts {
                    usersID
                    Notifications (
                      codeCreatedAt: {
                        between: [
                          { code: ${targetCode}, createdAt: "${unreadCutoffDate}" },
                          { code: ${targetCode}, createdAt: "${newUnreadDate}" }
                        ]
                      }
                    ) {
                      items {
                        id
                        createdAt
                        code
                        payload
                        postsID
                      }
                    }
                  }
                }
            }
        }
    `)
    );

    const filteredResults = [];
    // Serves as a log of notifications already processed. Used to filter out duplicates.

    newNotifications.forEach((parentItem) => {
      if (parentItem.Posts != null) {
        // Filter out duplicate notifications (in case I commented multiple times on a post) and notifications where I made the post (that's a Code 3002 instance)
        const targetArray = parentItem.Posts.Notifications.items;
        if (targetArray.length > 0) {
          const findDuplicate = filteredResults.findIndex(
            (element) => element.id === targetArray[0].id
          );
          if (
            findDuplicate === -1 &&
            parentItem.Posts.usersID != currentuserID &&
            typeof targetArray[0].code != "undefined"
          ) {
            filteredResults.unshift(targetArray[0]);
            const nLProps: NotificationLibraryPropTypes = {
              code: targetArray[0].code,
              createdAt: targetArray[0].createdAt,
              notificationID: targetArray[0].id,
              payload: targetArray[0].payload,
              postsID: targetArray[0].postsID,
              dispatch,
              currentuserID,
            };
            NotificationLibrary(nLProps);
          }
        }
        setTimeout(() => {
          dispatch(updateNumberUnread(filteredResults.length));
        }, 1000);
        // Delay explanation on GetNotificationsCloud.ts
      }
    });

    // Not act on it
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default GetCode3003Notifications;
