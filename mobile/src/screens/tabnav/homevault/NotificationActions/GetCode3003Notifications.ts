import { API, graphqlOperation } from "aws-amplify";

async function GetCode3003Notifications({
  currentuserID,
  newUnreadDate,
  unreadCutoffDate,
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

    newNotifications.forEach((parentItem) => {
      // 🪩 Add condition to check if the post is owned by the current user!!!
      const targetArray = parentItem.Posts.Notifications.items;
      if (targetArray.length > 0) {
        const findDuplicate = filteredResults.findIndex(
          (element) => element.id === targetArray[0].id
        );
        if (findDuplicate === -1) {
          filteredResults.unshift(parentItem.Posts.Notifications.items[0]);
        }
      }
    });

    // Not act on it

    console.log(JSON.stringify(filteredResults));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetCode3003Notifications;
