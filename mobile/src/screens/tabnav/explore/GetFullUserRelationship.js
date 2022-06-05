import { API, graphqlOperation } from "aws-amplify";
import { setOtherUserRelationship } from "../../../redux/explore/otheruserprofile";

async function GetFullUserRelationship({
  targetcognitosub,
  dispatch,
  currentuser,
}) {
  // Outputs: 'unauthenticated', 'user', true, false

  if (
    typeof currentuser.cognitosub === "undefined"
    || typeof targetcognitosub === "undefined"
  ) {
    const otheruser = {
      relationship: "unauthenticated",
      increment: 0,
    };
    dispatch(setOtherUserRelationship(otheruser));
  } else if (currentuser.cognitosub === targetcognitosub) {
    const otheruser = {
      relationship: "user",
      increment: 0,
    };
    dispatch(setOtherUserRelationship(otheruser));
  } else {
    const result = await API.graphql(
      graphqlOperation(`
            query VerifyAddedUser {
                verifyAddedUser (
                    limit: 1,
                    sendercognitosub: "${currentuser.cognitosub}",
                    receivercognitosub: { 
                        eq: "${targetcognitosub}"
                    }
                ) {
                    items {
                        id
                    }
                }
            }
        `),
    );

    const existingrelationship = result.data.verifyAddedUser.items;

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
