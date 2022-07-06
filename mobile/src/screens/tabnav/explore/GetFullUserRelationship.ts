import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { CheckAddedUserQuery } from "../../../API";
import { setOtherUserRelationship } from "../../../redux/explore/otheruserprofile";

async function GetFullUserRelationship({ targetID, dispatch, currentuser }) {
  // Outputs: 'unauthenticated', 'user', true, false

  if (
    typeof currentuser.id === "undefined" ||
    typeof targetID === "undefined"
  ) {
    const otheruser = {
      relationship: "unauthenticated",
      increment: 0,
    };
    dispatch(setOtherUserRelationship(otheruser));
  } else if (currentuser.id === targetID) {
    const otheruser = {
      relationship: "user",
      increment: 0,
    };
    dispatch(setOtherUserRelationship(otheruser));
  } else {
    const result = (await API.graphql(
      graphqlOperation(`
        query CheckAddedUser {
          checkAddedUser (
              limit: 1,
              senderID: "${currentuser.id}",
              receiverID: {
                eq: "${targetID}"
              }
          ) {
              items {
                  id
              }
          }
        }
    `)
    )) as GraphQLResult<CheckAddedUserQuery>;

    const existingrelationship = result.data.checkAddedUser.items;

    if (existingrelationship.length > 0) {
      const otheruser = {
        relationship: true,
        increment: 0,
      };
      dispatch(setOtherUserRelationship(otheruser));
    } else if (existingrelationship.length === 0) {
      const otheruser = {
        relationship: false,
        increment: 0,
      };
      dispatch(setOtherUserRelationship(otheruser));
    }
  }
}

export default GetFullUserRelationship;
