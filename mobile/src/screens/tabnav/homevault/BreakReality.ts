import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { UserNotificationsByUsersQuery } from "../../../API";

async function BreakReality() {
  const userID = "67caff7a-841a-45c6-9902-85813297e59b";
  const fetchLimit = 100;
  try {
    const value = (await API.graphql(
      graphqlOperation(`
            query byUsers {
              userNotificationsByUsers (
                    limit: ${fetchLimit},
                    usersID: "${userID}",
                    sortDirection: DESC,
                    
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
    console.log("value: " + JSON.stringify(value));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default BreakReality;
