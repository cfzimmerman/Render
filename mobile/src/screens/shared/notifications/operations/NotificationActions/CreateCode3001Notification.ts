import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { CheckAddedUserQuery } from "../../../../../API";
import AddNewNotification, {
  AddNewNotificationPropTypes,
} from "../AddNewNotification";

async function CreateCode3001Notification({
  targetUserID,
  code,
  payloadString,
  postsID,
  currentUserID,
}) {
  try {
    // Query + if condition checks if the user is making the first move or responding to an add from another user. If the latter (a relationship from the target user to the current user already exists), we don't want to offer the target user to add back, as they've already done so.
    const {
      data: {
        checkAddedUser: { items: userArray },
      },
    } = (await API.graphql(
      graphqlOperation(`
        query CheckAddedUser {
            checkAddedUser (
                limit: 1,
                senderID: "${targetUserID}",
                receiverID: { 
                    eq: "${currentUserID}"
                }
            ) {
                items {
                    id
                }
            }
        }
    `)
    )) as GraphQLResult<CheckAddedUserQuery>;
    if (userArray.length === 0) {
      const newNotification: AddNewNotificationPropTypes = {
        targetUserID,
        code,
        payloadString,
        postsID,
      };
      AddNewNotification(newNotification);
    }
    // Add an 'else' here to create a Code3004 notification -> a user you've added has added you back
  } catch (error) {
    console.log(error);
  }
}

export default CreateCode3001Notification;
