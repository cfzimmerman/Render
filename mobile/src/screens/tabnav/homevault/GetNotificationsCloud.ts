import { API, graphqlOperation } from "aws-amplify";

async function GetNotificationsCloud({ currentuser }) {
  try {
    // const notificationResults = await API.graphql(graphqlOperation())
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetNotificationsCloud;
