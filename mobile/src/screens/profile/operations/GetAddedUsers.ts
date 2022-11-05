import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToAddedUsers from "./AddToAddedUsers";
import ChangeAddedAddedMeNextToken from "./ChangeAddedAddedMeNextToken";

import { GraphQLResult } from "@aws-amplify/api-graphql";
import { SenderRelationshipsByDateQuery } from "../../../API";

async function GetAddedUsers({
  currentuser,
  dispatch,
  addednexttoken,
  addedusers,
}) {
  if (addedusers.length === 0 || addednexttoken != null) {
    try {
      const queryLimit = 20;

      const { data } = (await API.graphql(
        graphqlOperation(`
          query SenderRelationshipsByDate {
            senderRelationshipsByDate (
              senderID: "${currentuser.id}",
              limit: ${queryLimit},
              sortDirection: DESC,
              nextToken: ${addednexttoken}
            ) {
              items {
                id
                ReceiverUser {
                  id
                  cognitosub
                  pfp
                  displayname
                  gamertag
                  addedmecount
                }
              }
              nextToken
            }
          }
        `)
      )) as GraphQLResult<SenderRelationshipsByDateQuery>;

      const addedUsersArray = data.senderRelationshipsByDate.items;

      async function GetUser({ item }) {
        const userObject = item.ReceiverUser;
        const pfpurl = await Storage.get(userObject.pfp, { expires: 86400 });
        AddToAddedUsers({ dispatch, user: userObject, pfpurl });

        if (
          typeof addedUsersArray[queryLimit - 1] === "undefined" ||
          item.id === addedUsersArray[queryLimit - 1].id
        ) {
          ChangeAddedAddedMeNextToken({
            dispatch,
            origin: "addedme",
            token: data.senderRelationshipsByDate.nextToken,
          });
        }
      }

      addedUsersArray.forEach((item) => {
        GetUser({ item });
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  }
}

export default GetAddedUsers;
