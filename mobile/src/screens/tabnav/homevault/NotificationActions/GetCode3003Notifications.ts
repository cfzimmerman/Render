import { API, graphqlOperation } from "aws-amplify";

async function GetCode3003Notifications({ currentuserID }) {
  try {
    /*
    await API.graphql(
      graphqlOperation(`
    query AddedByCurrentUser {
      addedByCurrentUser (
            senderID: "${currentuser.id}"
            limit: ${searchlimit},
        ) {
            items {
              ReceiverUser {
                    id
                }
            }
        }
    }
`)
    );
    */
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetCode3003Notifications;
