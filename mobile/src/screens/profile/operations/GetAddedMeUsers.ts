import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { ReceiverRelationshipsByDateQuery } from "../../../API";
import AddToAddedMeUsers from "./AddToAddedMeUsers";
import ChangeAddedAddedMeNextToken from "./ChangeAddedAddedMeNextToken";

const GetRelationship = ({ relationshiparray }) => {
  if (relationshiparray.length === 0) {
    return false;
  }
  if (relationshiparray.length > 0) {
    return true;
  }
};

async function GetAddedMeUsers({
  addedmenexttoken,
  dispatch,
  currentuser,
  addedmeusers,
}) {
  if (addedmeusers.length === 0 || addedmenexttoken != null) {
    try {
      const queryLimit = 20;
      const { data } = (await API.graphql(
        graphqlOperation(`
        query ReceiverRelationshipsByDate {
          receiverRelationshipsByDate (
            receiverID: "${currentuser.id}",
            limit: ${queryLimit},
            sortDirection: DESC,
            nextToken: ${addedmenexttoken}
          ) {
            items {
              id
              SenderUser {
                id
                displayname
                cognitosub
                gamertag
                pfp
                addedmecount
              }
            }
            nextToken
          }
        }
      `)
      )) as GraphQLResult<ReceiverRelationshipsByDateQuery>;

      const relationshipsArray = data.receiverRelationshipsByDate.items;

      async function AddItem({ item }) {
        const userObject = item.SenderUser;
        const pfpurl = await Storage.get(userObject.pfp, {
          expires: 86400,
        });

        AddToAddedMeUsers({
          dispatch,
          user: userObject,
          pfpurl,
          relationship: null,
        });
      }

      relationshipsArray.forEach((item) => {
        AddItem({ item });
        if (
          typeof relationshipsArray[queryLimit - 1] === "undefined" ||
          item.id === relationshipsArray[queryLimit - 1].id
        ) {
          ChangeAddedAddedMeNextToken({
            dispatch,
            origin: "addedme",
            token: data.receiverRelationshipsByDate.nextToken,
          });
        }
      });
    } catch (error) {
      console.log("Error: " + JSON.stringify(error));
    }
  }
}

export default GetAddedMeUsers;
