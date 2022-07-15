import { API, graphqlOperation } from "aws-amplify";

async function GetCode3003Notifications({ currentuserID }) {
  const searchlimit = 100;
  try {
    // Returns Code 3003 notifications from posts that I have commented on
    const found = await API.graphql(
      graphqlOperation(`
        query CommentsByUsersID {
          commentsByUsersID (
                usersID: "${currentuserID}"
                limit: ${searchlimit},
                sortDirection: DESC,
            ) {
                items {
                  id
                  Posts {
                    id
                    Notifications (
                      code: {
                        eq: 3003
                      }
                    ) {
                      items {
                        id
                        createdAt
                        code
                        payload
                      }
                    }
                  }
                }
            }
        }
    `)
    );
    console.log(JSON.stringify(found));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetCode3003Notifications;
